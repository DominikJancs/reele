CREATE DATABASE reele_db
    DEFAULT CHARACTER SET = 'utf8' COLLATE utf8_hungarian_ci;

CREATE TABLE IF NOT EXISTS admins (
    admin_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    admin_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS users (
    user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    u_icon_path VARCHAR(255) NOT NULL,
    u_description VARCHAR(255)
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS vote_log (
    v_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    thought_id INT NOT NULL,
    vote_value INT NOT NULL 
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS bookmarks (
    b_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    b_page_pin INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS joins (
    j_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    club_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS views (
    user_id INT NOT NULL,
    post_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS reeles (
    r_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS flags (
    f_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    club_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS thoughts (
    thought_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    context VARCHAR(255) NOT NULL,
    vote_index INT NOT NULL,
    t_page_pin INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS tag_lib (
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag VARCHAR(50)
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS tag_log (
    t_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    tag_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS posts (
    post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULL,
    post_title VARCHAR(255) NOT NULL,
    by_title VARCHAR(50) NOT NULL,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    page_index INT NOT NULL,
    author_name VARCHAR(50) NOT NULL,
    cover_path VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    genre_id INT NOT NULL,
    club_id INT NOT NULL
) Engine=Innodb; 

CREATE TABLE IF NOT EXISTS clubs (
    club_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    club_name VARCHAR(50) NOT NULL,
    club_admin INT NOT NULL,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    c_icon_path VARCHAR(255) NOT NULL,
    banner_path VARCHAR(255) NOT NULL,
    c_description VARCHAR(255) NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS libra_log (
    l_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    libra_id INT NOT NULL,
    club_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS genre_log (
    g_cast_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre_id INT NOT NULL,
    club_id INT NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS libra_lib (
    libra_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    libra VARCHAR(255) NOT NULL
) Engine=Innodb;  

CREATE TABLE IF NOT EXISTS genre_lib (
    genre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre VARCHAR(255) NOT NULL
) Engine=Innodb;  

ALTER TABLE vote_log ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE vote_log ADD FOREIGN KEY (thought_id) REFERENCES thoughts (thought_id);

ALTER TABLE bookmarks ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE bookmarks ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE joins ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE joins ADD FOREIGN KEY (club_id) REFERENCES clubs (club_id);

ALTER TABLE views ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE views ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE reeles ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE reeles ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE thoughts ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);
ALTER TABLE thoughts ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE tag_log ADD FOREIGN KEY (tag_id) REFERENCES tag_lib (tag_id);
ALTER TABLE tag_log ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE posts ADD FOREIGN KEY (author_id) REFERENCES users (user_id);
ALTER TABLE posts ADD FOREIGN KEY (genre_id) REFERENCES genre_log (g_cast_id);
ALTER TABLE posts ADD FOREIGN KEY (club_id) REFERENCES clubs (club_id);

ALTER TABLE clubs ADD FOREIGN KEY (club_admin) REFERENCES users (user_id);

ALTER TABLE libra_log ADD FOREIGN KEY (club_id) REFERENCES clubs (club_id);
ALTER TABLE libra_log ADD FOREIGN KEY (libra_id) REFERENCES libra_lib (libra_id);

ALTER TABLE genre_log ADD FOREIGN KEY (genre_id) REFERENCES genre_lib (genre_id);
ALTER TABLE genre_log ADD FOREIGN KEY (club_id) REFERENCES clubs (club_id);

INSERT INTO
    admins (email, admin_name, password)
VALUES
    ("admin1@reele.com", "admin1", "c!zmPey4XB-nTBS" )

INSERT INTO
    genre_lib (genre_id, genre)
VALUES
    (1, 'classic' ),
    (2, 'action'),
    (3, 'comedy'),
    (4, 'crime'),
    (5, 'drama'),
    (6, 'sci-fi'),
    (7, 'western'),
    (8, 'teaching'),
    (9, 'nature');