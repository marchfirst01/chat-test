import { addNewMessageResponseDTO, createRoomResponseDTO } from "../dtos/chat.dto.js";
import { addNewMessageDao, addParticipantDao, createChatRoomDao, findChatRoom, getNewChatRoomDao } from "../models/chat.dao.js";

export const createChatRoomService = async (body) => {
    const { userId, type = 'individual', identifier, roomName, participant } = body;

    const chatRoom = await findChatRoom(identifier, userId);
    // DB에 방 있나 찾기
    if(chatRoom){
        // 방이 있다면
        // 있으면 그 방 정보와 함께 이미 존재한다는 응답
        return createRoomResponseDTO(chatRoom);
    }else{
        // 없으면 방 생성
        const lastChat = '';
        const createChatRoomId = await createChatRoomDao(identifier, type, lastChat);
        const addParticipant = await addParticipantDao(createChatRoomId, roomName, participant);
        return createRoomResponseDTO(await getNewChatRoomDao(createChatRoomId, userId));
    }
    // 에러 핸들링으로 방 생성 못하면 에러 반환
}

export const addNewMessageService = async (body) => {
    // 새 메시지 저장
    const { roomId, userId, message, not_read = 1 } = body;

    return addNewMessageResponseDTO(await addNewMessageDao(roomId, userId, message, not_read));
}