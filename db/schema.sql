CREATE DATABASE game_db;
USE game_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE scores
(
	id int NOT NULL AUTO_INCREMENT,
	total_score INT NOT NULL,
	user_id INT NOT NULL, 
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) references users(id)
);

CREATE TABLE word_category
(
	id int NOT NULL AUTO_INCREMENT,
	category_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE words
(
	id int NOT NULL AUTO_INCREMENT,
	category_id INT NOT NULL,
	word VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id),
	FOREIGN KEY (category_id) references word_category(id)
);

INSERT INTO word_category(category_name)
VALUES ("Sports") , ("Movies"), ("Actors");

INSERT INTO words(category_id, word)
VALUES (3, "Bradley Cooper"), (3, "Chris Pratt"), (3, "Jennifer Lawerence"), (3, "Ben Affleck"), (3, "Natalie Portman");
