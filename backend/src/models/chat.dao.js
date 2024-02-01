// db 연결
import { pool } from "../../config/db.connect.js";

// 응답 관련
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

import { addMessageSql, getChatRoomToIDsSql, getChatRoomToRIDSql, getChatRoomToUserIdSql, getMessageToIdSql, insertChatRoomSql, insertNewMessageSql, insertParticipantSql, isRoomExistSql } from "./chat.sql.js";

// 채팅방 찾기
export const findChatRoom = async (buyerId, sellerId, productId) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(isRoomExistSql, [productId, sellerId, buyerId]);
        
        conn.release();
        return chatRoom;
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 새로운 채팅방 생성하기
export const createChatRoomDao = async (buyerId, sellerId, productId, roomName) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(insertChatRoomSql, [roomName, buyerId, sellerId, productId]);
        conn.release();
        return chatRoom.insertId;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// buyerId, sellerId, productId 통해 채팅방 정보 불러오기
export const getChatRoomToIDsDao = async (buyerId, sellerId, productId) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(getChatRoomToIDsSql, [productId, sellerId, buyerId]);
        conn.release();

        return chatRoom[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

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

export const addMessageDao = async (roomId, senderId, receiverId, content) => {
    try{
        const conn = await pool.getConnection();

        const [addMessage] = await pool.query(addMessageSql, [roomId, senderId, receiverId, content]);
        const [result] = await pool.query(getMessageToIdSql, addMessage.insertId);

        conn.release();
        return result[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}


export const addParticipantDao = async (roomId, roomName, participant) => {
    try{
        const conn = await pool.getConnection();

        const [my] = await pool.query(insertParticipantSql, [participant[0], roomId, roomName]);
        const [opponent] = await pool.query(insertParticipantSql, [participant[1], roomId, roomName]);

        conn.release();
        return [my.insertId, opponent.insertId];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getNewChatRoomDao = async (roomId, userId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getChatRoomToUserIdSql, [roomId, userId]);

        conn.release();
        return result[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addNewMessageDao = async (roomId, userId, message, not_read) => {
    try{
        const conn = await pool.getConnection();

        const [insert] = await pool.query(insertNewMessageSql, [roomId, userId, message, not_read]);

        conn.release();
        return insert.insertId;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}