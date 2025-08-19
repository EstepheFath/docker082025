CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(200)
    );

CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     title VARCHAR(200),
    user_id INT REFERENCES users(id)
    );
