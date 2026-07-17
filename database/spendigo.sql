CREATE DATABASE IF NOT EXISTS spendigo
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE spendigo;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    photo VARCHAR(255) DEFAULT NULL,

    bio TEXT DEFAULT NULL,

    currency VARCHAR(10) NOT NULL DEFAULT 'USD',

    dark_mode BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- CATEGORIES
-- =====================================================

CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(100) NOT NULL,

    type ENUM('income','expense') NOT NULL,

    color CHAR(7) DEFAULT '#3B82F6',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_categories_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_category (user_id, name, type),

    INDEX idx_categories_user (user_id)
);

-- =====================================================
-- TRANSACTIONS
-- =====================================================

CREATE TABLE transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    category_id BIGINT UNSIGNED NOT NULL,

    description VARCHAR(255) NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    transaction_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transactions_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    INDEX idx_transactions_user (user_id),

    INDEX idx_transactions_category (category_id),

    INDEX idx_transactions_date (transaction_date)
);

-- =====================================================
-- NOTIFICATION SETTINGS
-- =====================================================

CREATE TABLE notification_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL UNIQUE,

    budget_alerts BOOLEAN NOT NULL DEFAULT TRUE,

    weekly_summary BOOLEAN NOT NULL DEFAULT TRUE,

    security_alerts BOOLEAN NOT NULL DEFAULT TRUE,

    monthly_digest BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);