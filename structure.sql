-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 10, 2023 at 10:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prueba_eventicket`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Deportes'),
(2, 'Recitales'),
(3, 'Obras de teatro'),
(4, 'Stand Up'),
(5, 'Conferencias');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `addres` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `deleted` int(11) NOT NULL,
  `sold_out` int(11) NOT NULL,
  `user_creator_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `date`, `location`, `addres`, `category_id`, `image`, `deleted`, `sold_out`, `user_creator_id`, `description`) VALUES
(1, 'Amelie Lens', '2023-07-12 22:00:00', 'Maderoboardwalk', 'Cecilia Grierson 1500', 2, '../img/events/recitales/amelie-lens-farrago-maderoboardwalk-160560-img.jpg', 0, 0, 1, 'Amelie Lens (Flandes, 31 de mayo de 1990) es una DJ de música electrónica belga, productora discográfica y propietaria del sello Lenske'),
(2, 'Trinche', '2023-07-16 20:24:00', 'El Picadero', 'Santos Discépolo 1857', 4, '../img/events/standup/martin-dardik---el-trinche-en-el-picadero.jpg', 0, 0, 1, 'El comediante Martín Dardik es parte del programa de streaming Antes que Nadie, que se transmite por Luzu TV y del cual también participan Diego Leuco, Mica Vázquez y Yoyi Francella'),
(5, '1915', '2023-07-21 18:14:00', 'Luna Park', 'Av. Eduardo Madero 470', 2, '../img/events/recitales/img_1689444914740.jpg', 0, 0, 2, '1915 es una banda de rock argentina conformada por Cruz Hunkeler (guitarra y voz), “Penzo” (teclados y synths), Jeremías Alegre (batería) y Alejo Freixas (bajo).'),
(6, 'Babasónicos', '2023-10-21 01:00:00', 'Complejo Art Media', 'Discépolo 1857', 2, '../img/events/recitales/img_1689444956335.jpeg', 0, 0, 2, 'Babasónicos es una banda argentina de rock alternativo, formada en el año 1991. Al principio fueron parte del «nuevo rock argentino», movimiento compuesto por bandas como Juana La Loca, El Otro Yo, Peligrosos Gorriones y Los Brujos.'),
(7, 'Usted Señalemelo', '2023-10-10 13:00:00', 'CABA', 'Av. Eduardo Madero 470', 2, '../img/events/recitales/img_1686577822557.jpeg', 0, 0, 6, 'Usted Señalemelo es una banda argentina de indie rock, formada en Mendoza (Argentina). El grupo está compuesto por el vocalista y tecladista Juan Saieg, el guitarrista Gabriel \"Cocó\" Orozco y el baterista Lucca Beguerie Petrich.'),
(8, 'Tan Biónica', '2023-10-10 23:00:00', 'River Plate', 'Av. Pres. Figueroa Alcorta 7597', 2, '../img/events/recitales/img_1692562167485.jpeg', 0, 0, 3, 'Tan Biónica es un grupo musical argentino surgido en Buenos Aires en el año 2002 (empezando a gestarse a finales de los años noventa) formado por Chano (voz y frontman), Seby (guitarra), Bambi (bajo) y Diega (batería).'),
(9, 'Taylor Swift', '2023-11-11 01:00:00', 'River Plate', 'Av. Pres. Figueroa Alcorta 7597', 2, '../img/events/recitales/img_1692562209360.png', 0, 0, 3, 'Taylor Alison Swift (West Reading, Pensilvania; 13 de diciembre de 1989) es una cantautora, productora, directora, actriz y empresaria estadounidense. '),
(10, 'Red Hot Chilli Peppers', '2023-11-11 00:00:00', 'River Plate', 'Av. Pres. Figueroa Alcorta 7597', 2, '../img/events/recitales/img_1692562255742.png', 0, 0, 3, 'Red Hot Chili Peppers es una banda de rock estadounidense formada en 1983 en Los Ángeles, California. Sus integrantes son el vocalista Anthony Kiedis, el guitarrista John Frusciante, el bajista Flea y el baterista Chad Smith.'),
(11, 'Sebastián Wainraich', '2023-10-11 01:00:00', 'Teatro x', 'Av. Eduardo Madero 470', 3, '../img/events/obrasTeatro/img_1693569810238.jpeg', 0, 0, 2, 'Reconocido como uno de los comediantes más talentosos de Buenos Aires, en \"Frágil\" Wainraich plantea un recorrido por su vida a través de los personajes que lo atraviesan  la vez, que combina humor, música, personajes y una gran puesta audiovisual.'),
(12, 'Argentina - Bolivia', '2023-09-08 00:30:00', 'Monumental', 'Av. Pres. Figueroa Alcorta 7597', 1, '../img/events/deportes/img_1694055481920.jpeg', 0, 0, 4, 'El elenco dirigido por Lionel Scaloni continúa su participación en las Eliminatorias Sudamericanas rumbo al Mundial 2026 frente al Verde, el martes 12 de septiembre en el Estadio Hernando Siles.'),
(13, 'Prueba', '2023-09-10 13:10:00', 'Prueba', 'Prueba', 2, '../img/events/recitales/img_1694283250228.png', 0, 0, 2, 'Prueba'),
(14, 'Red Hot Chilli Peppe', '2023-09-17 20:11:00', 'River Plate', 'Figueroa Alcorta', 2, '../img/events/recitales/img_1694376709572.png', 0, 0, 6, 'Red Hot Chili Peppers es una banda de rock estadounidense formada en 1983 en Los Ángeles, California. Sus integrantes son el vocalista Anthony Kiedis, el guitarrista John Frusciante, el bajista Flea y el baterista Chad Smith');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20230730124121-agregar-columna.js'),
('20230802235959-agregar-columna-tipo-entrada.js'),
('20230803013715-bought.js'),
('20230831165005-add-description-column.js');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_type`
--

CREATE TABLE `ticket_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` float NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_type`
--

