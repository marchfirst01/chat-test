import express from "express";
import asyncHandler from "express-async-handler";

import { createChatRoomController, getChatController, getChatLogController, readChatController } from "../controllers/chat.controller.js";
import { connectRoom, readMessageController, sendMessageController } from "../controllers/socket.controller.js"
import logger from "../../config/logger.js";

// import { getUser, getUsersInRoom } from "../../users.js";
// import { socketJoin } from "../middleware/socket.js";

// 채팅 정보 관련 연결 
export const chatRouter = (io) => {
    const router = express.Router();

    // 채팅방 생성
    router.post('/create-room', asyncHandler(createChatRoomController));
    // 채팅방 리스트 가져오기
    router.post('/list', asyncHandler(getChatController));
    // 채팅방 읽기 관련 (채팅 열람 시간 갱신 및 열람 시간 리턴, isRead 상태 변경)
    router.post('/read', asyncHandler(readChatController));
    // 채팅방 채팅 로그 요청(이전까지 채팅했던 내역 요청)
    router.post('/refresh', asyncHandler(getChatLogController));

    io.on("connection", (socket) => {
        logger.info(`User connected`);
        // 소켓 연결 (join)
        socket.on('connect-room', (info) => asyncHandler(connectRoom(info, socket, io)));
        // 메시지 전송 시 실행
        socket.on('send-message', (message) => asyncHandler(sendMessageController(message, socket, io)));
        // 메시지 읽었을 때 (채팅방 열람 시간 갱신)
        socket.on('read-message', (info) => asyncHandler(readMessageController(info, socket, io)));
        
        // socket.onAny((event) => {
        //     console.log("Socket Event: ", event);
        //     console.log(socket);
        // } )

        // socket.on('join', ({name, room}, callback)=>{
        //     socketJoin(socket, io, {name, room}, callback); // 이렇게 따로 빼기 가능!!! 간결하게 사용 가능할 듯
        // });

        // socket.on('sendMessage', (message, callback) => {
        //     // message 전달 -> 채팅 작성 내용 전달, socketID로 user 찾으면 될 듯 -> DB 사용해서 한 번 수정해보겠음
        //     const user = getUser(socket.id);
        //     io.to(user.room).emit('message', {
        //         user: user.name,
        //         text: message,
        //     })
        // });

        // socket.on('disconnect', () => {
        //     // 연결 끊긴 이벤트 발생 시 작동
        //     logger.info(`User disconnected`);
        //     const user = getUser(socket.id);
        //     if(user){
        //         io.to(user.room).emit('message', {
        //             user: 'admin',
        //             text: `${user.name}님이 퇴장하셨습니다.`,
        //         })
        //         io.to(user.room).emit('roomData', {
        //             room: user.room,
        //             users: getUsersInRoom(user.room)
        //         })
        //     }
        // })
    });

    return router;
}
