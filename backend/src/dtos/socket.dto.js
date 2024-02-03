import moment from 'moment-timezone';

export const connectRoomResponseDTO = (data) => {

    return {
        "roomId": data.cr_id,
        "roomStatus": data.cr_status,
        "buyerId": data.cr_buyer_id,
        "buyerNickname": data.buyerNickname,
        "buyerProfile": data.buyerProfile,
        "sellerId": data.cr_seller_id,
        "sellerNickname": data.sellerNickname,
        "sellerProfile": data.sellerProfile,
        "productId": data.cr_product_id,
        "productName": data.product_name,
        "productStatus": data.product_status,
        "productPrice": data.product_price,
        "productImg": data.product_preview_img
    };
}

export const sendMessageResponseDTO = (data) => {
    return {
        "roomId": data.cm_room_id,
        "messageId": data.cm_id,
        "content": data.cm_content,
        "isMedia": data.cm_is_media,
        "receiverId": data.cm_receiver_id,
        "senderId": data.cm_sender_id,
        "createdAt": moment.utc(data.created_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
    };
}

export const readMessageResponseDTO = (data, roomId, receiverId) => {

    return {
        "updateRowsCount": data.affectedRows,
        "roomId": roomId,
        "receiverId": receiverId
    };
}