INSERT INTO `ticket_type` (`id`, `name`, `amount`, `price`, `product_id`) VALUES
(1, 'Campo VIP', 0, 3000, 1),
(2, 'Platea', 19, 5500, 1),
(3, 'Campo', 29, 1000, 1),
(4, 'Platea', 20, 3100, 2),
(5, 'Platea', 20, 3100, 2),
(8, 'General', 100, 2500, 5),
(9, 'Platea', 30, 5000, 6),
(10, 'general', 10, 10, 7),
(11, 'General', 10, 15000, 8),
(12, 'Platea', 20, 20000, 9),
(13, 'Campo', 10, 12000, 10),
(14, 'General', 10, 2500, 11),
(15, 'General', 9, 1000, 12),
(16, 'Prueba', 0, 1000, 13),
(17, 'Prueba VIP', 0, 1500, 13),
(18, 'Prueba VIP2', 0, 3000, 13),
(19, 'General', 10, 1000, 14);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `check_password` varchar(255) NOT NULL,
  `notifications` int(11) NOT NULL,
  `terms_condition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `user_type_id`, `password`, `check_password`, `notifications`, `terms_condition`) VALUES
(1, 'primer', 'usuario', 'primer@usuario.com', 2, 'user123', 'user123', 1, 1),
(2, 'Gaston', 'Balatti', 'gaston@balatti.com', 2, '$2a$12$7eFl.rNrE73IhMAZJovPJOzY87H7DBIwHMAKFIQza6bEHoutax/q.', '$2a$12$6ZJtUzLI8XmMCBLdJV1EpuHvp5c9VBF4cECUShIUTIryRE.OZnXEa', 1, 1),
(3, 'John', 'Doe', 'john@doe.com', 2, '$2a$12$JyCo.xVZPxrvjbhT.UWi1O8vigkoFn0cxWwrceeD2.i9tb3c9JcxW', '$2a$12$woYMkWgkruzCrxxyOxnmruqCtJxnh3x/khuhyjOQtr/cORCnkC43S', 1, 1),
(4, 'Usuario', 'Prueba', 'usuario@prueba.com', 2, '$2a$12$mFXSWMDHvqo8UdbvDGcs4eA2tq0VJMMY.j3U7IQQbvPxMUdIllN4a', '$2a$12$4lsWWTIS7akN9Tq6d2bfKuSpzb53/L2RrXXditwHbi24y/dQ1qTPG', 0, 1),
(5, 'Espectador', 'Productor', 'espectador@productor.com', 2, '$2a$12$E/yXnGcPF45hKX13t9wHAuUQTMCf2gvSvSjjYXvMcyi6QRN.UGc5m', '$2a$12$TlPD6oLqnOwFoUh2upYSyuQa0XOrVZ.oZPMSB00q7tJWtvVdIkzaC', 1, 1),
(6, 'Cosme', 'Fulanito', 'cosme@fulanito.com', 2, '$2a$12$nf8nh24c1c44Yuewz.ACbOzx4L0KoONtXydNzvYgDAMJ2SGf/cojS', '$2a$12$tuZCUmFqSdBSVNu7d.nuFebxV90GnIwz4gWyFQIdGFB5YdQqTLUCS', 1, 1),
(7, 'Gaston', 'Balatti', 'gaston@gaston.com', 1, '$2a$12$PyvwHHFoRcuJqPMsCVrDGu8I5zPoPPz.izl1XwHARDJLBEwPQ3g1.', '$2a$12$Rzaahge0haoUrTssTzP4V.4EQd6b044umPltkyElAz8xaAWhyld1G', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_product_cart`
--

