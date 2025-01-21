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

CREATE TYPE reservation_source AS ENUM (
    'phone',
    'page'
);

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
    notes text,
    source reservation_source DEFAULT 'page',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservationtables (
    reservation_id integer NOT NULL REFERENCES reservations ON DELETE CASCADE,
    table_id integer NOT NULL REFERENCES tables ON DELETE CASCADE,
    PRIMARY KEY (reservation_id, table_id)
);

CREATE TABLE loyaltycodes (
    id serial PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
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
CREATE OR REPLACE FUNCTION restaurant.update_reservation_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Aktualizujemy tylko te rezerwacje, które są 'pending' i start_time jest starszy niż 2h
    UPDATE restaurant.reservations
    SET status = 'done'
    WHERE status = 'pending'
      AND start_time < (CURRENT_TIMESTAMP - INTERVAL '2 hours')
      AND id != NEW.id; -- Pomijamy aktualnie wstawioną/aktualizowaną rezerwację

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function dla nowych rezerwacji
CREATE OR REPLACE FUNCTION restaurant.trigger_update_reservation_status()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM restaurant.update_reservation_status();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger wykonujący się po dodaniu nowej rezerwacji
DROP TRIGGER IF EXISTS after_reservation_insert ON restaurant.reservations;
CREATE TRIGGER after_reservation_insert
    AFTER INSERT OR UPDATE ON restaurant.reservations
    FOR EACH ROW
    EXECUTE FUNCTION restaurant.trigger_update_reservation_status();

-- Funkcja generująca losowy kod lojalnościowy
CREATE OR REPLACE FUNCTION restaurant.generate_loyalty_code(length INTEGER DEFAULT 8) 
RETURNS varchar AS $$
DECLARE
    chars text[] := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result varchar := '';
    i integer;
BEGIN
    FOR i IN 1..length LOOP
        result := result || chars[ceil(random() * array_length(chars, 1))];
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Funkcja sprawdzająca i generująca kod lojalnościowy
CREATE OR REPLACE FUNCTION restaurant.check_and_generate_loyalty_code()
RETURNS TRIGGER AS $$
DECLARE
    completed_reservations integer;
    user_type_val restaurant.user_type;
    new_code varchar(20);
BEGIN
    IF NEW.status = 'done' AND OLD.status != 'done' THEN
        SELECT type INTO user_type_val
        FROM restaurant.users
        WHERE id = NEW.user_id::uuid;

        IF user_type_val = 'customer' THEN
            SELECT COUNT(*) INTO completed_reservations
            FROM restaurant.reservations
            WHERE user_id = NEW.user_id
            AND status = 'done';

            IF completed_reservations > 0 AND completed_reservations % 3 = 0 THEN
                LOOP
                    new_code := restaurant.generate_loyalty_code();
                    EXIT WHEN NOT EXISTS (
                        SELECT 1 FROM restaurant.loyaltycodes
                        WHERE code = new_code
                    );
                END LOOP;

                INSERT INTO restaurant.loyaltycodes (user_id, code)
                VALUES (NEW.user_id::uuid, new_code);
                
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tworzymy trigger
CREATE TRIGGER generate_loyalty_code_trigger
    AFTER UPDATE OF status ON restaurant.reservations
    FOR EACH ROW
    WHEN (NEW.status = 'done')
    EXECUTE FUNCTION restaurant.check_and_generate_loyalty_code();

-- Trigger wykonujący się po dodaniu nowej rezerwacji
CREATE TRIGGER check_reservation_status_trigger
AFTER INSERT ON restaurant.reservations
FOR EACH ROW
EXECUTE FUNCTION restaurant.update_reservation_status();


-- Widok pokazujący aktywne rezerwacje z informacjami o użytkowniku
CREATE VIEW restaurant.active_reservations AS
SELECT 
    r.id as reservation_id,
    u.username,
    r.start_time,
    r.end_time,
    r.status,
    r.notes
FROM restaurant.reservations r
JOIN restaurant.users u ON u.id = r.user_id::uuid
WHERE r.status = 'pending';

-- Widok ze statystykami użytkowników
CREATE VIEW restaurant.user_statistics AS
SELECT 
    u.id,
    u.username,
    u.email,
    COUNT(r.id) as total_reservations,
    COUNT(CASE WHEN r.status = 'done' THEN 1 END) as completed_reservations,
    COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) as cancelled_reservations,
    COUNT(l.id) as loyalty_codes_count
FROM restaurant.users u
LEFT JOIN restaurant.reservations r ON u.id = r.user_id::uuid
LEFT JOIN restaurant.loyaltycodes l ON u.id = l.user_id
GROUP BY u.id, u.username, u.email;

-- Widok pokazujący dostępne stoliki na dany moment
CREATE VIEW restaurant.available_tables AS
SELECT 
    t.id,
    t.table_number,
    t.capacity
