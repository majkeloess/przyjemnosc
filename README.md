# System zarządzania rezerwacjami dla restauracji "Przyjemność"

## Projekt koncepcji i założenia

### Cele projektu

Projekt stanowi kompleksowe rozwiązanie do zarządzania rezerwacjami stolików w restauracji. System został zaprojektowany jako aplikacja fullstackowa wykorzystująca technologie Next.js oraz bazę danych PostgreSQL. Głównym celem jest automatyzacja procesu rezerwacji oraz efektywne zarządzanie stolikami w restauracji. Aplikacja jest w pełni responsywna na komputerach jak i na urządzeniach mobilnych.

#### Główne cele projektu:

- Usprawnienie procesu rezerwacji stolików
- Zwiększenie efektywności zarządzania miejscami w restauracji
- Implementacja systemu lojalnościowego dla stałych klientów
- Zapewnienie narzędzi analitycznych dla kierownictwa restauracji
- Minimalizacja ryzyka podwójnych rezerwacji

### Analiza wymagań użytkownika

#### Wymagania funkcjonalne dla klientów:

- Możliwość utworzenia i zarządzania kontem użytkownika
- Dokonywanie rezerwacji stolików online
- Przeglądanie dostępnych terminów i stolików
- Dostęp do historii własnych rezerwacji
- Korzystanie z kodów lojalnościowych
- Możliwość anulowania rezerwacji

#### Wymagania funkcjonalne dla administratorów:

- Zarządzanie rezerwacjami (podgląd, edycja, anulowanie)
- Zarządzanie stolikami (dodawanie, edycja, usuwanie)
- Dostęp do raportów i statystyk
- Zarządzanie menu restauracji
- Monitoring systemu lojalnościowego
- Zarządzanie kontami użytkowników

### Podstawowe funkcje systemu

#### Funkcje związane z rezerwacjami:

- Automatyczna walidacja dostępności stolików
- Automatyczna aktualizacja statusów rezerwacji
- Kontrola nakładania się rezerwacji
- Generowanie potwierdzeń rezerwacji

#### Funkcje systemu lojalnościowego:

- Automatyczne generowanie kodów lojalnościowych
- Walidacja kodów rabatowych
- Śledzenie historii wykorzystania kodów
- Przyznawanie kodów po określonej liczbie wizyt

#### Funkcje raportowania:

- Generowanie raportów dziennych rezerwacji
- Analiza popularności stolików
- Statystyki lojalności klientów
- Raporty miesięczne wykorzystania restauracji

#### Funkcje administracyjne:

- Zarządzanie użytkownikami i uprawnieniami
- Konfiguracja parametrów systemu
- Zarządzanie menu restauracji
- Monitoring aktywności systemu

#### Funkcje bezpieczeństwa:

- Szyfrowanie danych użytkowników
- Walidacja danych wejściowych
- Kontrola dostępu do funkcji systemu
- Zabezpieczenie przed nieautoryzowanym dostępem

System został zaprojektowany z myślą o skalowalności i możliwości rozbudowy o dodatkowe funkcjonalności w przyszłości, zachowując przy tym wysoką wydajność i niezawodność działania.

## Projekt diagramów

### Diagram przepływu danych (DFD)

#### Poziom 0 (Diagram kontekstowy):

```mermaid
graph TD
    Klient[Klient] -->|Rejestracja/Logowanie| System[System Rezerwacji]
    Klient -->|Dokonanie rezerwacji| System
    System -->|Potwierdzenie rezerwacji| Klient
    System -->|Kody lojalnościowe| Klient
    Administrator[Administrator] -->|Zarządzanie systemem| System
    System -->|Raporty i statystyki| Administrator
    System -->|Status rezerwacji| Klient
```

#### Poziom 1:

```mermaid
graph TD
    %% Procesy główne
    P1[1.0 Zarządzanie użytkownikami]
    P2[2.0 Zarządzanie rezerwacjami]
    P3[3.0 System lojalnościowy]
    P4[4.0 Raportowanie]

    %% Magazyny danych
    D1[(Baza użytkowników)]
    D2[(Baza rezerwacji)]
    D3[(Baza kodów)]
    D4[(Baza stolików)]

    %% Przepływy danych - Użytkownicy
    Klient -->|Dane rejestracji| P1
    P1 -->|Zapisz dane| D1
    P1 -->|Autoryzacja| Klient

    %% Przepływy danych - Rezerwacje
    Klient -->|Nowa rezerwacja| P2
    P2 -->|Sprawdź dostępność| D4
    P2 -->|Zapisz rezerwację| D2
    P2 -->|Potwierdzenie| Klient

    %% Przepływy danych - System lojalnościowy
    P2 -->|Zakończona rezerwacja| P3
    P3 -->|Generuj kod| D3
    P3 -->|Wyślij kod| Klient

    %% Przepływy danych - Raportowanie
    Administrator -->|Żądanie raportu| P4
    P4 -->|Pobierz dane| D2
    P4 -->|Statystyki| Administrator
```