CREATE TABLE `user_product_cart` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `ticket_type_id` int(11) DEFAULT NULL,
  `bought` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_product_cart`
--

INSERT INTO `user_product_cart` (`id`, `user_id`, `product_id`, `quantity`, `ticket_type_id`, `bought`) VALUES
(161, '4', '12', 3, 1, 1),
(162, '4', '1', 1, 1, 1),
(163, '4', '1', 1, 1, 1),
(164, '4', '1', 1, 1, 1),
(165, '4', '1', 1, 1, 1),
(166, '4', '1', 1, 1, 1),
(167, '4', '1', 1, 1, 1),
(168, '4', '1', 1, 1, 1),
(169, '4', '1', 1, 1, 1),
(170, '4', '1', 1, 1, 1),
(171, '4', '1', 1, 1, 1),
(172, '4', '1', 1, 1, 1),
(173, '4', '1', 1, 1, 1),
(174, '4', '1', 2, 3, 1),
(175, '4', '1', 1, 1, 1),
(176, '4', '1', 6, 2, 1),
(177, '4', '1', 1, 1, 1),
(178, '4', '1', 9, 1, 1),
(180, '4', '1', 1, 2, 1),
(181, '2', '11', 1, 1, 1),
(182, '2', '1', 1, 3, 1),
(183, '2', '12', 2, 1, 1),
(184, '2', '11', 1, 1, 1),
(185, '2', '1', 1, 1, 1),
(188, '2', '13', 5, 16, 1),
(189, '2', '13', 5, 16, 1),
(190, '2', '13', 1, 16, 1),
(191, '2', '13', 2, 17, 1),
(192, '2', '13', 3, 18, 1),
(193, '2', '13', 1, 16, 1),
(194, '2', '13', 1, 17, 1),
(195, '2', '13', 1, 18, 1),
(196, '2', '13', 8, 16, 1),
(197, '2', '13', 7, 17, 1),
(198, '2', '13', 3, 18, 1),
(199, '2', '13', 8, 16, 1),
(200, '2', '13', 8, 17, 1),
(201, '2', '13', 8, 18, 1),
(202, '2', '13', 7, 18, 1),
(203, '2', '13', 8, 16, 1),
(204, '2', '13', 8, 17, 1),
(205, '2', '13', 1, 18, 1),
(206, '2', '13', 2, 16, 1),
(207, '2', '13', 3, 17, 1),
(208, '2', '13', 1, 18, 1),
(209, '2', '13', 2, 16, 1),
(210, '2', '13', 2, 17, 1),
(211, '2', '13', 1, 18, 1),
(212, '2', '13', 1, 16, 1),
(213, '2', '13', 1, 17, 1),
(214, '2', '13', 1, 18, 1),
(215, '2', '13', 2, 16, 1),
(216, '2', '13', 3, 17, 1),
(217, '2', '13', 1, 18, 1),
(218, '2', '13', 1, 16, 1),
(219, '2', '13', 1, 17, 1),
(220, '2', '13', 1, 18, 1),
(221, '2', '13', 1, 16, 1),
(222, '2', '13', 1, 17, 1),
(223, '2', '13', 1, 18, 1),
(224, '2', '12', 1, 15, 1),
(225, '2', '13', 1, 16, 1),
(226, '2', '13', 1, 17, 1),
(227, '2', '13', 1, 18, 1),
(228, '2', '13', 1, 18, 1),
(229, '6', '14', 1, 19, 0),
(230, '6', '2', 1, 0, 0),
(231, '6', '12', 2, 15, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `name`) VALUES
(1, 'Espectador/a'),
(2, 'Productor/a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ticket_type`
--
ALTER TABLE `ticket_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_product_cart`
--
ALTER TABLE `user_product_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `ticket_type`
--
ALTER TABLE `ticket_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_product_cart`
--
ALTER TABLE `user_product_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
