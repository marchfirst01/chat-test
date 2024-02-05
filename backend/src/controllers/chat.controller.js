import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { createChatRoomService } from "../services/chat.service.js";
import { getChatLogService, getChatService } from "../providers/chat.provider.js";

export const createChatRoomController = async (req, res, next) => {
    // 채팅방 생성을 위한 컨트롤러
    res.send(response(status.SUCCESS, await createChatRoomService(req.body)));
}

export const getChatController = async (req, res) => {
    // 채팅방 리스트 가져오기
    console.log("getChatController");
    res.send(response(status.SUCCESS, await getChatService(req.body, req.query)));
}

export const getChatLogController = async (req, res, next) => {
    // 채팅 열람 시간 갱신 및 열람 시간 리턴, 읽음 여부 업데이트
    res.send(response(status.SUCCESS, await getChatLogService(req.body, req.query)));
}