### Encje i atrybuty

1. **Użytkownik (users)**

   - id (UUID)
   - username (VARCHAR)
   - email (VARCHAR)
   - password_hash (TEXT)
   - type (ENUM)
   - created_at (TIMESTAMP)

2. **Stolik (tables)**

   - id (SERIAL)
   - table_number (INTEGER)
   - capacity (INTEGER)
   - created_at (TIMESTAMP)

3. **Rezerwacja (reservations)**

   - id (SERIAL)
   - user_id (UUID)
   - start_time (TIMESTAMP)
   - end_time (TIMESTAMP)
   - status (ENUM)
   - notes (TEXT)
   - source (ENUM)
   - created_at (TIMESTAMP)

4. **Kod lojalnościowy (loyaltycodes)**

   - id (SERIAL)
   - user_id (UUID)
   - code (VARCHAR)
   - discount_percentage (INTEGER)
   - used (BOOLEAN)
   - created_at (TIMESTAMP)

5. **Pozycja menu (menuitems)**
   - id (SERIAL)
   - name (VARCHAR)
   - description (TEXT)
   - price (INTEGER)
   - type (ENUM)
   - created_at (TIMESTAMP)

### 6. Relacje między encjami

#### Opis relacji:

1. **Użytkownik - Rezerwacja**

   - Relacja jeden-do-wielu
   - Użytkownik może mieć wiele rezerwacji
   - Każda rezerwacja należy do jednego użytkownika

2. **Rezerwacja - Stolik**

   - Relacja wiele-do-wielu
   - Rozwiązana przez tabelę pośrednią reservationtables
   - Jedna rezerwacja może obejmować wiele stolików
   - Jeden stolik może być w wielu rezerwacjach

3. **Użytkownik - Kod lojalnościowy**
   - Relacja jeden-do-wielu
   - Użytkownik może mieć wiele kodów lojalnościowych
   - Każdy kod należy do jednego użytkownika

## Projekt logiczny

### Projektowanie tabel, kluczy i indeksów

#### Struktura bazy danych

Baza danych została zaprojektowana w schemacie "restaurant" i zawiera następujące tabele:

1. **users** - przechowuje dane użytkowników

   - Klucz główny: `id` (uuid)
   - Unikalne constrainty: `username`, `email`
   - Walidacja email poprzez CHECK constraint

2. **tables** - przechowuje informacje o stolikach

   - Klucz główny: `id` (serial)
   - Unikalny constraint: `table_number`
   - Walidacja pojemności (1-12 osób)

3. **reservations** - przechowuje rezerwacje

   - Klucz główny: `id` (serial)
   - Powiązanie z `users` przez `user_id`
   - Automatyczna aktualizacja statusu przez trigger

4. **reservationtables** - tabela łącząca rezerwacje ze stolikami

   - Klucz główny: kombinacja `(reservation_id, table_id)`
   - Klucze obce z CASCADE DELETE

5. **loyaltycodes** - kody lojalnościowe

   - Klucz główny: `id` (serial)
   - Powiązanie z `users` przez `user_id` (SET NULL przy usunięciu)
   - Walidacja formatu kodu przez trigger

6. **menuitems** - pozycje menu
   - Klucz główny: `id` (serial)
   - Walidacja ceny i nazwy przez trigger

#### Indeksy

Zoptymalizowano wydajność zapytań poprzez utworzenie indeksów:

```sql
CREATE INDEX idx_reservations_status ON restaurant.reservations(status);
CREATE INDEX idx_reservations_start_time ON restaurant.reservations(start_time);
CREATE INDEX idx_reservations_user_id ON restaurant.reservations(user_id);
CREATE INDEX idx_loyalty_codes_user_id ON restaurant.loyaltycodes(user_id);
```

### Słowniki danych

#### Typy wyliczeniowe (ENUM)

1. **user_type**

   - 'admin' - administrator systemu
   - 'customer' - klient restauracji

