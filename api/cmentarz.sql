CREATE TABLE Graves (
    id INT AUTO_INCREMENT PRIMARY KEY,        
    photo_path VARCHAR(255) NOT NULL,         
    location POINT NOT NULL                 
);

CREATE TABLE Persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    death_date DATE NOT NULL,
    grave_id INT,
    FOREIGN KEY (grave_id) REFERENCES Graves(id)
);