FROM restaurant.tables t
WHERE NOT EXISTS (
    SELECT 1 
    FROM restaurant.reservations r
    JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
    WHERE rt.table_id = t.id
    AND r.status = 'pending'
    AND r.start_time <= CURRENT_TIMESTAMP
    AND r.end_time >= CURRENT_TIMESTAMP
);

-- Widok dla raportu rezerwacji dziennych
CREATE VIEW restaurant.daily_reservations_report AS
SELECT 
    DATE(r.start_time) as reservation_date,
    COUNT(*) as total_reservations,
    COUNT(CASE WHEN r.status = 'done' THEN 1 END) as completed,
    COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) as cancelled,
    COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending,
    COUNT(DISTINCT r.user_id) as unique_customers,
    STRING_AGG(DISTINCT t.table_number::TEXT, ', ') as tables_used
FROM restaurant.reservations r
LEFT JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
LEFT JOIN restaurant.tables t ON rt.table_id = t.id
GROUP BY DATE(r.start_time)
ORDER BY DATE(r.start_time) DESC;

-- Widok dla raportu popularności stolików
CREATE VIEW restaurant.table_popularity_report AS
SELECT 
    t.table_number,
    t.capacity,
    COUNT(r.id) as total_reservations,
    COUNT(CASE WHEN r.status = 'done' THEN 1 END) as successful_reservations,
    ROUND(COUNT(CASE WHEN r.status = 'done' THEN 1 END)::DECIMAL / 
          NULLIF(COUNT(r.id), 0) * 100, 2) as success_rate,
    COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) as cancellations
FROM restaurant.tables t
LEFT JOIN restaurant.reservationtables rt ON t.id = rt.table_id
LEFT JOIN restaurant.reservations r ON rt.reservation_id = r.id
GROUP BY t.id, t.table_number, t.capacity
ORDER BY total_reservations DESC;

-- Widok dla raportu lojalności klientów
CREATE VIEW restaurant.customer_loyalty_report AS
SELECT 
    u.username,
    u.email,
    COUNT(r.id) as total_reservations,
    COUNT(CASE WHEN r.status = 'done' THEN 1 END) as completed_reservations,
    COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) as cancelled_reservations,
    COUNT(l.id) as loyalty_codes_received,
    COUNT(CASE WHEN l.used = true THEN 1 END) as loyalty_codes_used,
    MAX(r.start_time) as last_reservation_date
FROM restaurant.users u
LEFT JOIN restaurant.reservations r ON u.id = r.user_id::uuid
LEFT JOIN restaurant.loyaltycodes l ON u.id = l.user_id
WHERE u.type = 'customer'
GROUP BY u.id, u.username, u.email
ORDER BY total_reservations DESC;

--  Raport dzienny rezerwacji (ostatnie 7 dni)
SELECT
    reservation_date,
    total_reservations,
    completed,
    cancelled,
    pending,
    unique_customers,
    tables_used
FROM restaurant.daily_reservations_report
WHERE reservation_date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY reservation_date DESC;

-- Raport popularności stolików z filtrowaniem
SELECT
    table_number,
    capacity,
    total_reservations,
    successful_reservations,
    success_rate || '%' as success_rate,
    cancellations
FROM restaurant.table_popularity_report
WHERE total_reservations > 0
ORDER BY success_rate DESC;

-- Raport lojalności klientów (top 10 najbardziej lojalnych klientów)
SELECT
    username,
    total_reservations,
    completed_reservations,
    loyalty_codes_received,
    loyalty_codes_used,
    ROUND((completed_reservations::DECIMAL /
           NULLIF(total_reservations, 0) * 100), 2) || '%' as completion_rate,
    last_reservation_date
FROM restaurant.customer_loyalty_report
WHERE total_reservations > 0
ORDER BY completed_reservations DESC, total_reservations DESC
LIMIT 10;

-- Raport miesięczny rezerwacji
SELECT 
    TO_CHAR(reservation_date, 'YYYY-MM') as month,
    SUM(total_reservations) as total_reservations,
    SUM(completed) as completed,
    SUM(cancelled) as cancelled,
    SUM(pending) as pending,
    COUNT(DISTINCT tables_used) as unique_tables_used
FROM restaurant.daily_reservations_report
GROUP BY TO_CHAR(reservation_date, 'YYYY-MM')
ORDER BY month DESC;

-- Raport efektywności stolików (które stoliki są najbardziej dochodowe)
SELECT 
    table_number,
    capacity,
    total_reservations,
    successful_reservations,
    success_rate,
    ROUND(successful_reservations::DECIMAL / capacity, 2) as efficiency_ratio
FROM restaurant.table_popularity_report
ORDER BY efficiency_ratio DESC;


