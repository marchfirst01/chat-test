export const findRoomToIdentifier = "select r.id, r.identifier, r.type, p.room_name, p.not_read_chat, p.last_read_chat_id, r.updated_at "
+ "from room r join participant p ON r.id = p.room_id" +
" where r.identifier = ? and p.user_id = ?;";

export const insertChatRoom = "insert into room (identifier, type, last_chat) values (?, ?, ?);"

export const insertParticipantSql = "insert into participant (user_id, room_id, room_name) values (?, ?, ?);";

export const getChatRoomToUserIdSql = "select r.id, r.identifier, r.type, p.room_name, p.not_read_chat, p.last_read_chat_id, r.updated_at "
+ "from room r join participant p ON r.id = p.room_id" +
" where r.id = ? and p.user_id = ?;";

export const insertNewMessageSql = "insert into chatting (room_id, send_user_id, message, not_read) values (?, ?, ?, ?);";