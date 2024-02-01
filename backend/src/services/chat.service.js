import { createRoomResponseDTO, getChatLogResponseDTO, getChatResponseDTO, readChatResponseDTO } from "../dtos/chat.dto.js";
import { createUUID } from "../middleware/uuid.js";
import { createChatRoomDao, findChatRoom, getChatRoomToIDsDao, getChatRoomToRIdDao } from "../models/chat.dao.js";

export const createChatRoomService = async (body) => {
    const { buyerId, sellerId, productId } = body;

    const chatRoom = await findChatRoom(buyerId, sellerId, productId);
    console.log(chatRoom.length);
    // DB에 방 있나 찾기
    if(chatRoom.length){
        console.log("room Is already exist");
        // 방이 있다면 그 방 정보와 함께 이미 존재한다는 응답 (1 반환)
        return createRoomResponseDTO(await getChatRoomToIDsDao(buyerId, sellerId, productId), 1);
    }else{
        console.log("no room");
        // 없으면 방 생성
        const roomName = createUUID();
        const roomId = await createChatRoomDao(buyerId, sellerId, productId, roomName);

        return createRoomResponseDTO(await getChatRoomToRIdDao(roomId), 0);
    }
    // 에러 핸들링으로 방 생성 못하면 에러 반환
}

export const getChatService = async (body) => {
    // 채팅방 리스트 가져오기
    const { userId } = body;

    console.log(userId);

    return getChatResponseDTO("test");
    // return addNewMessageResponseDTO(await addNewMessageDao(roomId, userId, message, not_read));
}

export const readChatService = async () => {

    return readChatResponseDTO("test");
    // return readChatResponseDTO(await readChatDao());
}

export const getChatLogService = async () => {
    return getChatLogResponseDTO("test");
    // return getChatLogResponseDTO(await getChatLogDTO());
}