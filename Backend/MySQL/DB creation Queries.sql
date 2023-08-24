create table user (
user_id int auto_increment primary key,
email varchar(50) unique not null,
password varchar(100) not null,
user_name varchar(50) unique not null,
name varchar(50),
dob date,
gender varchar(10),
mobile varchar(12),
profile_photo longblob,
extra1 varchar(0),
extra2 varchar(0),
extra3 varchar(0),
extra4 varchar(0)
);

create table post (
post_id int auto_increment primary key,
user_id int,
post_image longblob,

latitude double,
longitude double,
location_name varchar(200),

created_datetime datetime,
caption varchar(200),
likes_count int,
comments_count int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade
);



create table post_like (
like_id int primary key auto_increment,
post_id int,
user_id int,
created_datetime datetime,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (post_id) references post(post_id) on delete cascade on update cascade
);

create table post_comment (
comment_id int primary key auto_increment,
post_id int,
user_id int,
created_datetime datetime,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (post_id) references post(post_id) on delete cascade on update cascade
);

create table community (
community_id int primary key auto_increment,
admin_user_id int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (admin_user_id) references user(user_id) on delete cascade on update cascade
);

create table joined_community (
joined_community_id int primary key auto_increment,
user_id int,
community_id int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (community_id) references community(community_id) on delete cascade on update cascade
);


create table trip (
trip_id int primary key auto_increment,
user_id int,

latitude double,
longitude double,
location_name varchar(200),

itinerary varchar(500),
interested_count int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade
);


create table interested (
interested_id int primary key auto_increment,
user_id int,
trip_id int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade,
foreign key (trip_id) references trip(trip_id) on delete cascade on update cascade

);

create table conversation (
conversation_id int primary key auto_increment,
user_one int,
user_two int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_one) references user(user_id) on delete cascade on update cascade,
foreign key (user_two) references user(user_id) on delete cascade on update cascade
);



create table message (
message_id int primary key auto_increment,
user_sender int,
user_receiver int,
extra1 varchar(0),
extra2 varchar(0),
foreign key (user_sender) references user(user_id) on delete cascade on update cascade,
foreign key (user_receiver) references user(user_id) on delete cascade on update cascade
);

create table connection (
connection_id int primary key auto_increment,
following_to int not null,
followed_by int not null,
extra1 varchar(0),
extra2 varchar(0),
foreign key (following_to) references user(user_id) on delete cascade on update cascade,
foreign key (followed_by) references user(user_id) on delete cascade on update cascade
);


create table admin (
admin_id int primary key auto_increment,
user_id int,

extra1 varchar(0),
extra2 varchar(0),
foreign key (user_id) references user(user_id) on delete cascade on update cascade
);