-- Walidacja emaila przy pomocy CHECK constraint
ALTER TABLE restaurant.users
ADD CONSTRAINT valid_email 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Walidacja pojemności stolika
ALTER TABLE restaurant.tables
ADD CONSTRAINT valid_capacity 
CHECK (capacity > 0 AND capacity <= 12);

-- Funkcja sprawdzająca dostępność stolika
CREATE OR REPLACE FUNCTION restaurant.check_table_availability()
RETURNS TRIGGER AS $$
DECLARE
    reservation_start_time timestamp;
    reservation_end_time timestamp;
BEGIN
    SELECT start_time, end_time INTO reservation_start_time, reservation_end_time
    FROM restaurant.reservations
    WHERE id = NEW.reservation_id;

    IF EXISTS (
        SELECT 1 
        FROM restaurant.reservations r
        JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
        WHERE rt.table_id = NEW.table_id
        AND r.status = 'pending'
        AND r.id != NEW.reservation_id
        AND (
            (r.start_time <= reservation_start_time AND r.end_time > reservation_start_time)
            OR (r.start_time < reservation_end_time AND r.end_time >= reservation_end_time)
            OR (reservation_start_time <= r.start_time AND reservation_end_time > r.start_time)
        )
    ) THEN
        RAISE EXCEPTION 'Stolik jest już zarezerwowany w tym czasie';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger sprawdzający dostępność stolika
CREATE TRIGGER check_table_availability_trigger
    BEFORE INSERT OR UPDATE ON restaurant.reservationtables
    FOR EACH ROW
    EXECUTE FUNCTION restaurant.check_table_availability();

-- Funkcja walidująca kod lojalnościowy
CREATE OR REPLACE FUNCTION restaurant.validate_loyalty_code()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.code) < 6 OR LENGTH(NEW.code) > 20 THEN
        RAISE EXCEPTION 'Kod lojalnościowy musi mieć od 6 do 20 znaków';
    END IF;
    
    IF NEW.code !~ '^[A-Z0-9]+$' THEN
        RAISE EXCEPTION 'Kod lojalnościowy może zawierać tylko wielkie litery i cyfry';
    END IF;
    
    IF NEW.used = true AND OLD.used = true THEN
        RAISE EXCEPTION 'Nie można użyć kodu lojalnościowego więcej niż raz';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_loyalty_code_trigger
    BEFORE INSERT OR UPDATE ON restaurant.loyaltycodes
    FOR EACH ROW
    EXECUTE FUNCTION restaurant.validate_loyalty_code();

CREATE OR REPLACE FUNCTION restaurant.validate_menu_item()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.price <= 0 THEN
        RAISE EXCEPTION 'Cena musi być większa od 0';
    END IF;
    
    IF NEW.name = '' OR NEW.name IS NULL THEN
        RAISE EXCEPTION 'Nazwa pozycji menu nie może być pusta';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_menu_item_trigger
    BEFORE INSERT OR UPDATE ON restaurant.menuitems
    FOR EACH ROW
    EXECUTE FUNCTION restaurant.validate_menu_item();


CREATE OR REPLACE FUNCTION restaurant.check_reservation_overlap()
RETURNS TRIGGER AS $$
DECLARE
    total_capacity INTEGER;
    required_capacity INTEGER;
BEGIN
    SELECT COUNT(*) INTO required_capacity
    FROM restaurant.reservationtables
    WHERE reservation_id = NEW.id;
    
    SELECT COALESCE(SUM(t.capacity), 0) INTO total_capacity
    FROM restaurant.tables t
    WHERE t.id IN (
        SELECT rt.table_id
        FROM restaurant.reservationtables rt
        WHERE rt.reservation_id = NEW.id
    );
    
    IF total_capacity < required_capacity THEN
        RAISE EXCEPTION 'Niewystarczająca pojemność stolików dla tej rezerwacji';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_reservation_overlap_trigger
    AFTER INSERT OR UPDATE ON restaurant.reservations
    FOR EACH ROW
    EXECUTE FUNCTION restaurant.check_reservation_overlap();

CREATE INDEX idx_reservations_status ON restaurant.reservations(status);
CREATE INDEX idx_reservations_start_time ON restaurant.reservations(start_time);
CREATE INDEX idx_reservations_user_id ON restaurant.reservations(user_id);
CREATE INDEX idx_loyalty_codes_user_id ON restaurant.loyaltycodes(user_id);


ALTER TYPE user_type OWNER TO "default";
ALTER TYPE reservation_status OWNER TO "default";
ALTER TYPE menu_type OWNER TO "default";
ALTER TYPE reservation_source OWNER TO "default";
ALTER TABLE users OWNER TO "default";
ALTER TABLE tables OWNER TO "default";
ALTER TABLE reservations OWNER TO "default";
ALTER TABLE reservationtables OWNER TO "default";
ALTER TABLE loyaltycodes OWNER TO "default";
ALTER TABLE menuitems OWNER TO "default";
