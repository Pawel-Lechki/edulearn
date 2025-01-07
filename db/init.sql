CREATE DATABASE IF NOT EXISTS edulearn;

USE edulearn;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS course_topics;
DROP TABLE IF EXISTS course_users;
DROP TABLE IF EXISTS course_images;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    related INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (related) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS course_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    topic_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS course_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    user_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS course_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    image VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES courses(id)
    ON DELETE CASCADE
);

INSERT INTO topics (name) VALUES
('New'),
('Related'),
('Popular'),
('Trending'),
('Featured'),
('Free'),
('Reacr'),
('JavaScript'),
('Python'),
('C++'),
('C#'),
('C'),
('PHP'),
('Ruby'),
('Swift'),
('Kotlin'),
('Go'),
('Rust'),
('TypeScript'),
('Scala'),
('Perl'),
('Haskell'),
('Lua'),
('R'),
('Dart'),
('Elixir'),
('Clojure'),
('F#'),
('Erlang'),
('Rust'),
('Racket'),
('Scheme'),
('Lisp'),
('Prolog'),
('SQL'),
('NoSQL'),
('MongoDB'),
('MySQL'),
('PostgreSQL'),
('SQLite'),
('Oracle'),
('SQL Server'),
('MariaDB'),
('Cassandra'),
('Redis'),
('Firebase')
('Sale');

INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', 'admin123', 'admin'),
('teacher', 'teacher@example.com', 'teacher123', 'teacher'),
('user', 'user@example.com', 'user123', 'user');

-- First insert courses without related references
INSERT INTO courses (title, short_description, description, price, image, user_id) VALUES
('Course 4', 'Short description 4', 'Description 4', 25.99, 'course4.jpg', 1),
('Course 5', 'Short description 5', 'Description 5', 30.99, 'course5.jpg', 2),
('Course 7', 'Short description 7', 'Description 7', 40.99, 'course7.jpg', 1),
('Course 8', 'Short description 8', 'Description 8', 45.99, 'course8.jpg', 2),
('Course 10', 'Short description 10', 'Description 10', 55.99, 'course10.jpg', 1),
('Course 11', 'Short description 11', 'Description 11', 60.99, 'course11.jpg', 2),
('Course 13', 'Short description 13', 'Description 13', 70.99, 'course13.jpg', 1),
('Course 14', 'Short description 14', 'Description 14', 75.99, 'course14.jpg', 2),
('Course 15', 'Short description 15', 'Description 15', 80.99, 'course15.jpg', 3);

-- Then insert courses with related references
INSERT INTO courses (title, short_description, description, price, image, user_id, related) VALUES
('Course 1', 'Short description 1', 'Description 1', 10.99, 'course1.jpg', 1, 2),
('Course 2', 'Short description 2', 'Description 2', 15.99, 'course2.jpg', 2, 1),
('Course 3', 'Short description 3', 'Description 3', 20.99, 'course3.jpg', 3, 1),
('Course 6', 'Short description 6', 'Description 6', 35.99, 'course6.jpg', 3, 2),
('Course 9', 'Short description 9', 'Description 9', 50.99, 'course9.jpg', 3, 1),
('Course 12', 'Short description 12', 'Description 12', 65.99, 'course12.jpg', 3, 2);

INSERT INTO course_topics (course_id, topic_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9);