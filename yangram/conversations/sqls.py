from . import constants

BEFORE_CONVERSATION_LIST_SQL='''
SELECT cmi.conversation_id                   AS conversation_id, 
       LEFT(cm.message, 30)                  AS message, 
       cm.message_type                       AS message_type, 
       cm.created_at                         AS message_created_at, 
       cmi.conversation_user_list            AS conversation_user_list, 
       ( cm.created_at < cmi.last_read_date )AS is_read 
FROM   (SELECT p.conversation_id, 
               Max(p.last_read_date)                      AS last_read_date, 
               Max(m.id)                                  AS message_id, 
               (SELECT Json_arrayagg(Json_object('username', u.username, 
                                     'profile_image', 
                                             u.profile_image)) AS 
                       conversation_user_list 
                FROM   yangram.conversations_participant cp, 
                       yangram.users_user u 
                WHERE  cp.conversation_id = p.conversation_id 
                       AND cp.participant_user_id <> %s 
                       AND cp.participant_user_id = u.id) AS 
               conversation_user_list 
        FROM   (SELECT conversation_id, 
                       last_read_date 
                FROM   yangram.conversations_participant up 
                WHERE  up.participant_user_id = %s) AS p 
               LEFT JOIN yangram.conversations_message m 
                      ON p.conversation_id = m.conversation_id 
        GROUP  BY p.conversation_id 
        ORDER  BY message_id DESC 
        LIMIT %s, {PAGE_SIZE}) cmi 
       LEFT JOIN yangram.conversations_message cm 
              ON cmi.message_id = cm.id 
'''
CONVERSATION_LIST_SQL = BEFORE_CONVERSATION_LIST_SQL.format(PAGE_SIZE=constants.PAGE_SIZE) 

CHECK_CONVERSATION_EXISTS_SQL='''
SELECT p1.conversation_id 
FROM   conversations_participant p1 
       JOIN conversations_participant p2 
         ON p1.participant_user_id = %s 
            AND p2.participant_user_id = %s 
            AND p1.conversation_id = p2.conversation_id 
'''
SEARCH_MESSAGE_SQL='''
SELECT cmi.conversation_id        AS conversation_id, 
       LEFT(cm.message, 30)       AS message, 
       cm.created_at              AS message_created_at, 
       cmi.conversation_user_list AS conversation_user_list 
FROM   (SELECT p.conversation_id, 
               Max(m.id)                                  AS message_id, 
               (SELECT Json_arrayagg(Json_object('username', u.username, 
                                     'profile_image', 
                                             u.profile_image)) AS 
                       conversation_user_list 
                FROM   yangram.conversations_participant cp, 
                       yangram.users_user u 
                WHERE  cp.conversation_id = p.conversation_id 
                       AND cp.participant_user_id <> %s 
                       AND cp.participant_user_id = u.id) AS 
               conversation_user_list 
        FROM   yangram.conversations_participant p, 
               yangram.conversations_message m 
        WHERE  p.participant_user_id = %s
               AND p.conversation_id = m.conversation_id 
               AND m.message_type = 0 
               AND m.message LIKE %s 
        GROUP  BY p.conversation_id) cmi 
       LEFT JOIN yangram.conversations_message cm 
              ON cmi.message_id = cm.id 
'''