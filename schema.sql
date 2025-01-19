-- ALL TABLES ARE IN THE SCHEMA "restaurant"

-- Create extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create custom types
CREATE TYPE user_type AS ENUM (
    'admin',
    'customer'
);

CREATE TYPE reservation_status AS ENUM (
    'cancelled',
    'done',
    'pending'
);

CREATE TYPE menu_type AS ENUM (
    'przystawki',
    'salatki',
    'zupy',
    'miesa',
    'ryby',
    'regionalne',
    'dodatki',
    'napoje'
);

-- Create tables
CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password_hash text NOT NULL,
    type user_type DEFAULT 'customer',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_email_username_unique UNIQUE (email, username)
);

CREATE TABLE tables (
    id serial PRIMARY KEY,
    table_number integer NOT NULL UNIQUE,
    capacity integer NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
    id serial PRIMARY KEY,
    user_id integer,
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL,
    status reservation_status DEFAULT 'pending',
    email_confirmation_sent boolean DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservationtables (
    reservation_id integer NOT NULL REFERENCES reservations ON DELETE CASCADE,
    table_id integer NOT NULL REFERENCES tables ON DELETE CASCADE,
    PRIMARY KEY (reservation_id, table_id)
);

CREATE TABLE loyaltycodes (
    id serial PRIMARY KEY,
    user_id integer,
    code varchar(20) NOT NULL UNIQUE,
    discount_percentage integer DEFAULT 20,
    used boolean DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menuitems (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text,
    price integer NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    type menu_type NOT NULL
);


-- Funkcja do automatycznej aktualizacji statusu rezerwacji
CREATE OR REPLACE FUNCTION update_reservation_status() RETURNS void AS $$
BEGIN
    UPDATE reservations
    SET status = 'done'
    WHERE status = 'pending'
    AND end_time < (CURRENT_TIMESTAMP - INTERVAL '2 hours');
END;
$$ LANGUAGE plpgsql;

-- Trigger function dla nowych rezerwacji
CREATE OR REPLACE FUNCTION trigger_update_reservation_status()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM update_reservation_status();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger wykonujący się po dodaniu nowej rezerwacji
CREATE TRIGGER after_reservation_insert
    AFTER INSERT ON reservations
    FOR EACH STATEMENT
    EXECUTE FUNCTION trigger_update_reservation_status();

-- Set ownership
ALTER TYPE user_type OWNER TO "default";
ALTER TYPE reservation_status OWNER TO "default";
ALTER TYPE menu_type OWNER TO "default";
ALTER TABLE users OWNER TO "default";
ALTER TABLE tables OWNER TO "default";
ALTER TABLE reservations OWNER TO "default";
ALTER TABLE reservationtables OWNER TO "default";
ALTER TABLE loyaltycodes OWNER TO "default";
ALTER TABLE menuitems OWNER TO "default";