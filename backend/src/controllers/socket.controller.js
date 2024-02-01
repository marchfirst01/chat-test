import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { readMessageService, sendMessageService } from "../services/socket.service.js";

export const connectRoom = (info, socket, io) => {
    // 채팅방 접속을 위한 컨트롤러
    socket.join(info.userId);
}

export const sendMessageController = async (message, socket, io) => {
    // 메시지 전달을 위한 컨트롤러
    const result = sendMessageService(message);
    
    
}

export const readMessageController = async (info, socket, io) => {
    // 메시지 읽었을 때 (채팅방 열람 시간 갱신)를 위한 컨트롤러
    res.send(response(status.SUCCESS, await readMessageService()));
}