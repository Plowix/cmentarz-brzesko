-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 20, 2024 at 05:30 PM
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
  `photo_path` varchar(255) NOT NULL,
  `location` point NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `graves`
--

INSERT INTO `graves` (`id`, `photo_path`, `location`) VALUES
('1/001', '/images/graves/grave_1001.jpg', 0x000000000101000000b98d06f016fc48405ad427b9c39a3440),
('1/002', '/images/graves/grave_1001.jpg', 0x00000000010100000047e6913f18fc484093196f2bbd9a3440),
('1/003', '/images/graves/grave_1001.jpg', 0x0000000001010000001cebe2361afc48405ad427b9c39a3440),
('1/004', '/images/graves/grave_1001.jpg', 0x000000000101000000ce1951da1bfc484013286211c39a3440),
('1/005', '/images/graves/grave_1001.jpg', 0x0000000001010000008048bf7d1dfc4840cc7b9c69c29a3440);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `birth_year` year(4) DEFAULT NULL,
  `birth_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `birth_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `death_year` year(4) DEFAULT NULL,
  `death_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `death_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `grave_id` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persons`
--

INSERT INTO `persons` (`id`, `full_name`, `birth_year`, `birth_month`, `birth_day`, `death_year`, `death_month`, `death_day`, `grave_id`) VALUES
(1, 'Jan Kowalski', '1950', NULL, NULL, '2020', 10, 15, '1/001'),
(2, 'Anna Nowak', '1965', 5, 22, '2015', NULL, NULL, '1/002'),
(3, 'Jan Kowalski', '1950', 5, 20, '2020', 3, 15, '1/003'),
(4, 'Maria Nowak', '1965', 7, 10, '2021', 11, 22, '1/004'),
(5, 'Piotr Zielinski', '1975', 1, 5, '2022', 6, 30, '1/005'),
(8, 'Katarzyna Malinowska', '1990', 6, 15, '2022', 2, 20, '1/003');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