2. **reservation_status**

   - 'cancelled' - rezerwacja anulowana
   - 'done' - rezerwacja zrealizowana
   - 'pending' - rezerwacja oczekująca

3. **menu_type**

   - 'przystawki', 'salatki', 'zupy', 'miesa', 'ryby', 'regionalne', 'dodatki', 'napoje'

4. **reservation_source**
   - 'phone' - rezerwacja telefoniczna
   - 'page' - rezerwacja online

### Analiza zależności funkcyjnych i normalizacja

Baza danych spełnia wymagania trzeciej postaci normalnej (3NF):

1. Wszystkie tabele są w 1NF:

   - Każda kolumna zawiera wartości atomowe
   - Brak powtarzających się grup kolumn

2. Spełnione są wymagania 2NF:

   - Wszystkie atrybuty niekluczowe są w pełni funkcyjnie zależne od klucza głównego

3. Spełnione są wymagania 3NF:
   - Brak zależności przechodnich między atrybutami niekluczowymi

### Denormalizacja

W celu optymalizacji wydajności i ułatwienia raportowania, utworzono następujące widoki:

1. **active_reservations** - aktywne rezerwacje z danymi użytkowników
2. **user_statistics** - statystyki użytkowników
3. **available_tables** - aktualnie dostępne stoliki
4. **daily_reservations_report** - raport dzienny rezerwacji
5. **table_popularity_report** - raport popularności stolików
6. **customer_loyalty_report** - raport lojalności klientów

### Operacje na danych

Zaimplementowano następujące funkcje i triggery:

1. **Automatyczna aktualizacja statusu rezerwacji**

   - Trigger `after_reservation_insert`
   - Aktualizuje status rezerwacji na 'done' po 2 godzinach

2. **System kodów lojalnościowych**

   - Funkcja `generate_loyalty_code`
   - Trigger `generate_loyalty_code_trigger`
   - Automatyczne generowanie kodów po każdej 3 zrealizowanej rezerwacji

3. **Walidacja dostępności stolików**

   - Funkcja `check_table_availability`
   - Trigger `check_table_availability_trigger`
   - Zapobiega nakładaniu się rezerwacji

4. **Walidacja danych**
   - Walidacja emaili użytkowników
   - Walidacja pojemności stolików
   - Walidacja kodów lojalnościowych
   - Walidacja pozycji menu

#### Zaimplementowane raporty i analizy:

1. **Raport dzienny rezerwacji (ostatnie 7 dni)**

```sql
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
```

2. **Raport popularności stolików**

```sql
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
```

3. **Raport lojalności klientów (top 10)**

```sql
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
```

4. **Raport miesięczny rezerwacji**

```sql
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
```

#### Zaimplementowane procedury bezpieczeństwa:

1. **Walidacja danych wejściowych**

   - Sprawdzanie poprawności adresów email
   - Weryfikacja formatów kodów lojalnościowych
   - Kontrola pojemności stolików
   - Walidacja cen w menu

2. **Kontrola integralności danych**

   - Kaskadowe usuwanie powiązanych rekordów
   - Automatyczna aktualizacja statusów rezerwacji
   - Zabezpieczenie przed duplikacją rezerwacji

3. **Zarządzanie uprawnieniami**
   - Rozróżnienie ról użytkowników (admin/customer)
   - Ograniczenie dostępu do funkcji administracyjnych
   - Kontrola dostępu do raportów i statystyk

## Projekt funkcjonalny

### Interfejsy do prezentacji, edycji i obsługi danych

#### Formularze wprowadzania danych:

1. **Formularz rejestracji użytkownika**

   - Pola: username, email, hasło, potwierdzenie hasła
   - Walidacja email i hasła
   - Automatyczne przypisanie roli 'customer'

   Zobacz implementację w [RejestracjaForm.tsx](https://github.com/majkeloess/przyjemnosc/blob/main/components/reservation-page.tsx/RejestracjaForm.tsx#L50-L74)

2. **Formularz rezerwacji stolika**

   - Wybór liczby osób
   - Wybór daty i godziny
   - Automatyczna walidacja dostępności
   - Obsługa błędów i potwierdzeń

   Zobacz implementację w [RezerwacjaForm.tsx](https://github.com/majkeloess/przyjemnosc/blob/main/components/reservation-page.tsx/RezerwacjaForm.tsx#L11-L54)

3. **System powiązań formularzy:**
   - Rezerwacja możliwa tylko dla zalogowanych użytkowników
   - Automatyczne przypisanie użytkownika do rezerwacji
   - Walidacja kodów lojalnościowych przed zastosowaniem

### Wizualizacja danych

#### Raporty systemowe:

1. **Raport dzienny rezerwacji**

   - Statystyki rezerwacji z ostatnich 7 dni
   - Podsumowanie statusów rezerwacji

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L281-L292)

2. **Raport popularności stolików**

   - Analiza wykorzystania stolików
   - Wskaźnik sukcesu rezerwacji

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L294-L304)

