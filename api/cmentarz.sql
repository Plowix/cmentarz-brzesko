CREATE TABLE Graves (
    id VARCHAR(5) NOT NULL PRIMARY KEY, 
    -- klucz główny w formacie x/yyy
    -- x to numer sektora, y to numer grobu
    photo_path VARCHAR(255) NOT NULL,         
    location POINT NOT NULL
);

CREATE TABLE Persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,

    birth_year YEAR,
    birth_month TINYINT UNSIGNED,
    birth_day TINYINT UNSIGNED,

    death_year YEAR,
    death_month TINYINT UNSIGNED,
    death_day TINYINT UNSIGNED,

    grave_id VARCHAR(5),
    FOREIGN KEY (grave_id) REFERENCES Graves(id)
);