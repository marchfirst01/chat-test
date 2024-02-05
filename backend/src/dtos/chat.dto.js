import moment from 'moment-timezone';

export const createRoomResponseDTO = (data, status) => {

    return {
        "roomId": data.cr_id,
        "isAlreadyExist": status
    }
}

export const getChatResponseDTO = (data) => {

    const chatList = [];

    for (let i = 0; i < data.length; i++) {
        chatList.push({
            "roomId": data[i].cr_id,
            "status": data[i].cr_status,
            "buyerId": data[i].cr_buyer_id,
            "buyerName": data[i].buyerName,
            "buyerProfile": data[i].buyerProfile,
            "sellerId": data[i].cr_seller_id,
            "sellerName": data[i].sellerName,
            "sellerProfile": data[i].sellerProfile,
            "latestMsg": data[i].cr_latest_msg,
            "latestMsgDate": moment.utc(data[i].cr_latest_msg_date).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
            "notReadCount": (data[i].notReadCount ? data[i].notReadCount : 0)
        });
    }
    
    return {
        "chatListData": chatList,
        "cursorId": data[data.length-1].cr_id
    };
}

export const getChatLogResponseDTO = (data) => {

    const chatLogList = [];

    for (let i = 0; i < data.length; i++) {
        chatLogList.push({
            "msgId": data[i].cm_id,
            "senderId": data[i].cm_sender_id,
            "receiverId": data[i].cm_receiver_id,
            "msg": data[i].cm_content,
            "isRead": data[i].cm_is_read,
            "date": moment.utc(data[i].created_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
            "isMedia": data[i].cm_is_media
        });
    }
    
    return {
        "chatLogListData": chatLogList,
        "cursorId": data[data.length-1].cm_id
    };
}