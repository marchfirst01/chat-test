export const getChatRoomToRIDSql = 
'select cr.cr_id, cr.cr_status, cr.cr_buyer_id, cr.cr_seller_id, '+
'cr.cr_product_id, p.product_name, p.product_status, p.product_price, p.product_preview_img, '+
'buyer.user_nickname as buyerNickname, buyer.user_profile as buyerProfile, '+
'seller.user_nickname as sellerNickname, seller.user_profile as sellerProfile '+
'from chat_room as cr '+
'inner join user as buyer on cr.cr_buyer_id = buyer.user_id '+
'inner join user as seller on cr.cr_seller_id = seller.user_id '+
'left join product p on cr.cr_product_id = p.product_id '+
'where cr.cr_id = ?';

export const addMessageSql = 'insert into chat_message (cm_room_id, cm_sender_id, cm_receiver_id, cm_content, cm_is_media) values (?, ?, ?, ?, ?);';
export const getMessageToIdSql = 'select * from chat_message where cm_id = ?';
export const updateRoomLastMsgSql = 'update chat_room set cr_latest_msg = ?, cr_latest_msg_date = ?, updated_at = CURRENT_TIMESTAMP where cr_id = ?';

export const updateReadMessageSql = "update chat_message set cm_is_read=1, updated_at=CURRENT_TIMESTAMP where cm_room_id = ? and cm_is_read = 0 and cm_receiver_id = ?";