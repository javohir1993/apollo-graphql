insert into users (username, password) values
('john', crypt('john', gen_salt('bf'))),
('don', crypt('don', gen_salt('bf'))),
('bob', crypt('bob', gen_salt('bf'))),
('erik', crypt('erik', gen_salt('bf')))
;

insert into posts (post_title, post_content, user_id) values
('First Post Title', 'The first content of the post', 11),
('Second Post Title', 'The second content of the post', 12),
('Third Post Title', 'The third content of the post', 12),
('Fourth Post Title', 'The fourth content of the post', 13)
;

insert into comments (comment_content, user_id, post_id) values
('This was a Great FirstPost from DON', 2, 1),
('This is norm post from BOB', 3, 1),
('to second post from ERIK', 4, 2),
('to fourth post from BOB', 3, 4),
('to third post from DON', 2, 3)
;

insert into comments (comment_content, user_id, post_id) values
('to firts post from OWNER', 1, 1)
;