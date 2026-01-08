CREATE TABLE IF NOT EXISTS brew_logs (
    id SERIAL PRIMARY KEY,
    coffee_name VARCHAR(100),
    method VARCHAR(50),
    ratio DECIMAL(5,2),
    coffee_weight DECIMAL(5,2),
    water_amount DECIMAL(6,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);