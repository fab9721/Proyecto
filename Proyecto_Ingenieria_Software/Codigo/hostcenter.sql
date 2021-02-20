-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.2.3-MariaDB-log - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para hostcenter
CREATE DATABASE IF NOT EXISTS `hostcenter` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `hostcenter`;

-- Volcando estructura para tabla hostcenter.bodega
CREATE TABLE IF NOT EXISTS `bodega` (
  `bodega_id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(5) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`bodega_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.bodega: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
INSERT INTO `bodega` (`bodega_id`, `codigo`, `descripcion`, `estado`) VALUES
	(1, '01', 'MATRIZ', 'A'),
	(2, '02', 'QUITO', 'A'),
	(3, '03', 'CUENCA', 'A'),
	(4, '04', 'AMBATOOO', 'I');
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `categoria_id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(5) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.categoria: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`categoria_id`, `codigo`, `descripcion`, `estado`) VALUES
	(1, '01', 'Farmacos', 'A'),
	(2, '02', 'Bebe', 'A'),
	(3, '03', 'Belleza', 'A'),
	(4, '05', 'EQUIPOS DE COMPUTO', 'I');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `factura_id` int(11) NOT NULL AUTO_INCREMENT,
  `persona_id` int(11) DEFAULT NULL,
  `vendedor_id` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `cantidad_total` int(11) DEFAULT NULL,
  `valor_total` decimal(18,6) DEFAULT NULL,
  `total_iva` decimal(18,6) DEFAULT NULL,
  `total_descuento` decimal(18,6) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`factura_id`),
  KEY `persona_id` (`persona_id`),
  KEY `vendedor_id` (`vendedor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.factura: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.factura_detalle
CREATE TABLE IF NOT EXISTS `factura_detalle` (
  `factura_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `factura_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `valor_unitario` decimal(18,6) NOT NULL,
  `subtotal` decimal(18,6) NOT NULL,
  `valor_iva` decimal(18,6) DEFAULT NULL,
  `valor_descuento` decimal(18,6) DEFAULT NULL,
  `valor_total` decimal(18,6) DEFAULT NULL,
  PRIMARY KEY (`factura_detalle_id`),
  KEY `factura_id` (`factura_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.factura_detalle: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `factura_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura_detalle` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.movimiento_inventario
CREATE TABLE IF NOT EXISTS `movimiento_inventario` (
  `movimiento_inventario_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` char(1) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`movimiento_inventario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.movimiento_inventario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `movimiento_inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimiento_inventario` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.movimiento_inventario_detalle
CREATE TABLE IF NOT EXISTS `movimiento_inventario_detalle` (
  `movimiento_inventario_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `movimiento_inventario_id` int(11) NOT NULL,
  `bodega_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(18,6) DEFAULT NULL,
  `total` decimal(18,6) DEFAULT NULL,
  PRIMARY KEY (`movimiento_inventario_detalle_id`),
  KEY `movimiento_inventario_id` (`movimiento_inventario_id`),
  KEY `bodega_id` (`bodega_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.movimiento_inventario_detalle: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `movimiento_inventario_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimiento_inventario_detalle` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.persona
CREATE TABLE IF NOT EXISTS `persona` (
  `persona_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_identificacion` varchar(2) NOT NULL,
  `identificacion` varchar(15) NOT NULL,
  `nombres` varchar(150) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `direccion` varchar(25) DEFAULT NULL,
  `telefono` varchar(25) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `esCliente` int(11) DEFAULT NULL,
  `esProveedor` int(11) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`persona_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.persona: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` (`persona_id`, `tipo_identificacion`, `identificacion`, `nombres`, `apellidos`, `direccion`, `telefono`, `email`, `fecha_nacimiento`, `esCliente`, `esProveedor`, `estado`) VALUES
	(1, 'R', '0930764006001', 'JORDAN VICENTE', 'ORDONEZ CABRERA', 'VACAS GALINDO', '0961592073', 'jordanvicente_21@hotmail.com', '1995-05-24', 1, 0, 'A'),
	(2, 'C', '0919381665', 'JOSELINE VANESSAAA', 'FLORES SOLIS', 'VACAS GALINDO', '0990013421', 'vanessa.flores1605@gmail.com', '1995-05-18', 1, 0, 'A'),
	(3, 'C', '0930764006', 'JORDAN', 'ORDOÑEZ', 'PRUEBA', '100000000', 'jordiicabrera@gmail.com', '1994-05-21', 1, 0, 'I');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `producto_id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_id` int(11) DEFAULT NULL,
  `codigo` varchar(5) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `graba_iva` int(1) DEFAULT NULL,
  `precio_unitario` decimal(18,6) DEFAULT NULL,
  `porcentaje_descuento` int(3) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `categoria_id` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.producto: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` (`producto_id`, `categoria_id`, `codigo`, `descripcion`, `stock`, `graba_iva`, `precio_unitario`, `porcentaje_descuento`, `estado`) VALUES
	(1, 1, '01', 'IBUPROFENO 500MG', 15, 1, 10.000000, 0, 'A'),
	(2, 2, '02', 'PANALES XXG', 25, 1, 25.000000, 0, 'I'),
	(3, 1, '03', 'TARRO DE LECHE GRANDE', 25, 1, 65.000000, 0, 'A'),
	(4, 1, 'TICO', 'TECLADO ALAMBRICO', 30, 0, 14.000000, 0, 'A'),
	(5, 1, 'TINCO', 'TECLADO INALAMBRICO', 30, 0, 35.000000, 0, 'A'),
	(6, 1, 'MICO', 'MOUSE INALAMBRICO', 18, 1, 15.000000, 0, 'A'),
	(7, 3, 'LAHP', 'LAPTOP HP INTEL CORE i5 8GB RAM', 10, 1, 500.000000, 0, 'I'),
	(8, 2, 'DESHP', 'DESKTOP HP I5 8GB RAM 512SSD', 75, 1, 430.000000, 0, 'I'),
	(9, 2, '03', 'TARRO DE LECHE GRANDE BBB', 55, 1, 50.000000, 0, 'I'),
	(10, 2, '45454', 'asdassadsad', 20, 1, 10.000000, 0, 'I'),
	(11, 1, '12345', 'PRUEBA DE ACTUALIZACION', 60, 1, 15.000000, 3, 'A'),
	(12, 2, '22222', 'PRUEBA DE PRODUCTO', 36, 1, 15.000000, 5, 'I'),
	(13, 2, '3333', 'XIAOMI REDMI NOTE 8 PRO', 20, 1, 260.000000, 0, 'A');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.stock_producto
CREATE TABLE IF NOT EXISTS `stock_producto` (
  `stock_producto_id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `bodega_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`stock_producto_id`),
  KEY `producto_id` (`producto_id`),
  KEY `bodega_id` (`bodega_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.stock_producto: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `stock_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_producto` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.tipo_usuario
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `tipo_usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(5) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`tipo_usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.tipo_usuario: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` (`tipo_usuario_id`, `codigo`, `descripcion`) VALUES
	(1, '01', 'SUPER'),
	(2, '02', 'ADMINISTRADOR'),
	(3, '03', 'VENDEDOR');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;

-- Volcando estructura para tabla hostcenter.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_usuario_id` int(11) DEFAULT NULL,
  `codigo` varchar(10) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `nombres` varchar(250) DEFAULT NULL,
  `clave` varchar(250) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`) USING BTREE,
  KEY `tipo_usuario_id` (`tipo_usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla hostcenter.usuarios: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`usuario_id`, `tipo_usuario_id`, `codigo`, `usuario`, `nombres`, `clave`, `estado`) VALUES
	(1, 1, '0001', 'jordonez', 'JORDAN ORDONEZ', '$2y$12$0YSHO0YTuzguIjTXARH6D.eU4jj8IsBXhOd7wd3cRlrYlST8DMKCW ', 'A'),
	(3, 1, '0002', 'admin', 'ADMINISTRADOR', '$2b$10$uFZA6NI/EYmULvh3ZzPkUuEssvGi3cFgjk.IRSAoVlLlXw6BpRAdu', 'A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para vista hostcenter.vlistarpersonas
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `vlistarpersonas` (
	`persona_id` INT(11) NOT NULL,
	`tipo` VARCHAR(6) NOT NULL COLLATE 'utf8mb4_general_ci',
	`identificacion` VARCHAR(15) NOT NULL COLLATE 'latin1_swedish_ci',
	`nombres` VARCHAR(301) NOT NULL COLLATE 'latin1_swedish_ci',
	`direccion` VARCHAR(25) NULL COLLATE 'latin1_swedish_ci',
	`telefono` VARCHAR(25) NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(250) NULL COLLATE 'latin1_swedish_ci',
	`fecha` VARCHAR(10) NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista hostcenter.vlistarproductos
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `vlistarproductos` (
	`producto_id` INT(11) NOT NULL,
	`categoria_id` INT(11) NOT NULL,
	`categoria` VARCHAR(250) NULL COLLATE 'latin1_swedish_ci',
	`codigo` VARCHAR(5) NULL COLLATE 'latin1_swedish_ci',
	`descripcion` VARCHAR(250) NULL COLLATE 'latin1_swedish_ci',
	`stock` INT(11) NULL,
	`graba_iva` INT(1) NULL,
	`precio_unitario` DECIMAL(18,6) NULL,
	`porcentaje_descuento` INT(3) NULL
) ENGINE=MyISAM;

-- Volcando estructura para vista hostcenter.vlistarusuarios
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `vlistarusuarios` (
	`usuario_id` INT(11) NOT NULL,
	`tipo_usuario` VARCHAR(150) NULL COLLATE 'latin1_swedish_ci',
	`codigo` VARCHAR(10) NULL COLLATE 'latin1_swedish_ci',
	`usuario` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci',
	`nombres` VARCHAR(250) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista hostcenter.vlistarpersonas
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `vlistarpersonas`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vlistarpersonas` AS SELECT
	persona_id,
	(CASE WHEN tipo_identificacion='C' THEN 'Cedula' ELSE 'Ruc' END) AS tipo,
	identificacion,
	CONCAT(apellidos,' ',nombres) AS nombres,
	direccion,
	telefono,
	email,
	DATE_FORMAT(fecha_nacimiento,'%d/%m/%Y') AS fecha
FROM
persona
WHERE estado = 'A' ;

-- Volcando estructura para vista hostcenter.vlistarproductos
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `vlistarproductos`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vlistarproductos` AS SELECT
	p.producto_id,
	c.categoria_id,
	c.descripcion AS categoria,
	p.codigo,
	p.descripcion,
	p.stock,
	p.graba_iva,
	p.precio_unitario,
	p.porcentaje_descuento
FROM producto p
INNER JOIN categoria c ON p.categoria_id = c.categoria_id
WHERE p.estado="A" ;

-- Volcando estructura para vista hostcenter.vlistarusuarios
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `vlistarusuarios`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vlistarusuarios` AS SELECT
	u.usuario_id,
	tu.descripcion AS tipo_usuario,
	u.codigo,
	u.usuario,
	u.nombres
FROM usuarios u
INNER JOIN tipo_usuario tu ON u.tipo_usuario_id = tu.tipo_usuario_id
WHERE u.estado = 'A' ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
