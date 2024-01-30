// db 연결
import { pool } from "../../config/db.connect.js";

// 응답 관련
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

import { findRoomToIdentifier, getChatRoomToUserIdSql, insertChatRoom, insertNewMessageSql, insertParticipantSql } from "./chat.sql.js";

export const findChatRoom = async (identifier, userId) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(findRoomToIdentifier, [identifier, userId]);

        conn.release();
        return chatRoom[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const createChatRoomDao = async (identifier, type, lastChat) => {
    try{
        const conn = await pool.getConnection();
        
        const [chatRoom] = await pool.query(insertChatRoom, [identifier, type, lastChat]);
        conn.release();
        return chatRoom.insertId;

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