3. **Raport lojalności klientów**

   - Top 10 najbardziej aktywnych klientów
   - Statystyki wykorzystania kodów lojalnościowych

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L306-L319)

4. **Raport miesięczny**

   - Agregacja danych miesięcznych
   - Trendy w rezerwacjach

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L321-L331)

### Panel sterowania aplikacji

#### Panel klienta:

- Podgląd własnych rezerwacji
- Możliwość anulowania rezerwacji
- Historia kodów lojalnościowych

Zobacz implementację w [ReservationRow.tsx](https://github.com/majkeloess/przyjemnosc/blob/main/components/panel-page/customer/ReservationRow.tsx#L26-L61)

#### Panel administratora:

- Zarządzanie wszystkimi rezerwacjami
- Dostęp do raportów i statystyk
- Zarządzanie menu i stolikami

Zobacz implementację w [page.tsx](https://github.com/majkeloess/przyjemnosc/blob/main/app/rezerwacje/panel/[id]/reservations/page.tsx#L1-L20)

### Makropolecenia

#### Automatyzacja procesów:

1. **Zarządzanie rezerwacjami:**

   - Automatyczna aktualizacja statusów
   - Generowanie kodów lojalnościowych

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L87-L116)

2. **System lojalnościowy:**

   - Automatyczne generowanie kodów
   - Walidacja i obsługa kodów

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L118-L177)

