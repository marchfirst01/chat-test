export const isRoomExistSql = "select cr_id from chat_room where cr_product_id = ? and cr_seller_id = ? and cr_buyer_id = ?"

export const insertChatRoomSql = 'insert into chat_room ' +
'(cr_buyer_id, cr_seller_id, cr_product_id, cr_latest_msg) ' +
'values (?, ?, ?, "")';

export const getCreateChatRoomToIDsSql = 'select cr_id from chat_room where cr_product_id = ? and cr_seller_id = ? and cr_buyer_id = ?'

export const countChatRoom = 'select cr_id as chatRoomCursor from chat_room order by cr_id desc limit 1;';
export const countChatLog = 'select cm_id as chatLogCursor from chat_message order by cm_id desc limit 1;';

export const getChatListSql =
"select cr.cr_id, cr.cr_status, cr.cr_buyer_id, cr.cr_seller_id, cr.cr_latest_msg, cr.cr_latest_msg_date, "+
"buyer.user_nickname as buyerName, buyer.user_profile as buyerProfile, seller.user_nickname as sellerName, seller.user_profile as sellerProfile, readCount.cnt as notReadCount "+
"from chat_room cr "+
"inner join user as buyer on cr.cr_buyer_id = buyer.user_id "+
"inner join user as seller on cr.cr_seller_id = seller.user_id "+
"left join (select cm.cm_room_id, count(case when cm.cm_is_read = 0 and cm.cm_receiver_id = ? then 1 end) cnt "+
"from chat_message cm where cm.cm_receiver_id = ? or cm.cm_sender_id = ? group by cm.cm_room_id) as readCount on readCount.cm_room_id = cr.cr_id "+
"where (cr.cr_buyer_id = ? or cr.cr_seller_id = ?) and cr.cr_id < ? order by cr.cr_latest_msg_date desc limit ?;";

export const getChatLogSql =
"select cm.cm_id, cm.cm_sender_id, cm.cm_receiver_id, cm.cm_content, cm.cm_is_read, cm.created_at, cm.cm_is_media "+
"from chat_message cm where cm.cm_room_id = ? and cm.cm_id < ? order by cm.created_at desc limit ?";