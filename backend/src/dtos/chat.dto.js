import moment from 'moment-timezone';

export const createRoomResponseDTO = (data, status) => {

    return {
        "roomId": data.cr_id,
        "roomName": data.cr_name,
        "roomStatus": data.cr_status,
        "buyerId": data.cr_buyer_id,
        "sellerId": data.cr_seller_id,
        "productId": data.cr_product_id,
        "latestMsg": data.cr_latest_msg,
        "latestMsgData": moment.utc(data.cr_latest_msg_date).tz("Asia/Seoul").format('YYYY-MM-DD HH:mm:ss'),
        "createdAt": moment.utc(data.created_at).tz("Asia/Seoul").format('YYYY-MM-DD HH:mm:ss'),
        "isAlreadyExist": status
    };
}

export const getChatResponseDTO = (data) => {

    return {"null":"null"};
}

export const readChatResponseDTO = (data) => {

    return {"null":"null"};
}

export const getChatLogResponseDTO = (data) => {

    return {"null":"null"};
}