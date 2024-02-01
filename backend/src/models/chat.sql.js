export const isRoomExistSql = "select cr_id, cr_name from chat_room where cr_product_id = ? and cr_seller_id = ? and cr_buyer_id = ?"

export const insertChatRoomSql = 'insert into chat_room ' +
'(cr_name, cr_buyer_id, cr_seller_id, cr_product_id, cr_latest_msg) ' +
'values (?, ?, ?, ?, "")';

export const getChatRoomToIDsSql = 'select * from chat_room where cr_product_id = ? and cr_seller_id = ? and cr_buyer_id = ?'
export const getChatRoomToRIDSql = 'select * from chat_room where cr_id = ?';

export const addMessageSql = 'insert into chat_message (cm_room_id, cm_sender_id, cm_receiver_id, cm_content, cm_is_media) values (?, ?, ?, ?, ?);';
export const getMessageToIdSql = 'select * from chat_message where cm_id = ?';

export const insertParticipantSql = "insert into participant (user_id, room_id, room_name) values (?, ?, ?);";

export const getChatRoomToUserIdSql = "select r.id, r.identifier, r.type, p.room_name, p.not_read_chat, p.last_read_chat_id, r.updated_at "
+ "from room r join participant p ON r.id = p.room_id" +
" where r.id = ? and p.user_id = ?;";

export const insertNewMessageSql = "insert into chatting (room_id, send_user_id, message, not_read) values (?, ?, ?, ?);";