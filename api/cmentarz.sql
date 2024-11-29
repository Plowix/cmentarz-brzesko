-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 29, 2024 at 08:39 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cmentarz`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `graves`
--

CREATE TABLE `graves` (
  `id` varchar(5) NOT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `location` point NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `graves`
--

INSERT INTO `graves` (`id`, `photo_path`, `location`) VALUES
('1/001', NULL, 0xe61000000101000000402e774811fc4840c40f6245ac9a3440),
('1/002', NULL, 0xe61000000101000000ce9a43db14fc4840d05fc04fcf9a3440),
('1/003', NULL, 0xe61000000101000000a36f5d160ffc484013227369c69a3440),
('1/004', NULL, 0xe61000000101000000c23b57f91efc484007e5c9fbc19a3440);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `birth_year` int(11) NOT NULL DEFAULT 0,
  `birth_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `birth_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `death_year` int(11) NOT NULL DEFAULT 0,
  `death_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `death_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `grave_id` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persons`
--

INSERT INTO `persons` (`id`, `full_name`, `birth_year`, `birth_month`, `birth_day`, `death_year`, `death_month`, `death_day`, `grave_id`) VALUES
(4, 'Anna Stach', 2024, 11, 6, 2024, 6, 3, '1/001'),
(5, 'Zofia Lis', 2024, 10, 14, 2024, 11, 1, '1/002'),
(6, 'Jan Kos', 2024, 11, 12, 2024, 11, 1, '1/003'),
(7, 'Marta Kach', 2024, 9, 10, 2024, 11, 1, '1/004');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'testuser', '$2b$12$daoNUqXNadI72olWYxmd7.SsYLU4Ya82CVZDau55OnvcUClwcgKwe', 'admin', '2024-11-25 11:08:16'),
(2, 'uzytkownik_nr_2', '$2y$10$wwYKrtfdloSBLmhjmVs4jObiKCZDScjBQXlKc3rT.TL2v5iVuPol6', 'user', '2024-11-25 11:36:12'),
(3, 'greg', '$2y$10$dtdx8Wq8P6cveu.3ErzO/.vXpdPEf8qm/vLdM1wIUXZA0319bzBPC', 'user', '2024-11-28 14:07:54');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `graves`
--
ALTER TABLE `graves`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grave_id` (`grave_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `persons_ibfk_1` FOREIGN KEY (`grave_id`) REFERENCES `graves` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
