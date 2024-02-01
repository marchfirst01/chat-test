import { readMessageResponseDTO, sendMessageResponseDTO } from "../dtos/socket.dto.js";
import { addMessageDao } from "../models/chat.dao.js";

export const sendMessageService = async (message) => {

    const {roomId, senderId, receiverId, content, isMedia = 0 } = message;

    const result = await addMessageDao(roomId, senderId, receiverId, content, isMedia);

    return sendMessageResponseDTO(result);
    // return readChatResponseDTO(await readChatDao());
}

export const readMessageService = async () => {

    return readMessageResponseDTO("test");
    // return readChatResponseDTO(await readChatDao());
}
