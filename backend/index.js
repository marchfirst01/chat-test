import express from 'express';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import cors from 'cors';

import { Server } from 'socket.io';
import { createServer } from 'http';

import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';
import { healthRoute } from './src/routes/health.route.js';
import { chatRouter } from './src/routes/chat.route.js';

import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

import logger from './config/logger.js';
import { socketJoin } from './src/middleware/socket.js';

dotenv.config(); // .env 파일 사용 (환경 변수 관리)

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowEIO3: true,
});

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 8080)   // 서버 포트 지정
app.set("io", io);                          // socket io 사용하기 위함

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));
app.use('/health', healthRoute);
app.use('/chat', chatRouter(io));

app.get('/', (req, res) => {
  res.send('This is Root Page');
});

// error handling
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  // 템플릿 엔진 변수 설정
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  console.error(err);
  logger.error(err);
  res
    .status(err.data.status || status.INTERNAL_SERVER_ERROR)
    .send(response(err.data));
});

// socket
// io.use((socket, next) => {

//     socket.onAny((event) => {
//         if(event == "join"){
//             console.log("JOIN EVENT OCCUR");
//         }
//     } )

//     setTimeout(() => {
//       // next is called after the client disconnection
//       next();
//     }, 1000);

//     socket.on("join", () => {
//         // not triggered
//       });

//     socket.on("disconnect", () => {
//       // not triggered
//     });
// });

io.on('connection', socket => {
  // 소켓 연결 시작!
  // 우리 프로젝트에 필요한 이벤트 -> 방 생성(join), join 시
  logger.info(`User connected`);

  socket.onAny(event => {
    console.log('Socket Event: ', event);
    console.log(socket);
  });

  socket.on('join', ({ name, room }, callback) => {
    socketJoin(socket, io, { name, room }, callback); // 이렇게 따로 빼기 가능!!! 간결하게 사용 가능할 듯
  });

  socket.on('sendMessage', (message, callback) => {
    // message 전달 -> 채팅 작성 내용 전달, socketID로 user 찾으면 될 듯 -> DB 사용해서 한 번 수정해보겠음
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {
      user: user.name,
      text: message,
    });
  });

  socket.on('disconnect', () => {
    // 연결 끊긴 이벤트 발생 시 작동
    logger.info(`User disconnected`);
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name}님이 퇴장하셨습니다.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${app.get('port')}`);
});
