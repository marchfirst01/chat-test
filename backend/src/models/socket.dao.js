// db 연결
import { pool } from "../../config/db.connect.js";

// 응답 관련
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

import { addMessageSql, getChatRoomToRIDSql, getMessageToIdSql, updateReadMessageSql, updateRoomLastMsgSql } from "./socket.sql.js";

// roomId 통해 채팅방 정보 불러오기
export const getChatRoomToRIdDao = async (roomId) => {
    try{
        const conn = await pool.getConnection();
        const [chatRoom] = await pool.query(getChatRoomToRIDSql, roomId);
        
        conn.release();
        return chatRoom[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// sendMessage
export const addMessageDao = async (roomId, senderId, receiverId, content, isMedia) => {
    try{
        const conn = await pool.getConnection();

        // update chat_room set cr_latest_msg = ?, cr_latest_msg_date = ?, updated_at = CURRENT_TIMESTAMP where cr_id = ?';

        const [addMessage] = await pool.query(addMessageSql, [roomId, senderId, receiverId, content, isMedia]);
        const [result] = await pool.query(getMessageToIdSql, addMessage.insertId);
        await pool.query(updateRoomLastMsgSql, [result[0].cm_content, result[0].created_at, result[0].cm_room_id]);

        conn.release();
        return result[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

export const readMessageDao = async (roomId, receiverId) => {
    try{
        const conn = await pool.getConnection();
        
        const [msg] = await pool.query(updateReadMessageSql, [roomId, receiverId]);
        console.log(msg);
        conn.release();
        return msg;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}