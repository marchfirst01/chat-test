import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { addNewMessageService, createChatRoomService } from "../services/chat.service.js";

export const createChatRoomController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await createChatRoomService(req.body)));
}

export const addNewMessageController = async (req, res, next) => {
    res.send(response(status.SUCCESS, await addNewMessageService(req.body)));
}