-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2023 a las 18:00:01
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_eventicket`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Deportes'),
(2, 'Recitales'),
(3, 'Obras de teatro'),
(4, 'Stand Up'),
(5, 'Conferencias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
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
  `user_creator_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `date`, `location`, `addres`, `category_id`, `image`, `deleted`, `sold_out`, `user_creator_id`) VALUES
(1, 'Amelie Lens', '2023-07-12 22:00:00', 'Maderoboardwalk', 'Cecilia Grierson 1500', 2, '../img/events/recitales/amelie-lens-farrago-maderoboardwalk-160560-img.jpg', 0, 0, 1),
(2, 'Trinche', '2023-07-16 20:24:00', 'El Picadero', 'Santos Discépolo 1857', 4, '../img/events/standup/martin-dardik---el-trinche-en-el-picadero.jpg', 0, 0, 1),
(5, '1915', '2023-07-21 18:14:00', 'Luna Park', 'Av. Eduardo Madero 470', 2, '../img/events/recitales/img_1689444914740.jpg', 0, 0, 2),
(6, 'Babasónicos', '2023-10-21 01:00:00', 'Complejo Art Media', 'Discépolo 1857', 2, '../img/events/recitales/img_1689444956335.jpeg', 0, 0, 2),
(7, 'Usted Señalemelo', '2023-10-10 13:00:00', 'CABA', 'Av. Eduardo Madero 470', 2, '../img/events/recitales/img_1686577822557.jpeg', 0, 0, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230730124121-agregar-columna.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_type`
--

CREATE TABLE `ticket_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` float NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ticket_type`
--

INSERT INTO `ticket_type` (`id`, `name`, `amount`, `price`, `product_id`) VALUES
(1, 'Campo VIP', 10, 3000, 1),
(2, 'Platea', 20, 5500, 1),
(3, 'Campo', 30, 1000, 1),
(4, 'Platea', 20, 3100, 2),
(5, 'Platea', 20, 3100, 2),
(8, 'General', 100, 2500, 5),
(9, 'Platea', 30, 5000, 6),
(10, 'general', 10, 10, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
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
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `user_type_id`, `password`, `check_password`, `notifications`, `terms_condition`) VALUES
(1, 'primer', 'usuario', 'primer@usuario.com', 2, 'user123', 'user123', 1, 1),
(2, 'Gaston', 'Balatti', 'gaston@balatti.com', 2, '$2a$12$k6lrPCjughXVued4qnKWwuz89wjWMpOjv/8fQSq8LVO8WdWub136e', '$2a$12$6ZJtUzLI8XmMCBLdJV1EpuHvp5c9VBF4cECUShIUTIryRE.OZnXEa', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_product_cart`
--

CREATE TABLE `user_product_cart` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_type`
--

INSERT INTO `user_type` (`id`, `name`) VALUES
(1, 'Espectador/a'),
(2, 'Productor/a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `ticket_type`
--
ALTER TABLE `ticket_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `user_product_cart`
--
ALTER TABLE `user_product_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ticket_type`
--
ALTER TABLE `ticket_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_product_cart`
--
ALTER TABLE `user_product_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
