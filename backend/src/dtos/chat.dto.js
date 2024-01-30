import moment from 'moment-timezone';

export const createRoomResponseDTO = (result) => {

    return {
        "roonId": result.id,
        "roomIdentifier": result.identifier,
        "roomType": result.type,
        "roomName": result.roomName,
        "not_read_chat": result.not_read_chat,
        "last_read_chat_id": result.last_read_chat_id,
        "updatedAt": moment.utc(result.updated_at).tz("Asia/Seoul").format('YYYY-MM-DD HH:mm:ss')
    };
}

export const addNewMessageResponseDTO = (result) => {

    return {"inserId": result};
}