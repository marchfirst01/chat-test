import { createRoomResponseDTO } from "../dtos/chat.dto.js";
import { createChatRoomDao, findChatRoom, getChatRoomToIDsDao } from "../models/chat.dao.js";

export const createChatRoomService = async (body) => {
    const { buyerId, sellerId, productId } = body;

    const chatRoom = await findChatRoom(buyerId, sellerId, productId);
    // DB에 방 있나 찾기
    if(chatRoom.length){
        // 방이 있다면 그 방 정보와 함께 이미 존재한다는 응답 (1 반환)
        return createRoomResponseDTO(await getChatRoomToIDsDao(buyerId, sellerId, productId), 1);
    }else{
        // 없으면 방 생성
        return createRoomResponseDTO(await createChatRoomDao(buyerId, sellerId, productId), 0);
    }
}