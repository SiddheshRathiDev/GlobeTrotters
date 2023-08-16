create table user (
user_id int auto_increment primary key,
email_address varchar(50) unique not null,
password varchar(50),
user_name varchar(50) unique not null,
name varchar(50),
date_of_birth date,
gender varchar(10),
mobile_number varchar(12),
profile_photo varchar(200)
);

create table post (
post_id int auto_increment primary key,
user_id int,
photo_url varchar(500),
created_datetime datetime,
caption varchar(200),
likes_count int,
comments_count int,
foreign key (user_id) references user(user_id) on delete cascade on update cascade
);



create table post_likes (
like_id int primary key auto_increment,
post_id int,
user_id int,
created_datetime datetime,
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (post_id) references post(post_id) on delete cascade on update cascade

);

create table post_comments (
comment_id int primary key auto_increment,
post_id int,
user_id int,
created_datetime datetime,
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (post_id) references post(post_id) on delete cascade on update cascade
);

create table community (
community_id int primary key auto_increment,
admin_user_id int,
foreign key (admin_user_id) references user(user_id) on delete cascade on update cascade
);

create table joined_community (
joined_community_id int primary key auto_increment,
user_id int,
community_id int,
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (community_id) references community(community_id) on delete cascade on update cascade
);

create table trip (
trip_id int primary key auto_increment,
user_id int,
itinerary varchar(500),
interested_count int,
foreign key (user_id) references user(user_id) on delete cascade on update cascade
);


create table interested (
interested_id int primary key auto_increment,
user_id int,
trip_id int,
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (trip_id) references trip(trip_id) on delete cascade on update cascade

);

create table conversation (
conversation_id int primary key auto_increment,
user_one int,
user_two int,
foreign key (user_one) references user(user_id) on delete cascade on update cascade,
foreign key (user_two) references user(user_id) on delete cascade on update cascade
);


create table message (
message_id int primary key auto_increment,
user_sender int,
user_receiver int,
foreign key (user_sender) references user(user_id) on delete cascade on update cascade,
foreign key (user_receiver) references user(user_id) on delete cascade on update cascade
);

create table connection (
connection_id int primary key auto_increment,
user_follower int,
user_following int,
foreign key (user_follower) references user(user_id) on delete cascade on update cascade,
foreign key (user_following) references user(user_id) on delete cascade on update cascade
);


create table admin (
admin_id int,
foreign key (admin_id) references user(user_id) on delete cascade on update cascade
);


show tables;