3. **Walidacja danych:**

   - Sprawdzanie dostępności stolików
   - Kontrola nakładania się rezerwacji

   Zobacz implementację w [schema.sql](https://github.com/majkeloess/przyjemnosc/blob/main/schema.sql#L344-L378)

4. **Operacje na rezerwacjach:**

   - Tworzenie rezerwacji z walidacją
   - Anulowanie rezerwacji

   Zobacz implementację w [mutations.ts](https://github.com/majkeloess/przyjemnosc/blob/main/lib/mutations.ts#L45-L190)

## Dokumentacja

### Wprowadzanie danych

#### Metody wprowadzania danych:

1. **Ręczne wprowadzanie**

   - Poprzez formularze w interfejsie użytkownika
   - Panel administracyjny dla zarządzania menu i stolikami
   - System rejestracji i logowania użytkowników

2. **Automatyczne generowanie**

   - Automatyczne generowanie kodów lojalnościowych
   - Aktualizacja statusów rezerwacji
   - Generowanie raportów i statystyk

3. **Skrypt seedujący**

   - Inicjalne wypełnienie bazy przykładowymi danymi
   - Generowanie testowych rezerwacji

   ```sql
   DO $$
   DECLARE
    curr_date timestamp;
    reservation_time timestamp;
    user_id uuid;
    selected_table_id integer;
    status_val restaurant.reservation_status;
    reservation_id integer;
    day integer;
    hour integer;
    minute integer;
    date_str text;
   BEGIN
    day := 1;
    WHILE day <= 31 LOOP
        date_str := '2025-01-' || LPAD(day::text, 2, '0');
        curr_date := date_str::timestamp;

        hour := 12;
        WHILE hour <= 21 LOOP
            minute := 0;
            WHILE minute <= 30 LOOP
                IF random() < 0.7 THEN
                    SELECT id INTO user_id
                    FROM restaurant.users
                    WHERE type = 'customer'::restaurant.user_type
                    ORDER BY random()
                    LIMIT 1;

                    selected_table_id := floor(random() * 27 + 1);

                    IF curr_date + (hour || ':' || minute)::interval < NOW() THEN
                        IF random() < 0.1 THEN
                            status_val := 'cancelled'::restaurant.reservation_status;
                        ELSE
                            status_val := 'done'::restaurant.reservation_status;
                        END IF;
                    ELSE
                        status_val := 'pending'::restaurant.reservation_status;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1
                        FROM restaurant.reservations r
                        JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
                        WHERE rt.table_id = selected_table_id
                        AND r.status = 'pending'::restaurant.reservation_status
                        AND r.start_time <= (curr_date + (hour || ':' || minute)::interval + interval '2 hours')
                        AND r.end_time >= (curr_date + (hour || ':' || minute)::interval)
                    ) THEN
                        INSERT INTO restaurant.reservations
                            (user_id, start_time, end_time, status, source)
                        VALUES
                            (
                                user_id,
                                curr_date + (hour || ':' || minute)::interval,
                                curr_date + (hour || ':' || minute)::interval + interval '2 hours',
                                status_val,
                                'page'::reservation_source
                            )
                        RETURNING id INTO reservation_id;

                        INSERT INTO restaurant.reservationtables (reservation_id, table_id)
                        VALUES (reservation_id, selected_table_id);
                    END IF;
                END IF;

                minute := minute + 30;
            END LOOP;
            hour := hour + 1;
        END LOOP;
        day := day + 1;
    END LOOP;
   END $$;
   ```

### Dokumentacja użytkownika

#### Dla klientów:

1. **Rejestracja i logowanie**

   - Wypełnij formularz rejestracji podając username, email i hasło
   - Zaloguj się używając utworzonego konta

2. **Dokonywanie rezerwacji**

   - Wybierz datę i godzinę
   - Określ liczbę osób
   - Potwierdź rezerwację
   - Sprawdź status w panelu użytkownika

3. **Zarządzanie rezerwacjami**
   - Przeglądaj aktywne rezerwacje
   - Anuluj rezerwacje w razie potrzeby
   - Wykorzystuj otrzymane kody lojalnościowe

#### Dla administratorów:

1. **Zarządzanie systemem**
   - Przeglądaj wszystkie rezerwacje
   - Zarządzaj stolikami i menu
   - Generuj i analizuj raporty

### Dokumentacja techniczna

#### Stack technologiczny:

```json:package.json
  "dependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.7",
    "bcrypt": "^5.1.1",
    "d3-time": "^3.1.0",
    "d3-time-format": "^4.1.0",
    "jose": "^5.9.6",
    "jsonwebtoken": "^9.0.2",
    "lodash": "^4.17.21",
    "next": "15.0.3",
    "pg": "^8.13.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.15.0",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/pg": "^8.11.10",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
```

#### Główne komponenty systemu:

1. **Frontend**

   - Next.js 15.0.3
   - React 18.2.0
   - TailwindCSS
   - TypeScript

2. **Backend**

   - PostgreSQL
   - Node.js
   - RESTful API

3. **Bezpieczeństwo**
   - JWT do autoryzacji
   - Bcrypt do hashowania haseł
   - Walidacja danych przez Zod

### Wykaz literatury

1. Dokumentacja Next.js - https://nextjs.org/docs
2. Dokumentacja PostgreSQL - https://www.postgresql.org/docs/
3. Dokumentacja React - https://react.dev/
4. Dokumentacja TailwindCSS - https://tailwindcss.com/docs

### Instalacja lokalna

1. **Wymagania wstępne**

   - Node.js (v18+)
   - npm (v10+)
   - PostgreSQL (v15+)
   - Git

2. **Kroki instalacji**

#### Klonowanie repozytorium i instalacja

```bash

git clone https://github.com/majkeloess/przyjemnosc
cd przyjemnosc
npm install
```

#### Konfiguracja zmiennych środowiskowych

Utwórz plik .env i dodaj:

```.env
DATABASE_URL="postgresql://username:password@localhost:5432/przyjemnosc"
JWT_SECRET="twoj-sekretny-klucz"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

#### Utworzenie schematu bazy danych

```bash

psql -U postgres -d przyjemnosc -f schema.sql
```

#### Uruchomienie aplikacji w trybie developerskim

```bash
npm run dev
```

3. **Struktura bazy danych**

   - Utwórz bazę danych 'przyjemnosc'
   - Wykonaj skrypt schema.sql
   - Schemat 'restaurant' zostanie utworzony automatycznie
   - Wszystkie tabele i funkcje zostaną utworzone w schemacie 'restaurant'

4. **Pierwsze uruchomienie**

   Aplikacja będzie dostępna pod adresem http://localhost:3000

## Usprawnienia aplikacji

- Dodanie do panelu administratora widoku jakie stoliki są dostępne w tym momencie
- Zbudowanie systemu mailowego do rejestracji jak i do nadchodzących rezerwacji
- Posiadanie pełnej funkcjonalności restauracji nie tylko rezerwacji a równiez obsługa zamówień i płatności
