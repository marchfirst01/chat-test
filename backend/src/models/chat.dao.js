// db 연결
import { pool } from "../../config/db.connect.js";

// 응답 관련
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

import { countChatLog, countChatRoom, getChatListSql, getChatLogSql, getCreateChatRoomToIDsSql, insertChatRoomSql, isRoomExistSql } from "./chat.sql.js";

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

// createChatRoom
// 새로운 채팅방 생성하기
export const createChatRoomDao = async (buyerId, sellerId, productId) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(insertChatRoomSql, [buyerId, sellerId, productId]);
        conn.release();
        return chatRoom.insertId;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// createChatRoom
// buyerId, sellerId, productId 통해 채팅방 정보 불러오기
export const getChatRoomToIDsDao = async (buyerId, sellerId, productId) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(getCreateChatRoomToIDsSql, [productId, sellerId, buyerId]);
        conn.release();

        return chatRoom[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 채팅방 리스트
export const getChatListDao = async (userId, paging, cursorId) => {
    try{
        const conn = await pool.getConnection();
        
        if(cursorId == -1){
            const [temp] = await pool.query(countChatRoom);
            cursorId = temp[0].chatRoomCursor + 1;
        }

        const [result] = await pool.query(getChatListSql, [userId, userId, userId, userId, userId, cursorId, paging]);
        conn.release();

        return result;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getChatLogDao = async (roomId, paging, cursorId) => {
    try{
        const conn = await pool.getConnection();
        
        if(cursorId == -1){
            const [temp] = await pool.query(countChatLog);
            cursorId = temp[0].chatLogCursor + 1;
        }

        const [result] = await pool.query(getChatLogSql, [roomId, cursorId, paging]);
        conn.release();

        console.log(result);

        return result;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}