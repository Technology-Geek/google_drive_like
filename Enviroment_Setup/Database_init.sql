CREATE DATABASE IF NOT EXISTS google_drive_like;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (id));
    
CREATE TABLE IF NOT EXISTS folders (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    parentId INT DEFAULT NULL,
    FOREIGN KEY (parentId) REFERENCES folders(id),
    PRIMARY KEY (id));
    
CREATE TABLE IF NOT EXISTS owners (
    id INT NOT NULL AUTO_INCREMENT,
    folderId INT NOT NULL,
    userId INT NOT NULL,
    access ENUM ('full','read','write') DEFAULT 'full',
    PRIMARY KEY (id),
    FOREIGN KEY (folderId) REFERENCES folders(id),
    FOREIGN KEY (userId) REFERENCES users(id));

