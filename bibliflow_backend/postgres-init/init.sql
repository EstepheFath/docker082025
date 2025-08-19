CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
    );

CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id)
    );
