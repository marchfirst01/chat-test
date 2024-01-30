
import logger from '../../config/logger.js';
import { addUser, getUser, getUsersInRoom } from '../../users.js';

export const socketJoin = (socket, io, {name, room}, callback) => {
    logger.info(`User ${name}, ${room}, JOIN`);
    const {err, user} = addUser({id: socket.id, name, room})
    const user_bef = getUser(socket.id);
    if(err) callback({err: "error"})

    // userId, room이랑 존재하는지 따져본 다음에 없으면 생성 -> 채팅방 입장시키기 
    console.log("join", getUsersInRoom(room));
    console.log("join", {id: socket.id, name, room});
    console.log("join",user);
    console.log("join",user_bef);

    socket.join(room); // 사용자가 room에 입장할 수 있도록 함

    socket.emit('message', {    // message event가 요청(발생) 되면 아래 내용 전달
        user: 'admin',
        text: `${name}, ${room}에 오신 것을 환영합니다.`,
    })

    io.to(room).emit('roomData', { // 그리고 해당 방의 모든 사용자들에게 roomData 전달 -> 실시간 업데이트 가능(추후 읽음 표시로 사용 가능할 듯, 1에서 0으로 없어지는거)
        room: room,
        users: getUsersInRoom(room),
    })
}