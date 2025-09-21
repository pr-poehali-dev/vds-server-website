CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);

COMMENT ON TABLE users IS 'Таблица пользователей системы';
COMMENT ON COLUMN users.username IS 'Уникальный логин пользователя';
COMMENT ON COLUMN users.name IS 'Отображаемое имя пользователя';
COMMENT ON COLUMN users.password_hash IS 'Хеш пароля пользователя';