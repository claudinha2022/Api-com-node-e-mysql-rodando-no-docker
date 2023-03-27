-- Exclui o banco de dados nodejsqlbd01 se ele já existir
DROP DATABASE IF EXISTS nodejsqlbd01;

-- Cria o banco de dados nodejsqlbd01
CREATE DATABASE nodejsqlbd01;

-- Utiliza o banco de dados criado
USE nodejsqlbd01;

-- Cria a tabela tipo_cliente
CREATE TABLE `tipo_cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insere dados na tabela tipo_cliente
INSERT INTO tipo_cliente (descricao) VALUES
('preferencial'),
('comum'),
('vip'),
('executivo'),
('comercial');

-- Cria a tabela cliente
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cep` varchar(50) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `bairro` varchar(30) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `uf` varchar(30) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL, 
  `tipo_cliente_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_cliente_id` (`tipo_cliente_id`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`tipo_cliente_id`) REFERENCES `tipo_cliente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
