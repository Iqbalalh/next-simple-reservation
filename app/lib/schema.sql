CREATE TABLE tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_name VARCHAR(255) NOT NULL,
  capacity INT NOT NULL,
  status BOOLEAN DEFAULT FALSE
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reservationDate DATETIME NOT NULL,
  customerId INT,
  tableId INT,
  FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);
