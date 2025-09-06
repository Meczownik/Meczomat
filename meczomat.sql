-- MySQL dump 10.13  Distrib 9.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: meczomat
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `league` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `season_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b31b66bda89a0ea2a77d3221b58` (`season_id`),
  CONSTRAINT `FK_b31b66bda89a0ea2a77d3221b58` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Grupa domy┼Ťlna','IV','Wroc┼éaw',1);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `league_groups`
--

DROP TABLE IF EXISTS `league_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `league_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `seasonId` int(11) DEFAULT NULL,
  `league` varchar(50) NOT NULL,
  `district` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Season_Restore` (`seasonId`),
  CONSTRAINT `FK_Season_Restore` FOREIGN KEY (`seasonId`) REFERENCES `seasons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league_groups`
--

LOCK TABLES `league_groups` WRITE;
/*!40000 ALTER TABLE `league_groups` DISABLE KEYS */;
INSERT INTO `league_groups` VALUES (1,'Grupa domyślna',1,'Ekstraklasa','Wrocław'),(2,'Gr. 1',1,'IV','Wrocław'),(3,'Gr. 1',1,'Klasa A','Jelenia Góra'),(4,'Gr. 2',1,'Klasa A','Jelenia Góra'),(5,'Gr. 3',1,'Klasa A','Jelenia Góra'),(6,'Gr. 1',1,'Klasa B','Jelenia Góra'),(7,'Gr. 2',1,'Klasa B','Jelenia Góra'),(8,'Gr. 4',1,'Klasa B','Jelenia Góra'),(9,'Gr. 3',1,'Klasa B','Jelenia Góra'),(10,'Gr. 5',1,'Klasa B','Jelenia Góra'),(11,'Gr. 1',1,'Okręgówka','Jelenia Góra'),(12,'Gr. 1',1,'Klasa A','Legnica'),(13,'Gr. 2',1,'Klasa A','Legnica'),(14,'Gr. 3',1,'Klasa A','Legnica'),(15,'Gr. 1',1,'Klasa B','Legnica'),(16,'Gr. 2',1,'Klasa B','Legnica'),(17,'Gr. 3',1,'Klasa B','Legnica'),(18,'Gr. 4',1,'Klasa B','Legnica'),(19,'Gr. 5',1,'Klasa B','Legnica'),(20,'Gr. 1',1,'Okręgówka','Legnica'),(21,'Gr. 1',1,'Klasa A','Wałbrzych'),(22,'Gr. 2',1,'Klasa A','Wałbrzych'),(23,'Gr. 3',1,'Klasa A','Wałbrzych'),(24,'Gr. 1',1,'Klasa B','Wałbrzych'),(25,'Gr. 2',1,'Klasa B','Wałbrzych'),(26,'Gr. 3',1,'Klasa B','Wałbrzych'),(27,'Gr. 4',1,'Klasa B','Wałbrzych'),(28,'Gr. 5',1,'Klasa B','Wałbrzych'),(29,'Gr. 1',1,'Okręgówka','Wałbrzych'),(30,'Gr. 1',1,'Klasa A','Wrocław'),(31,'Gr. 2',1,'Klasa A','Wrocław'),(32,'Gr. 3',1,'Klasa A','Wrocław'),(33,'Gr. 4',1,'Klasa A','Wrocław'),(34,'Gr. 1',1,'Klasa B','Wrocław'),(35,'Gr. 2',1,'Klasa B','Wrocław'),(36,'Gr. 3',1,'Klasa B','Wrocław'),(37,'Gr. 4',1,'Klasa B','Wrocław'),(38,'Gr. 5',1,'Klasa B','Wrocław'),(39,'Gr. 6',1,'Klasa B','Wrocław'),(40,'Gr. 7',1,'Klasa B','Wrocław'),(41,'Gr. 8',1,'Klasa B','Wrocław'),(42,'Gr. 9',1,'Klasa B','Wrocław'),(43,'Gr. 1',1,'Okręgówka','Wrocław');
/*!40000 ALTER TABLE `league_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_team_id` int(11) DEFAULT NULL,
  `away_team_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `homeGoals` int(11) DEFAULT NULL,
  `awayGoals` int(11) DEFAULT NULL,
  `matchDate` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bb25f11ea6fa78b344a68923769` (`home_team_id`),
  KEY `FK_e457f057d971e464c1ebf6378c5` (`away_team_id`),
  KEY `FK_24e8071e3486275a5a31912a87d` (`group_id`),
  CONSTRAINT `FK_24e8071e3486275a5a31912a87d` FOREIGN KEY (`group_id`) REFERENCES `league_groups` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_bb25f11ea6fa78b344a68923769` FOREIGN KEY (`home_team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e457f057d971e464c1ebf6378c5` FOREIGN KEY (`away_team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (2,117,118,10,NULL,NULL,'0000-00-00 00:00:00'),(3,117,119,10,NULL,NULL,'0000-00-00 00:00:00'),(4,117,120,10,NULL,NULL,'0000-00-00 00:00:00'),(5,117,121,10,NULL,NULL,'0000-00-00 00:00:00'),(6,117,122,10,NULL,NULL,'0000-00-00 00:00:00'),(7,117,123,10,NULL,NULL,'0000-00-00 00:00:00'),(8,117,124,10,NULL,NULL,'0000-00-00 00:00:00'),(9,117,125,10,NULL,NULL,'0000-00-00 00:00:00'),(10,117,126,10,NULL,NULL,'0000-00-00 00:00:00'),(11,117,127,10,NULL,NULL,'0000-00-00 00:00:00'),(12,117,128,10,NULL,NULL,'0000-00-00 00:00:00'),(13,117,129,10,NULL,NULL,'0000-00-00 00:00:00'),(14,118,119,10,NULL,NULL,'0000-00-00 00:00:00'),(15,118,120,10,NULL,NULL,'0000-00-00 00:00:00'),(16,118,121,10,NULL,NULL,'0000-00-00 00:00:00'),(17,118,122,10,NULL,NULL,'0000-00-00 00:00:00'),(18,118,123,10,NULL,NULL,'0000-00-00 00:00:00'),(19,118,124,10,NULL,NULL,'0000-00-00 00:00:00'),(20,118,125,10,NULL,NULL,'0000-00-00 00:00:00'),(21,118,126,10,NULL,NULL,'0000-00-00 00:00:00'),(22,118,127,10,NULL,NULL,'0000-00-00 00:00:00'),(23,118,128,10,NULL,NULL,'0000-00-00 00:00:00'),(24,118,129,10,NULL,NULL,'0000-00-00 00:00:00'),(25,119,120,10,NULL,NULL,'0000-00-00 00:00:00'),(26,119,121,10,NULL,NULL,'0000-00-00 00:00:00'),(27,119,122,10,NULL,NULL,'0000-00-00 00:00:00'),(28,119,123,10,NULL,NULL,'0000-00-00 00:00:00'),(29,119,124,10,NULL,NULL,'0000-00-00 00:00:00'),(30,119,125,10,NULL,NULL,'0000-00-00 00:00:00'),(31,119,126,10,NULL,NULL,'0000-00-00 00:00:00'),(32,119,127,10,NULL,NULL,'0000-00-00 00:00:00'),(33,119,128,10,NULL,NULL,'0000-00-00 00:00:00'),(34,119,129,10,NULL,NULL,'0000-00-00 00:00:00'),(35,120,121,10,NULL,NULL,'0000-00-00 00:00:00'),(36,120,122,10,NULL,NULL,'0000-00-00 00:00:00'),(37,120,123,10,NULL,NULL,'0000-00-00 00:00:00'),(38,120,124,10,NULL,NULL,'0000-00-00 00:00:00'),(39,120,125,10,NULL,NULL,'0000-00-00 00:00:00'),(40,120,126,10,NULL,NULL,'0000-00-00 00:00:00'),(41,120,127,10,NULL,NULL,'0000-00-00 00:00:00'),(42,120,128,10,NULL,NULL,'0000-00-00 00:00:00'),(43,120,129,10,NULL,NULL,'0000-00-00 00:00:00'),(44,121,122,10,NULL,NULL,'0000-00-00 00:00:00'),(45,121,123,10,NULL,NULL,'0000-00-00 00:00:00'),(46,121,124,10,NULL,NULL,'0000-00-00 00:00:00'),(47,121,125,10,NULL,NULL,'0000-00-00 00:00:00'),(48,121,126,10,NULL,NULL,'0000-00-00 00:00:00'),(49,121,127,10,NULL,NULL,'0000-00-00 00:00:00'),(50,121,128,10,NULL,NULL,'0000-00-00 00:00:00'),(51,121,129,10,NULL,NULL,'0000-00-00 00:00:00'),(52,122,123,10,NULL,NULL,'0000-00-00 00:00:00'),(53,122,124,10,NULL,NULL,'0000-00-00 00:00:00'),(54,122,125,10,NULL,NULL,'0000-00-00 00:00:00'),(55,122,126,10,NULL,NULL,'0000-00-00 00:00:00'),(56,122,127,10,NULL,NULL,'0000-00-00 00:00:00'),(57,122,128,10,NULL,NULL,'0000-00-00 00:00:00'),(58,122,129,10,NULL,NULL,'0000-00-00 00:00:00'),(59,123,124,10,NULL,NULL,'0000-00-00 00:00:00'),(60,123,125,10,NULL,NULL,'0000-00-00 00:00:00'),(61,123,126,10,NULL,NULL,'0000-00-00 00:00:00'),(62,123,127,10,NULL,NULL,'0000-00-00 00:00:00'),(63,123,128,10,NULL,NULL,'0000-00-00 00:00:00'),(64,123,129,10,NULL,NULL,'0000-00-00 00:00:00'),(65,124,125,10,NULL,NULL,'0000-00-00 00:00:00'),(66,124,126,10,NULL,NULL,'0000-00-00 00:00:00'),(67,124,127,10,NULL,NULL,'0000-00-00 00:00:00'),(68,124,128,10,NULL,NULL,'0000-00-00 00:00:00'),(69,124,129,10,NULL,NULL,'0000-00-00 00:00:00'),(70,125,126,10,NULL,NULL,'0000-00-00 00:00:00'),(71,125,127,10,NULL,NULL,'0000-00-00 00:00:00'),(72,125,128,10,NULL,NULL,'0000-00-00 00:00:00'),(73,125,129,10,NULL,NULL,'0000-00-00 00:00:00'),(74,126,127,10,NULL,NULL,'0000-00-00 00:00:00'),(75,126,128,10,NULL,NULL,'0000-00-00 00:00:00'),(76,126,129,10,NULL,NULL,'0000-00-00 00:00:00'),(77,127,128,10,NULL,NULL,'0000-00-00 00:00:00'),(78,127,129,10,NULL,NULL,'0000-00-00 00:00:00'),(79,128,129,10,NULL,NULL,'0000-00-00 00:00:00'),(80,413,407,30,NULL,NULL,'2025-09-16 11:00:00'),(81,413,415,30,NULL,NULL,'2025-10-30 14:30:00'),(82,418,413,30,NULL,NULL,'2025-11-05 11:45:00'),(83,414,408,30,NULL,NULL,'2025-09-20 12:15:00'),(84,414,417,30,NULL,NULL,'2025-10-11 14:00:00'),(85,406,414,30,NULL,NULL,'2025-11-28 12:30:00'),(86,415,420,30,NULL,NULL,'2025-09-24 13:00:00'),(87,415,409,30,NULL,NULL,'2025-10-17 10:30:00'),(88,413,415,30,NULL,NULL,'2025-11-10 16:15:00'),(89,416,405,30,NULL,NULL,'2025-09-28 11:45:00'),(90,416,411,30,NULL,NULL,'2025-10-13 12:30:00'),(91,408,416,30,NULL,NULL,'2025-11-01 15:00:00'),(92,417,406,30,NULL,NULL,'2025-09-02 10:00:00'),(93,417,414,30,NULL,NULL,'2025-10-07 13:45:00'),(94,407,417,30,NULL,NULL,'2025-11-14 13:15:00'),(95,418,409,30,NULL,NULL,'2025-09-04 14:30:00'),(96,418,413,30,NULL,NULL,'2025-10-20 11:00:00'),(97,406,418,30,NULL,NULL,'2025-11-26 11:45:00'),(98,419,405,30,NULL,NULL,'2025-09-09 12:00:00'),(99,419,412,30,NULL,NULL,'2025-10-23 13:30:00'),(100,410,419,30,NULL,NULL,'2025-11-16 16:00:00'),(101,420,415,30,NULL,NULL,'2025-09-13 10:30:00'),(102,420,412,30,NULL,NULL,'2025-10-27 13:45:00'),(103,408,420,30,NULL,NULL,'2025-11-29 15:15:00'),(104,405,410,30,NULL,NULL,'2025-09-06 12:30:00'),(105,412,405,30,NULL,NULL,'2025-10-12 14:00:00'),(106,405,419,30,NULL,NULL,'2025-11-03 12:15:00'),(107,406,407,30,NULL,NULL,'2025-09-10 13:00:00'),(108,418,406,30,NULL,NULL,'2025-10-18 10:45:00'),(109,406,414,30,NULL,NULL,'2025-11-22 16:30:00'),(110,407,408,30,NULL,NULL,'2025-09-03 11:00:00'),(111,407,415,30,NULL,NULL,'2025-10-09 12:45:00'),(112,417,407,30,NULL,NULL,'2025-11-27 15:15:00'),(113,408,420,30,NULL,NULL,'2025-09-14 10:30:00'),(114,408,411,30,NULL,NULL,'2025-10-21 13:30:00'),(115,416,408,30,NULL,NULL,'2025-11-08 16:00:00'),(116,409,418,30,NULL,NULL,'2025-09-01 14:00:00'),(117,409,413,30,NULL,NULL,'2025-10-15 12:00:00'),(118,410,409,30,NULL,NULL,'2025-11-19 12:45:00'),(119,410,412,30,NULL,NULL,'2025-09-05 13:15:00'),(120,419,410,30,NULL,NULL,'2025-10-25 10:00:00'),(121,410,417,30,NULL,NULL,'2025-11-30 15:30:00'),(122,411,416,30,NULL,NULL,'2025-09-08 12:00:00'),(123,411,405,30,NULL,NULL,'2025-10-03 11:30:00'),(124,414,411,30,NULL,NULL,'2025-11-12 16:45:00'),(125,412,419,30,NULL,NULL,'2025-09-12 10:15:00'),(126,412,406,30,NULL,NULL,'2025-10-06 14:45:00'),(127,420,412,30,NULL,NULL,'2025-11-24 13:30:00'),(128,19,20,3,NULL,NULL,'2025-09-01 08:00:00'),(129,19,21,3,NULL,NULL,'2025-09-01 10:00:00'),(130,19,22,3,NULL,NULL,'2025-09-01 12:00:00'),(131,19,23,3,NULL,NULL,'2025-09-01 14:00:00'),(132,19,24,3,NULL,NULL,'2025-09-01 16:00:00'),(133,19,25,3,NULL,NULL,'2025-09-01 18:00:00'),(134,19,26,3,NULL,NULL,'2025-09-01 20:00:00'),(135,19,27,3,NULL,NULL,'2025-09-01 22:00:00'),(136,19,28,3,NULL,NULL,'2025-09-02 00:00:00'),(137,19,29,3,NULL,NULL,'2025-09-02 02:00:00'),(138,19,30,3,1,0,'2025-09-02 04:00:00'),(139,19,31,3,4,2,'2025-09-02 06:00:00'),(140,19,32,3,NULL,NULL,'2025-09-02 08:00:00'),(141,20,21,3,3,0,'2025-09-02 10:00:00'),(142,20,22,3,1,1,'2025-09-02 12:00:00'),(143,20,23,3,NULL,NULL,'2025-09-02 14:00:00'),(144,20,24,3,NULL,NULL,'2025-09-02 16:00:00'),(145,20,25,3,NULL,NULL,'2025-09-02 18:00:00'),(146,20,26,3,NULL,NULL,'2025-09-02 20:00:00'),(147,20,27,3,NULL,NULL,'2025-09-02 22:00:00'),(148,20,28,3,NULL,NULL,'2025-09-03 00:00:00'),(149,20,29,3,NULL,NULL,'2025-09-03 02:00:00'),(150,20,30,3,NULL,NULL,'2025-09-03 04:00:00'),(151,20,31,3,NULL,NULL,'2025-09-03 06:00:00'),(152,20,32,3,NULL,NULL,'2025-09-03 08:00:00');
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `matches_after_insert` AFTER INSERT ON `matches` FOR EACH ROW BEGIN
    -- Dodanie statystyk dla gospodarzy
    UPDATE standings
    SET 
        goalsFor = goalsFor + COALESCE(NEW.homeGoals, 0),
        goalsAgainst = goalsAgainst + COALESCE(NEW.awayGoals, 0),
        points = points + CASE
                    WHEN NEW.homeGoals > NEW.awayGoals THEN 3
                    WHEN NEW.homeGoals = NEW.awayGoals THEN 1
                    ELSE 0
                  END,
        goalDifference = goalsFor - goalsAgainst
    WHERE team_id = NEW.home_team_id;

    -- Dodanie statystyk dla gości
    UPDATE standings
    SET 
        goalsFor = goalsFor + COALESCE(NEW.awayGoals, 0),
        goalsAgainst = goalsAgainst + COALESCE(NEW.homeGoals, 0),
        points = points + CASE
                    WHEN NEW.awayGoals > NEW.homeGoals THEN 3
                    WHEN NEW.awayGoals = NEW.homeGoals THEN 1
                    ELSE 0
                  END,
        goalDifference = goalsFor - goalsAgainst
    WHERE team_id = NEW.away_team_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `matches_after_update` AFTER UPDATE ON `matches` FOR EACH ROW BEGIN
    IF NOT (OLD.homeGoals <=> NEW.homeGoals AND OLD.awayGoals <=> NEW.awayGoals) THEN

        -- Cofnięcie starych statystyk dla gospodarzy
        UPDATE standings
        SET 
            goalsFor = GREATEST(goalsFor - COALESCE(OLD.homeGoals, 0), 0),
            goalsAgainst = GREATEST(goalsAgainst - COALESCE(OLD.awayGoals, 0), 0),
            points = points - CASE
                        WHEN OLD.homeGoals > OLD.awayGoals THEN 3
                        WHEN OLD.homeGoals = OLD.awayGoals THEN 1
                        ELSE 0
                      END,
            goalDifference = goalsFor - goalsAgainst
        WHERE team_id = OLD.home_team_id;

        -- Cofnięcie starych statystyk dla gości
        UPDATE standings
        SET 
            goalsFor = GREATEST(goalsFor - COALESCE(OLD.awayGoals, 0), 0),
            goalsAgainst = GREATEST(goalsAgainst - COALESCE(OLD.homeGoals, 0), 0),
            points = points - CASE
                        WHEN OLD.awayGoals > OLD.homeGoals THEN 3
                        WHEN OLD.awayGoals = OLD.homeGoals THEN 1
                        ELSE 0
                      END,
            goalDifference = goalsFor - goalsAgainst
        WHERE team_id = OLD.away_team_id;

        -- Dodanie nowych statystyk dla gospodarzy
        UPDATE standings
        SET 
            goalsFor = goalsFor + COALESCE(NEW.homeGoals, 0),
            goalsAgainst = goalsAgainst + COALESCE(NEW.awayGoals, 0),
            points = points + CASE
                        WHEN NEW.homeGoals > NEW.awayGoals THEN 3
                        WHEN NEW.homeGoals = NEW.awayGoals THEN 1
                        ELSE 0
                      END,
            goalDifference = goalsFor - goalsAgainst
        WHERE team_id = NEW.home_team_id;

        -- Dodanie nowych statystyk dla gości
        UPDATE standings
        SET 
            goalsFor = goalsFor + COALESCE(NEW.awayGoals, 0),
            goalsAgainst = COALESCE(NEW.homeGoals, 0),
            points = points + CASE
                        WHEN NEW.awayGoals > NEW.homeGoals THEN 3
                        WHEN NEW.awayGoals = NEW.homeGoals THEN 1
                        ELSE 0
                      END,
            goalDifference = goalsFor - goalsAgainst
        WHERE team_id = NEW.away_team_id;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (1,'2025/2026'),(2,'2026/2027');
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standings`
--

DROP TABLE IF EXISTS `standings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `goalsFor` int(11) NOT NULL DEFAULT 0,
  `goalsAgainst` int(11) NOT NULL DEFAULT 0,
  `goalDifference` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_3bbd65ccfcbe4e9108b41528b65` (`team_id`),
  KEY `FK_adcf9e5a607f009c666adead998` (`group_id`),
  CONSTRAINT `FK_3bbd65ccfcbe4e9108b41528b65` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_adcf9e5a607f009c666adead998` FOREIGN KEY (`group_id`) REFERENCES `league_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2980 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standings`
--

LOCK TABLES `standings` WRITE;
/*!40000 ALTER TABLE `standings` DISABLE KEYS */;
INSERT INTO `standings` VALUES (1024,1,2,0,0,0,0),(1025,2,2,0,0,0,0),(1026,3,2,0,0,0,0),(1027,4,2,0,0,0,0),(1028,5,2,0,2,1,1),(1029,6,2,0,0,0,0),(1030,7,2,0,0,0,0),(1031,8,2,0,0,0,0),(1032,9,2,0,0,0,0),(1033,10,2,0,0,0,0),(1034,11,2,0,0,0,0),(1035,12,2,0,0,0,0),(1036,13,2,0,0,0,0),(1037,14,2,0,0,0,0),(1038,15,2,0,0,0,0),(1039,16,2,0,0,0,0),(1040,17,2,0,0,0,0),(1041,18,2,0,0,0,0),(1042,19,3,6,5,2,3),(1043,20,3,4,4,1,3),(1044,21,3,0,0,3,-3),(1045,22,3,1,1,1,0),(1046,23,3,0,0,0,0),(1047,24,3,0,0,0,0),(1048,25,3,0,0,0,0),(1049,26,3,0,0,0,0),(1050,27,3,0,0,0,0),(1051,28,3,0,0,0,0),(1052,29,3,0,0,0,0),(1053,30,3,0,0,1,-1),(1054,31,3,0,2,4,-2),(1055,32,3,0,0,0,0),(1056,33,4,0,0,0,0),(1057,34,4,0,0,0,0),(1058,35,4,0,0,0,0),(1059,36,4,0,0,0,0),(1060,37,4,0,0,0,0),(1061,38,4,0,0,0,0),(1062,39,4,0,0,0,0),(1063,40,4,0,0,0,0),(1064,41,4,0,0,0,0),(1065,42,4,0,0,0,0),(1066,43,4,0,0,0,0),(1067,44,4,0,0,0,0),(1068,45,4,0,0,0,0),(1069,46,4,0,0,0,0),(1070,47,5,0,0,0,0),(1071,48,5,0,0,0,0),(1072,49,5,0,0,0,0),(1073,50,5,0,0,0,0),(1074,51,5,0,0,0,0),(1075,52,5,0,0,0,0),(1076,53,5,0,0,0,0),(1077,54,5,0,0,0,0),(1078,55,5,0,0,0,0),(1079,56,5,0,0,0,0),(1080,57,5,0,0,0,0),(1081,58,5,0,0,0,0),(1082,59,5,0,0,0,0),(1083,60,5,0,0,0,0),(1084,61,6,0,0,0,0),(1085,62,6,0,0,0,0),(1086,63,6,0,0,0,0),(1087,64,6,0,0,0,0),(1088,65,6,0,0,0,0),(1089,66,6,0,0,0,0),(1090,67,6,0,0,0,0),(1091,68,6,0,0,0,0),(1092,69,6,0,0,0,0),(1093,70,6,0,0,0,0),(1094,71,6,0,0,0,0),(1095,72,6,0,0,0,0),(1096,73,6,0,0,0,0),(1097,74,6,0,0,0,0),(1098,75,7,0,0,0,0),(1099,76,7,0,0,0,0),(1100,77,7,0,0,0,0),(1101,78,7,0,0,0,0),(1102,79,7,0,0,0,0),(1103,80,7,0,0,0,0),(1104,81,7,0,0,0,0),(1105,82,7,0,0,0,0),(1106,83,7,0,0,0,0),(1107,84,7,0,0,0,0),(1108,85,7,0,0,0,0),(1109,86,7,0,0,0,0),(1110,87,7,0,0,0,0),(1111,88,7,0,0,0,0),(1112,431,31,0,0,0,0),(1113,89,8,0,0,0,0),(1114,448,32,0,0,0,0),(1115,90,8,0,0,0,0),(1116,440,32,0,0,0,0),(1117,91,8,0,0,0,0),(1118,439,32,0,0,0,0),(1119,92,8,0,0,0,0),(1120,93,8,0,0,0,0),(1121,94,8,0,0,0,0),(1122,423,31,0,0,0,0),(1123,95,8,0,0,0,0),(1124,446,32,0,0,0,0),(1125,96,8,0,0,0,0),(1126,97,8,0,0,0,0),(1127,98,8,0,0,0,0),(1128,602,43,0,0,0,0),(1129,99,8,0,0,0,0),(1130,457,33,0,0,0,0),(1131,100,8,0,0,0,0),(1132,463,33,0,0,0,0),(1133,101,8,0,0,0,0),(1134,460,33,0,0,0,0),(1135,102,8,0,0,0,0),(1136,103,9,0,0,0,0),(1137,104,9,0,0,0,0),(1138,105,9,0,0,0,0),(1139,106,9,0,0,0,0),(1140,107,9,0,0,0,0),(1141,108,9,0,0,0,0),(1142,109,9,0,0,0,0),(1143,110,9,0,0,0,0),(1144,111,9,0,0,0,0),(1145,112,9,0,0,0,0),(1146,113,9,0,0,0,0),(1147,114,9,0,0,0,0),(1148,115,9,0,0,0,0),(1149,116,9,0,0,0,0),(1163,130,11,0,0,0,0),(1164,131,11,0,0,0,0),(1165,132,11,0,0,0,0),(1166,133,11,0,0,0,0),(1167,134,11,0,0,0,0),(1168,135,11,0,0,0,0),(1169,136,11,0,0,0,0),(1170,137,11,0,0,0,0),(1171,138,11,0,0,0,0),(1172,139,11,0,0,0,0),(1173,140,11,0,0,0,0),(1174,141,11,0,0,0,0),(1175,142,11,0,0,0,0),(1176,143,11,0,0,0,0),(1177,144,11,0,0,0,0),(1178,145,11,0,0,0,0),(1179,146,12,0,0,0,0),(1180,147,12,0,0,0,0),(1181,148,12,0,0,0,0),(1182,149,12,0,0,0,0),(1183,150,12,0,0,0,0),(1184,151,12,0,0,0,0),(1185,152,12,0,0,0,0),(1186,153,12,0,0,0,0),(1187,154,12,0,0,0,0),(1188,155,12,0,0,0,0),(1189,156,12,0,0,0,0),(1190,157,12,0,0,0,0),(1191,158,12,0,0,0,0),(1192,159,12,0,0,0,0),(1193,160,12,0,0,0,0),(1194,161,12,0,0,0,0),(1195,162,13,0,0,0,0),(1196,163,13,0,0,0,0),(1197,164,13,0,0,0,0),(1198,165,13,0,0,0,0),(1199,166,13,0,0,0,0),(1200,167,13,0,0,0,0),(1201,168,13,0,0,0,0),(1202,169,13,0,0,0,0),(1203,170,13,0,0,0,0),(1204,171,13,0,0,0,0),(1205,172,13,0,0,0,0),(1206,173,13,0,0,0,0),(1207,174,13,0,0,0,0),(1208,175,13,0,0,0,0),(1209,176,13,0,0,0,0),(1210,177,13,0,0,0,0),(1211,178,14,0,0,0,0),(1212,179,14,0,0,0,0),(1213,180,14,0,0,0,0),(1214,181,14,0,0,0,0),(1215,182,14,0,0,0,0),(1216,183,14,0,0,0,0),(1217,184,14,0,0,0,0),(1218,185,14,0,0,0,0),(1219,186,14,0,0,0,0),(1220,187,14,0,0,0,0),(1221,188,14,0,0,0,0),(1222,189,14,0,0,0,0),(1223,190,14,0,0,0,0),(1224,191,14,0,0,0,0),(1225,192,14,0,0,0,0),(1226,193,14,0,0,0,0),(1227,194,15,0,0,0,0),(1228,195,15,0,0,0,0),(1229,196,15,0,0,0,0),(1230,197,15,0,0,0,0),(1231,198,15,0,0,0,0),(1232,199,15,0,0,0,0),(1233,200,15,0,0,0,0),(1234,201,15,0,0,0,0),(1235,202,15,0,0,0,0),(1236,203,15,0,0,0,0),(1237,204,15,0,0,0,0),(1238,205,15,0,0,0,0),(1239,206,15,0,0,0,0),(1240,207,16,0,0,0,0),(1241,208,16,0,0,0,0),(1242,209,16,0,0,0,0),(1243,210,16,0,0,0,0),(1244,211,16,0,0,0,0),(1245,212,16,0,0,0,0),(1246,213,16,0,0,0,0),(1247,214,16,0,0,0,0),(1248,215,16,0,0,0,0),(1249,216,16,0,0,0,0),(1250,217,16,0,0,0,0),(1251,218,16,0,0,0,0),(1252,219,16,0,0,0,0),(1253,220,16,0,0,0,0),(1254,221,17,0,0,0,0),(1255,222,17,0,0,0,0),(1256,223,17,0,0,0,0),(1257,224,17,0,0,0,0),(1258,225,17,0,0,0,0),(1259,226,17,0,0,0,0),(1260,227,17,0,0,0,0),(1261,228,17,0,0,0,0),(1262,229,17,0,0,0,0),(1263,230,17,0,0,0,0),(1264,231,17,0,0,0,0),(1265,232,17,0,0,0,0),(1266,233,17,0,0,0,0),(1267,234,18,0,0,0,0),(1268,235,18,0,0,0,0),(1269,236,18,0,0,0,0),(1270,237,18,0,0,0,0),(1271,238,18,0,0,0,0),(1272,239,18,0,0,0,0),(1273,240,18,0,0,0,0),(1274,241,18,0,0,0,0),(1275,242,18,0,0,0,0),(1276,243,18,0,0,0,0),(1277,244,18,0,0,0,0),(1278,245,18,0,0,0,0),(1279,246,19,0,0,0,0),(1280,247,19,0,0,0,0),(1281,248,19,0,0,0,0),(1282,249,19,0,0,0,0),(1283,250,19,0,0,0,0),(1284,251,19,0,0,0,0),(1285,252,19,0,0,0,0),(1286,253,19,0,0,0,0),(1287,254,19,0,0,0,0),(1288,255,19,0,0,0,0),(1289,256,19,0,0,0,0),(1290,257,19,0,0,0,0),(1291,258,19,0,0,0,0),(1292,259,20,0,0,0,0),(1293,260,20,0,0,0,0),(1294,261,20,0,0,0,0),(1295,262,20,0,0,0,0),(1296,263,20,0,0,0,0),(1297,264,20,0,0,0,0),(1298,265,20,0,0,0,0),(1299,266,20,0,0,0,0),(1300,267,20,0,0,0,0),(1301,268,20,0,0,0,0),(1302,269,20,0,0,0,0),(1303,270,20,0,0,0,0),(1304,271,20,0,0,0,0),(1305,272,20,0,0,0,0),(1306,273,20,0,0,0,0),(1307,274,20,0,0,0,0),(1308,275,21,0,0,0,0),(1309,276,21,0,0,0,0),(1310,277,21,0,0,0,0),(1311,278,21,0,0,0,0),(1312,279,21,0,0,0,0),(1313,280,21,0,0,0,0),(1314,281,21,0,0,0,0),(1315,282,21,0,0,0,0),(1316,283,21,0,0,0,0),(1317,284,21,0,0,0,0),(1318,285,21,0,0,0,0),(1319,286,21,0,0,0,0),(1320,287,21,0,0,0,0),(1321,288,21,0,0,0,0),(1322,289,21,0,0,0,0),(1323,290,21,0,0,0,0),(1324,291,22,0,0,0,0),(1325,292,22,0,0,0,0),(1326,293,22,0,0,0,0),(1327,294,22,0,0,0,0),(1328,295,22,0,0,0,0),(1329,296,22,0,0,0,0),(1330,297,22,0,0,0,0),(1331,298,22,0,0,0,0),(1332,299,22,0,0,0,0),(1333,300,22,0,0,0,0),(1334,301,22,0,0,0,0),(1335,302,22,0,0,0,0),(1336,303,22,0,0,0,0),(1337,304,22,0,0,0,0),(1338,305,22,0,0,0,0),(1339,306,22,0,0,0,0),(1340,307,23,0,0,0,0),(1341,308,23,0,0,0,0),(1342,309,23,0,0,0,0),(1343,310,23,0,0,0,0),(1344,311,23,0,0,0,0),(1345,312,23,0,0,0,0),(1346,313,23,0,0,0,0),(1347,314,23,0,0,0,0),(1348,315,23,0,0,0,0),(1349,316,23,0,0,0,0),(1350,317,23,0,0,0,0),(1351,318,23,0,0,0,0),(1352,319,23,0,0,0,0),(1353,320,23,0,0,0,0),(1354,321,23,0,0,0,0),(1355,322,23,0,0,0,0),(1356,323,24,0,0,0,0),(1357,324,24,0,0,0,0),(1358,325,24,0,0,0,0),(1359,326,24,0,0,0,0),(1360,327,24,0,0,0,0),(1361,328,24,0,0,0,0),(1362,329,24,0,0,0,0),(1363,330,24,0,0,0,0),(1364,331,24,0,0,0,0),(1365,332,24,0,0,0,0),(1366,333,24,0,0,0,0),(1367,334,24,0,0,0,0),(1368,335,25,0,0,0,0),(1369,336,25,0,0,0,0),(1370,337,25,0,0,0,0),(1371,338,25,0,0,0,0),(1372,339,25,0,0,0,0),(1373,340,25,0,0,0,0),(1374,341,25,0,0,0,0),(1375,342,25,0,0,0,0),(1376,343,25,0,0,0,0),(1377,344,25,0,0,0,0),(1378,345,25,0,0,0,0),(1379,346,25,0,0,0,0),(1380,347,25,0,0,0,0),(1381,348,25,0,0,0,0),(1382,349,26,0,0,0,0),(1383,350,26,0,0,0,0),(1384,351,26,0,0,0,0),(1385,352,26,0,0,0,0),(1386,353,26,0,0,0,0),(1387,354,26,0,0,0,0),(1388,355,26,0,0,0,0),(1389,356,26,0,0,0,0),(1390,357,26,0,0,0,0),(1391,358,26,0,0,0,0),(1392,361,26,0,0,0,0),(1393,359,26,0,0,0,0),(1394,360,26,0,0,0,0),(1395,362,26,0,0,0,0),(1396,363,27,0,0,0,0),(1397,364,27,0,0,0,0),(1398,365,27,0,0,0,0),(1399,366,27,0,0,0,0),(1400,367,27,0,0,0,0),(1401,368,27,0,0,0,0),(1402,369,27,0,0,0,0),(1403,370,27,0,0,0,0),(1404,371,27,0,0,0,0),(1405,372,27,0,0,0,0),(1406,373,27,0,0,0,0),(1407,374,27,0,0,0,0),(1408,375,28,0,0,0,0),(1409,376,28,0,0,0,0),(1410,377,28,0,0,0,0),(1411,378,28,0,0,0,0),(1412,379,28,0,0,0,0),(1413,380,28,0,0,0,0),(1414,381,28,0,0,0,0),(1415,382,28,0,0,0,0),(1416,383,28,0,0,0,0),(1417,384,28,0,0,0,0),(1418,385,28,0,0,0,0),(1419,386,28,0,0,0,0),(1420,387,28,0,0,0,0),(1421,388,28,0,0,0,0),(1422,389,29,0,0,0,0),(1423,390,29,0,0,0,0),(1424,391,29,0,0,0,0),(1425,392,29,0,0,0,0),(1426,393,29,0,0,0,0),(1427,394,29,0,0,0,0),(1428,395,29,0,0,0,0),(1429,396,29,0,0,0,0),(1430,397,29,0,0,0,0),(1431,398,29,0,0,0,0),(1432,399,29,0,0,0,0),(1433,400,29,0,0,0,0),(1434,401,29,0,0,0,0),(1435,402,29,0,0,0,0),(1436,403,29,0,0,0,0),(1437,404,29,0,0,0,0),(1443,551,40,0,0,0,0),(1455,421,31,0,0,0,0),(1456,422,31,0,0,0,0),(1457,424,31,0,0,0,0),(1458,425,31,0,0,0,0),(1459,426,31,0,0,0,0),(1460,427,31,0,0,0,0),(1461,428,31,0,0,0,0),(1462,429,31,0,0,0,0),(1463,430,31,0,0,0,0),(1464,432,31,0,0,0,0),(1465,433,31,0,0,0,0),(1466,434,31,0,0,0,0),(1467,435,31,0,0,0,0),(1468,436,31,0,0,0,0),(1469,437,32,0,0,0,0),(1470,438,32,0,0,0,0),(1471,441,32,0,0,0,0),(1472,442,32,0,0,0,0),(1473,443,32,0,0,0,0),(1474,444,32,0,0,0,0),(1475,445,32,0,0,0,0),(1476,447,32,0,0,0,0),(1477,449,32,0,0,0,0),(1478,496,36,0,0,0,0),(1479,450,32,0,0,0,0),(1480,451,32,0,0,0,0),(1481,452,32,0,0,0,0),(1482,453,33,0,0,0,0),(1483,454,33,0,0,0,0),(1484,455,33,0,0,0,0),(1485,456,33,0,0,0,0),(1486,458,33,0,0,0,0),(1487,459,33,0,0,0,0),(1488,552,40,0,0,0,0),(1489,461,33,0,0,0,0),(1490,462,33,0,0,0,0),(1491,464,33,0,0,0,0),(1492,465,33,0,0,0,0),(1493,466,33,0,0,0,0),(1494,467,33,0,0,0,0),(1495,468,33,0,0,0,0),(1496,469,34,0,0,0,0),(1497,470,34,0,0,0,0),(1498,471,34,0,0,0,0),(1499,472,34,0,0,0,0),(1500,473,34,0,0,0,0),(1501,474,34,0,0,0,0),(1502,475,34,0,0,0,0),(1503,476,34,0,0,0,0),(1504,477,34,0,0,0,0),(1505,478,34,0,0,0,0),(1506,479,34,0,0,0,0),(1507,480,34,0,0,0,0),(1508,481,34,0,0,0,0),(1509,482,34,0,0,0,0),(1510,483,35,0,0,0,0),(1511,484,35,0,0,0,0),(1512,485,35,0,0,0,0),(1513,486,35,0,0,0,0),(1514,487,35,0,0,0,0),(1515,488,35,0,0,0,0),(1516,489,35,0,0,0,0),(1517,490,35,0,0,0,0),(1518,491,35,0,0,0,0),(1519,492,35,0,0,0,0),(1520,493,35,0,0,0,0),(1521,494,35,0,0,0,0),(1522,495,35,0,0,0,0),(1523,497,36,0,0,0,0),(1524,498,36,0,0,0,0),(1525,499,36,0,0,0,0),(1526,500,36,0,0,0,0),(1527,501,36,0,0,0,0),(1528,502,36,0,0,0,0),(1529,503,36,0,0,0,0),(1530,504,36,0,0,0,0),(1531,505,36,0,0,0,0),(1532,506,36,0,0,0,0),(1533,507,36,0,0,0,0),(1534,508,36,0,0,0,0),(1535,509,36,0,0,0,0),(1536,510,37,0,0,0,0),(1537,511,37,0,0,0,0),(1538,512,37,0,0,0,0),(1539,513,37,0,0,0,0),(1540,514,37,0,0,0,0),(1541,515,37,0,0,0,0),(1542,516,37,0,0,0,0),(1543,517,37,0,0,0,0),(1544,518,37,0,0,0,0),(1545,519,37,0,0,0,0),(1546,520,37,0,0,0,0),(1547,521,37,0,0,0,0),(1548,522,37,0,0,0,0),(1549,523,38,0,0,0,0),(1550,524,38,0,0,0,0),(1551,525,38,0,0,0,0),(1552,526,38,0,0,0,0),(1553,527,38,0,0,0,0),(1554,528,38,0,0,0,0),(1555,529,38,0,0,0,0),(1556,530,38,0,0,0,0),(1557,531,38,0,0,0,0),(1558,532,38,0,0,0,0),(1559,533,38,0,0,0,0),(1560,534,38,0,0,0,0),(1561,535,38,0,0,0,0),(1562,536,39,0,0,0,0),(1563,537,39,0,0,0,0),(1564,538,39,0,0,0,0),(1565,539,39,0,0,0,0),(1566,540,39,0,0,0,0),(1567,541,39,0,0,0,0),(1568,542,39,0,0,0,0),(1569,543,39,0,0,0,0),(1570,544,39,0,0,0,0),(1571,545,39,0,0,0,0),(1572,546,39,0,0,0,0),(1573,547,39,0,0,0,0),(1574,548,39,0,0,0,0),(1575,549,39,0,0,0,0),(1576,568,41,0,0,0,0),(1577,550,40,0,0,0,0),(1578,574,41,0,0,0,0),(1579,553,40,0,0,0,0),(1580,564,41,0,0,0,0),(1581,554,40,0,0,0,0),(1582,555,40,0,0,0,0),(1583,576,41,0,0,0,0),(1584,556,40,0,0,0,0),(1585,565,41,0,0,0,0),(1586,557,40,0,0,0,0),(1587,558,40,0,0,0,0),(1588,559,40,0,0,0,0),(1589,570,41,0,0,0,0),(1590,560,40,0,0,0,0),(1591,572,41,0,0,0,0),(1592,561,40,0,0,0,0),(1593,562,40,0,0,0,0),(1594,563,40,0,0,0,0),(1595,566,41,0,0,0,0),(1596,567,41,0,0,0,0),(1597,569,41,0,0,0,0),(1598,571,41,0,0,0,0),(1599,573,41,0,0,0,0),(1600,575,41,0,0,0,0),(1601,577,42,0,0,0,0),(1602,578,42,0,0,0,0),(1603,579,42,0,0,0,0),(1604,580,42,0,0,0,0),(1605,581,42,0,0,0,0),(1606,582,42,0,0,0,0),(1607,583,42,0,0,0,0),(1608,584,42,0,0,0,0),(1609,585,42,0,0,0,0),(1610,586,42,0,0,0,0),(1611,587,42,0,0,0,0),(1612,588,42,0,0,0,0),(1613,589,42,0,0,0,0),(1614,590,42,0,0,0,0),(1615,591,43,0,0,0,0),(1616,592,43,0,0,0,0),(1617,593,43,0,0,0,0),(1618,594,43,0,0,0,0),(1619,595,43,0,0,0,0),(1620,596,43,0,0,0,0),(1621,597,43,0,0,0,0),(1622,598,43,0,0,0,0),(1623,599,43,0,0,0,0),(1624,600,43,0,0,0,0),(1625,601,43,0,0,0,0),(1626,603,43,0,0,0,0),(1627,604,43,0,0,0,0),(1628,605,43,0,0,0,0),(1629,606,43,0,0,0,0),(2950,412,30,0,0,0,0),(2951,408,30,0,0,0,0),(2952,406,30,0,0,0,0),(2953,410,30,0,0,0,0),(2954,407,30,0,0,0,0),(2955,418,30,0,0,0,0),(2956,405,30,0,0,0,0),(2957,413,30,0,0,0,0),(2958,417,30,0,0,0,0),(2959,415,30,0,0,0,0),(2960,414,30,0,0,0,0),(2961,419,30,0,0,0,0),(2962,420,30,0,0,0,0),(2963,409,30,0,0,0,0),(2964,416,30,0,0,0,0),(2965,411,30,0,0,0,0),(2966,127,10,0,0,0,0),(2967,118,10,0,0,0,0),(2968,121,10,0,0,0,0),(2969,117,10,0,0,0,0),(2970,126,10,0,0,0,0),(2971,125,10,0,0,0,0),(2972,122,10,0,0,0,0),(2973,120,10,0,0,0,0),(2974,124,10,0,0,0,0),(2975,119,10,0,0,0,0),(2976,123,10,0,0,0,0),(2977,128,10,0,0,0,0),(2978,129,10,0,0,0,0),(2979,116,10,0,0,0,0);
/*!40000 ALTER TABLE `standings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dac3c13839536151455938e66b7` (`group_id`),
  CONSTRAINT `FK_dac3c13839536151455938e66b7` FOREIGN KEY (`group_id`) REFERENCES `league_groups` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=607 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Legsad Kościelec',2),(2,'Górnik Złotoryja',2),(3,'Twardy Świętoszów',2),(4,'Iskra Księginice',2),(5,'Chrobry II Głogów S.A.',2),(6,'MGKS Moto - Jelcz Oława',2),(7,'Polonia Środa Śląska',2),(8,'Orzeł Ząbkowice Śląskie',2),(9,'Lechia Dzierżoniów',2),(10,'Piast Żmigród',2),(11,'Barycz Sułów',2),(12,'Łużyce Lubań',2),(13,'Błyskawica Gać',2),(14,'KP Górnik Wałbrzych',2),(15,'GKS Mirków-Długołęka',2),(16,'Piast Nowa Ruda',2),(17,'AKS Granit Strzegom SA',2),(18,'Prochowiczanka',2),(19,'Olimpia Kowary',3),(20,'Pogoń Świerzawa',3),(21,'Bóbr Marciszów',3),(22,'Kwarc Pisarzowice',3),(23,'Orzeł Wojcieszów',3),(24,'KS II Łomnica',3),(25,'Skalnik Czarny Bór',3),(26,'Orzeł II Mysłakowice',3),(27,'Lotnik Jeżów Sudecki',3),(28,'Włókniarz Chełmsko',3),(29,'Orzeł Lubawka',3),(30,'Victoria II Jelenia Góra',3),(31,'Halniak Miłków',3),(32,'Czarni Przedwojów',3),(33,'Sudety Giebułtów',4),(34,'Iskra Łagów',4),(35,'Łużyce II Lubań',4),(36,'Granica Bogatynia',4),(37,'Cosmos Radzimów',4),(38,'Błękitni Studniska Dolne',4),(39,'KS Wojcieszyce-Szklarska Poręba',4),(40,'Olsza Olszyna',4),(41,'Stella Lubomierz',4),(42,'Czarni Strzyżowiec',4),(43,'Piast Zawidów',4),(44,'Korona Radostów',4),(45,'Łazek Pisarzowice',4),(46,'Fatma Pobiedna',4),(47,'Czarni Lwówek Śląski',5),(48,'Victoria Ruszów',5),(49,'Kolonia Bolesławiec',5),(50,'BKS II Bolesławiec',5),(51,'Sparta Zebrzydowa',5),(52,'LKS Mierzwin',5),(53,'KS Milków',5),(54,'Górnik Węgliniec',5),(55,'GKS Tomaszów Bolesławiecki',5),(56,'LKS Ocice',5),(57,'WKS Żarki Średnie',5),(58,'KS Stare Jaroszowice-Żeliszów',5),(59,'Zjednoczeni Nowogrodziec',5),(60,'Piast Wykroty',5),(61,'Amfibolit Leszczyniec',6),(62,'Bóbr Opawa',6),(63,'Dragon Miszkowice',6),(64,'Bóbr II Marciszów',6),(65,'Orły Lipienica',6),(66,'Victoria Czadrów',6),(67,'Uran Okrzeszyn',6),(68,'TS Wojanów',6),(69,'Sezal 2 Janiszów',6),(70,'Piast Bolków',6),(71,'Olimpia II Kowary',6),(72,'Lesk Sędzisław',6),(73,'Rudawy Janowice Wielkie',6),(74,'Pagaz Krzeszów',6),(75,'GLKS Jeżów Sudecki-Czernica',7),(76,'Lotnik II Jeżów Sudecki',7),(77,'Juvenia Rybnica',7),(78,'GKS Podgórzyn',7),(79,'PUB-GOL Jelenia Góra',7),(80,'Huragan II Proboszczów',7),(81,'FC Karpacz',7),(82,'Potok Karpniki',7),(83,'Karkonosze II Jelenia Góra',7),(84,'Pogoń II Świerzawa',7),(85,'WKS Pilchowice',7),(86,'Orzeł II Wojcieszów',7),(87,'Lechia II Piechowice',7),(88,'KS Maciejowa',9),(89,'Lotnik Twardogóra',9),(90,'Widawa Bierutów',9),(91,'KS Gręboszyce',9),(92,'Długołęka 2000',9),(93,'Strzelinianka Strzelin',9),(94,'Olimpia Bukowinka',9),(95,'Perła Węgrów',9),(96,'Polonia Miłoszyce',9),(97,'Wratislavia II Wrocław',9),(98,'Zenit II Międzybórz',9),(99,'Sokół Marcinkowice',9),(100,'Energetyk Siechnice',9),(101,'KS Żórawina',9),(102,'Korona Osiek',8),(103,'Pogoń Wleń',8),(104,'LZS Niwnice',8),(105,'KS Kotliska',8),(106,'Zbylut Zbylutów',8),(107,'Chmielanka Chmieleń',8),(108,'Bielany Biedrzychowice',8),(109,'Orzeł Gościszów',8),(110,'Olsza II Olszyna',8),(111,'Kwisa Świeradów Zdrój',8),(112,'Granit Gierałtów',8),(113,'Zryw Ubocze',8),(114,'Legend Squad Radogoszcz',8),(115,'Skalnik Rębiszów',8),(116,'KS Włodzice',10),(117,'KS Szyszkowa',10),(118,'Granica Miłoszów',10),(119,'Pogoń Markocice',10),(120,'Orzeł Platerówka',10),(121,'Jaśnica Opolno Zdrój',10),(122,'Nysa II Zgorzelec',10),(123,'WKS Przyszłość Dłużyna',10),(124,'Piast Czerwona Woda',10),(125,'LZS Zaręba',10),(126,'Lech Ręczyn',10),(127,'Bazalt Sulików',10),(128,'Zjednoczeni Porajów-Kopaczów',10),(129,'Zryw Bratków',10),(130,'Orzeł Mysłakowice',11),(131,'GKS Warta Bolesławiecka',11),(132,'LZS Kościelnik',11),(133,'Lechia Piechowice',11),(134,'KS Łomnica',11),(135,'Włókniarz Leśna',11),(136,'Olimpia Kamienna Góra',11),(137,'Gryf Gryfów Śląski',11),(138,'BKS Bolesławiec',11),(139,'Włókniarz Mirsk',11),(140,'Apis Jędrzychowice',11),(141,'Nysa Zgorzelec',11),(142,'GKS Raciborowice',11),(143,'Chrobry Nowogrodziec',11),(144,'Hutnik Pieńsk',11),(145,'Victoria Jelenia Góra',11),(146,'Odra Chobienia',12),(147,'LZS Ostaszów',12),(148,'Orzeł Czerna',12),(149,'Viktoria Borek',12),(150,'Sparta Przedmoście',12),(151,'Gwardia Białołęka',12),(152,'Sokół II Jerzmanowa',12),(153,'Płomień Radwanice',12),(154,'Górnik II Polkowice',12),(155,'Zamet Przemków',12),(156,'Dragon Jaczów',12),(157,'Zryw Kotla',12),(158,'GLKS Gaworzyce',12),(159,'Orla Wąsosz',12),(160,'Łagoszovia Łagoszów',12),(161,'GKS Piast Rzęczyca',12),(162,'Fortuna Obora',13),(163,'Orkan Szczedrzykowice',13),(164,'Płomień Michów',13),(165,'Sparta Parszowice',13),(166,'Dąb Stowarzyszenie Siedliska',13),(167,'Goldengranit Czarni Rokitki',13),(168,'Iskra II Kochlice',13),(169,'Arka Trzebnice',13),(170,'Unia Miłoradzice',13),(171,'Unia Szklary Górne',13),(172,'Kolejarz Miłkowice',13),(173,'Huzar Raszówka',13),(174,'Chojnowianka II Chojnów',13),(175,'KS Kłopotów-Osiek',13),(176,'Czarni Dziewin',13),(177,'Górnik Lubin',13),(178,'Fenix Pielgrzymka',14),(179,'Wilkowianka Wilków',14),(180,'Rataj Paszowice',14),(181,'Wilki Różana',14),(182,'Cicha Woda Tyniec Legnicki',14),(183,'Park Targoszyn',14),(184,'LZS Lipa',14),(185,'Polonia Ernestynów',14),(186,'Mewa Kunice',14),(187,'Ros-Bruk Damianowo',14),(188,'Orzeł Zagrodno',14),(189,'Odra Malczyce',14),(190,'Rodło Granowice',14),(191,'Huragan Proboszczów',14),(192,'Ikar Miłogostowice',14),(193,'Bazalt Piotrowice',14),(194,'Mieszko Ruszowice',15),(195,'Iskra Nielubia',15),(196,'Pogoń II Góra',15),(197,'LZK Koźlice',15),(198,'Zawisza Serby',15),(199,'Sparta II Grębocice',15),(200,'Zadzior Buczyna',15),(201,'Zryw II Kotla',15),(202,'Odra Grodziec Mały',15),(203,'Victoria Siciny',15),(204,'Sokół Niechlów',15),(205,'KS Kłobuczyn',15),(206,'Perła Potoczek',16),(207,'Skarpa Orsk',16),(208,'Victoria Parchów',16),(209,'Sparta II Rudna',16),(210,'Błysk Studzionki',16),(211,'Kalina Sobin',16),(212,'Platan Siedlce',16),(213,'Stal II Chocianów',16),(214,'Kryształ Chocianowiec',16),(215,'Iskra II Księginice',16),(216,'LZS Nowa Wieś Lubińska',16),(217,'Kłos Moskorzyn',16),(218,'Relaks Szklary Górna',17),(219,'Kupryt Sucha Górna',17),(220,'LZS Komorniki II',17),(221,'Rycerz Legnickie Pole',17),(222,'Lubiatowianka Lubiatów',17),(223,'Legsad II Kościelec',17),(224,'Korona Kawice',17),(225,'Krokus Kwiatkowice',17),(226,'Zakaczawie Legnica',17),(227,'Dąb Stowarzyszenie II Siedliska',17),(228,'Mała Unia Rosochata',17),(229,'Kaczawa II Bieniowice',17),(230,'KS Mierzowice',18),(231,'Grom Gromadzyń-Wielowieś',18),(232,'Victoria Niemstów',18),(233,'Albatros Jaśkowice',18),(234,'Orzeł Pichorowice',18),(235,'Tatra Krzeniów',18),(236,'LZS Lipa II',18),(237,'Lechia Rokitnica',18),(238,'Zryw Chełm',18),(239,'KS Lusina',18),(240,'Wulkan Nowy Kościół',18),(241,'Platan Sichów',18),(242,'Rodło II Granowice',19),(243,'Jaworzanka 1946 II Jawor',19),(244,'JTS Piast Jawor',19),(245,'Wilki II Różana',19),(246,'Sokół Krzywa',19),(247,'Iskra Niedźwiedzice',19),(248,'Goldengranit Czarni II Rokitki',19),(249,'Wilkowianka II Wilków',19),(250,'Płomień Nowa Wieś Grodziska',19),(251,'Orzeł II Zagrodno',19),(252,'Polonia II Ernestynów',19),(253,'Orzeł Wojcieszyn',19),(254,'Orlik Okmiany',19),(255,'Radziechowianka Radziechów',1),(256,'Olimpia Olszanica',1),(257,'Mewa Goliszów',1),(258,'Zryw Stary Łom',1),(259,'Konfeks Legnica',20),(260,'Jaworzanka 1946 Jawor',20),(261,'Błekitni Koskowice',20),(262,'KS Męcinka',20),(263,'Górnik II Złotoryja',20),(264,'Kaczawa Bieniowice',20),(265,'Iskra Kochlice',20),(266,'Pogoń Góra',20),(267,'LZS Komorniki',20),(268,'VSB Zryw Kłębanowice',20),(269,'Stal Chocianów',20),(270,'Sokół Jerzamanowa',20),(271,'Odra Ścinawa',20),(272,'Sparta Rudna',20),(273,'Chojnowianka Chojnów',20),(274,'Sparta Grębocice',20),(275,'KS Walim',21),(276,'AKS Bazalt Strzegom',21),(277,'Iskra Witków Śląski',21),(278,'KP Górnik II Wałbrzych',21),(279,'Błękitni Słotwina',21),(280,'Unia Jaroszów',21),(281,'Zieloni Mokreszów',21),(282,'Grom Witków',21),(283,'Nysa Kłaczyna',21),(284,'MKS Szczawno Zdrój',21),(285,'KS Stanowice',21),(286,'Victoria Świebodzice',21),(287,'Zagłębie Wałbrzych',21),(288,'Płomień Makowice',21),(289,'Sudety Dziećmorowice',21),(290,'Zjednoczeni II Żarów',21),(291,'LKS Dobrocin',22),(292,'Sudety Kątki',22),(293,'Polonia Ząbkowice Śląskie',22),(294,'Orzeł Ząbkowice Śląskie II',22),(295,'LKS Ślęża Ciepłowody',22),(296,'Piławianka Piława Górna',22),(297,'Zieloni Łagiewniki',22),(298,'S.T.E.P Tąpadła/Wiry',22),(299,'Break Farm Roztocznik',22),(300,'Sparta Ziębice',22),(301,'LKS Marcinowice',22),(302,'LKS Sowie Gilów',22),(303,'Kłos Lutomia',22),(304,'Cukrownik Pszenno',22),(305,'Piast Jaźwina',22),(306,'KS Silesia Żarów',22),(307,'Nysa Kłodzko',23),(308,'Unia Bardo',23),(309,'Pogoń ZEM Duszniki',23),(310,'Polanica Zdrój',23),(311,'Włókniarz Kudowa Zdrój',23),(312,'Zamek Trzebieszowice',23),(313,'GLKS Orlęta Krosnowice',23),(314,'Śnieżnik Domaszków',23),(315,'Polonia Bystrzyca Kłodzka',23),(316,'Tarnovia Tarnów',23),(317,'Burza Dzikowiec',23),(318,'Sparta Stary Waliszów',23),(319,'ATS Wojbórz',23),(320,'Trojan Lądek Zdrój',23),(321,'Iskra Jaszkowa Dolna',23),(322,'Zjednoczeni Ścinawka Średnia',23),(323,'Płomień Dobromierz',24),(324,'Podgórze Wałbrzych',24),(325,'Czarni Wamag Wałbrzych',24),(326,'Zagłębie II Wałbrzych',24),(327,'Sokół Kostrza',24),(328,'Huragan Olszany',24),(329,'Nysa II Kłaczyna',24),(330,'Unia Bogaczowice',24),(331,'Granit Roztoka',24),(332,'KP Mieroszów',24),(333,'Gwarek Wałbrzych',24),(334,'Szkółka Piłkarska Szczyt II Boguszów-Gorce',25),(335,'Zjednoczeni III Żarów',25),(336,'LKS II Bystrzyca Górna',25),(337,'PUO Wiśniowa',25),(338,'Sparta Przełom Pastuchów',25),(339,'Grom Panków',25),(340,'Venus Nowice',25),(341,'Błyskawica Kalno',25),(342,'Tęcza Bolesławice',25),(343,'LKS Piorowice Świdnickie',25),(344,'LKS Gola Świdnickie',25),(345,'Gryf Burkatów',25),(346,'Orzeł Witoszów Dolny',25),(347,'LKS Błękitni Komorów',26),(348,'Wierzbianka Wierzbna',26),(349,'Wieża Rudnicka',26),(350,'Błękitni Owiesno',26),(351,'Przedborowianka',26),(352,'Czarni Sieniawka',26),(353,'Sparta Oleszna',26),(354,'LKS Orzeł Piława Dolna',26),(355,'Victoria Tuszyn',26),(356,'Płomień Sokolniki',26),(357,'Boxmet Piskorzów',26),(358,'Henrykowianka Henryków',26),(359,'Niemczanka Niemcza',26),(360,'Koliber Uciechów',26),(361,'Niemczanka Niemcza',26),(362,'Cukrownik II Pszenno',26),(363,'Zamek II Kamieniec Ząbkowicki',27),(364,'Victoria Dębowiec',27),(365,'Inter Ożary',27),(366,'GLKS Orlęta II Krosnowice',27),(367,'KS Sokół Starczów',27),(368,'Błękitni Niedźwiedź',27),(369,'Perła Płonica',27),(370,'Spartakus Byczeń',27),(371,'Piasek Potworów',27),(372,'CIS Brzeźnica',27),(373,'Czarni Braszowice',27),(374,'Znicz Lubnów',27),(375,'Śnieżnik II Domaszków',28),(376,'Granica Tłumaczów',28),(377,'Kryształ II Stronie Śląskie',28),(378,'WLKS Wambierzyce',28),(379,'KS Ludwikowice',28),(380,'Łomniczanka Stara Łomnica',28),(381,'Zamek Gorzanów',28),(382,'Zrzeszeni N-W-CH Niwa',28),(383,'Lechia Ołdrzycowice',28),(384,'Czermna Kudowa Zdrój',28),(385,'Odrodzenie Szalejów Dolny',28),(386,'Sudety Międzylesie',28),(387,'LKS Bierkowice',28),(388,'Hutnik Szczytna',28),(389,'Zdrój Jedlina Zdrój',29),(390,'MLKS Radków',29),(391,'Szkółka Piłkarska Szczyt Boguszów-Gorce',29),(392,'Skałki Stolec',29),(393,'Delta Słupice',29),(394,'Ignerhome MKS Polonia-Stal Świdnica',29),(395,'LKS Bystrzyca Górna',29),(396,'Zjednoczeni Żarów',29),(397,'Lechia II Dzierżoniów',29),(398,'Kryształ Stronie Śląskie',29),(399,'Zamek Kamieniec Ząbkowicki',29),(400,'Włókniarz Głuszyca',29),(401,'Karolina Jaworzyna Śląska',29),(402,'Górnik NM Wałbrzych',29),(403,'Bielawianka Bielawa',29),(404,'Pogoń Pieszyce',29),(405,'Parasol Wrocław',30),(406,'Osiek',30),(407,'LKS Ciechów',30),(408,'Mechanik Brzezina',30),(409,'Odra Lubiąż',30),(410,'KP Kąty Wrocławskie',30),(411,'Zorza Pęgów',30),(412,'Błyskawica Lenartowice',30),(413,'Polonia II Środa Śląska',30),(414,'Tomtex Widawa Wrocław',30),(415,'STS Sokół Smolec',30),(416,'Sparta Miłcz',30),(417,'Polonia Wrocław',30),(418,'Maślice Wrocław',30),(419,'Zieloni Rakoszyce',30),(420,'Zorza Wilkszyn',30),(421,'Barycz Milicz',31),(422,'Bór Oborniki Śląskie',31),(423,'Perła Węgrów',31),(424,'LKS Krzyżanowice',31),(425,'GKS Polonia II Trzebnica',31),(426,'Orzeł Prusice',31),(427,'KS Krośnica Wielka',31),(428,'Dolpasz Skokowa',31),(429,'Olimpia Bukowina',31),(430,'Sokół Wielka Lipa',31),(431,'Lotnik Twardogóra',31),(432,'Barycz II Sułów',31),(433,'Sparta Wszemirów',31),(434,'Pogoń Cieszków',31),(435,'Wiwa Goszcz',31),(436,'Plon Gądkowice',31),(437,'Czarni Chrząstawa',32),(438,'Dąb Dobroszyce',32),(439,'Długołęka 2000',32),(440,'KS Gręboszyce',32),(441,'Różanka Wrocław',32),(442,'KS Semafor Brochów',32),(443,'LKS Skra Wojnowice',32),(444,'MKP Wratislavia',32),(445,'Pogoń Oleśnica',32),(446,'Polonia Miłoszyce',32),(447,'WKS Wilczyce',32),(448,'Widawa Bierutów',32),(449,'Widawa Kiełczów',32),(450,'AP Oleśnica',32),(451,'Czarni Jelcz Laskowice',32),(452,'ZKS Polar Wrocław',32),(453,'GKS Kobierzyce',33),(454,'Burza Bystrzyca',33),(455,'Polonia Jaszowice',33),(456,'Ślęża Sobótka',33),(457,'Energetyk Siechnice',33),(458,'Zorza Zabardowice',33),(459,'Indata Software Sparta Wrocław',33),(460,'Korona Osiek',33),(461,'KP Kobierzyce',33),(462,'Solna',33),(463,'KS Żórawina',33),(464,'LKS Brożec',33),(465,'Rapid Domaniów',33),(466,'Esthetic Ludów Śląski',33),(467,'Polonia II Bielany Wrocławskie',33),(468,'Stary Śleszów',33),(469,'AKS Krzydlina Mała',34),(470,'Dolpasz II Skokowa',34),(471,'Lech Barokowo',34),(472,'Kometa Krzelów',34),(473,'KS Brzeg Dolny',34),(474,'KS Piotrkowice',34),(475,'Dąb Kuraszków',34),(476,'KS Pogoń Wińsko',34),(477,'Odra Uraz',34),(478,'Olimpia Godzięcin',34),(479,'Bresna Brzeźno',34),(480,'Ruch Warzęgowo',34),(481,'Victoria Orzeszków',34),(482,'Zryw Głębowice',34),(483,'Sparta Górka',35),(484,'Błękitni Pawłów Trzebnicki',35),(485,'Piast III Żmigród',35),(486,'Orkan Borzęcin',35),(487,'KS Płomień Brzyków',35),(488,'KS Łazy',35),(489,'Masłowia Masłów',35),(490,'Orla Korzeńsko',35),(491,'Pirania Radziądz',35),(492,'UKS Postolin',35),(493,'Sokół Kaszowo',35),(494,'Sokół Ujeździec Mały',35),(495,'Sokół Ujeździec Wielki',35),(496,'AP Oleśnica',36),(497,'KS II Łozina',36),(498,'Burza Godzieszowa',36),(499,'Dąb Pruszowice',36),(500,'Grom Szczodrów',36),(501,'Iskra Pasikurowice',36),(502,'KS Boguszyce Osiedle',36),(503,'Dobroszów',36),(504,'Piast Dobrzeń',36),(505,'Pogoń Syców',36),(506,'Polonia Grabowno Wielkie',36),(507,'Sokół Sokołowice',36),(508,'Widawa Stradomia',36),(509,'Sparta II Będkowo',36),(510,'Błękitni Krzeczyn',37),(511,'Burza Dębina',37),(512,'GKS Dziadowa Kłoda',37),(513,'Borowianka Borowa',37),(514,'Zbytowa',37),(515,'LZS Solniki Małe',37),(516,'Śliwice',37),(517,'GKS Mirków II Długołęka',37),(518,'Piast Nadolice',37),(519,'WKS Ligota Wielka',37),(520,'KS Invest-House Minkowice Oławskie',37),(521,'WKS Kątna',37),(522,'Zalesie Wójcice',37),(523,'Błękitni Siedlce',38),(524,'Szaluna Zębice',38),(525,'Jankowianka Wierzbno',38),(526,'Lotos Gaj Oławski',38),(527,'MKS Siechnice',38),(528,'Odra Kotowice',38),(529,'Orzeł Święta Katarzyna',38),(530,'Czarni Sobocisko',38),(531,'Sokół II Marcinkowice',38),(532,'Zorza Niemil',38),(533,'Burza-Dombud Chwalibożyce',38),(534,'MKGS Moto-Jelcz II Oława',38),(535,'Pol-Mont Polonia Godzikowice',39),(536,'Feniks Pławna',39),(537,'Gromnik Kuropatnik',39),(538,'Iskra Janówek',39),(539,'Borek Strzeliński',39),(540,'KS Kurów',39),(541,'Kwarcyt Jegłowa',39),(542,'Klub Sportowy Strzelinianka II Strzelin',39),(543,'Czarni Kondratowice',39),(544,'Nefryt Jordanów Śląski',39),(545,'Ognisko Przeworno',39),(546,'UKS Lider Borów',39),(547,'Starter Orzeł Biały Kościół',39),(548,'Świteź Wiązów',39),(549,'Zryw Chociwel',39),(550,'GLKS Mietków',40),(551,'KP Kąty Wrocławskie',40),(552,'KP Kobierzyce',40),(553,'KS Magnice',40),(554,'KS Piotrowice',40),(555,'LZS Osiek',40),(556,'LKS Sadków',40),(557,'Orzeł Sadowice',40),(558,'Sokół II Smolec',40),(559,'Sparta Pustków Żurawski',40),(560,'Zachód Sobótka',40),(561,'Zieloni Wilczkowice',40),(562,'KS Gniechowice',41),(563,'KS Rogów Sobócki',41),(564,'KS Piotrowice',41),(565,'Orzeł Sadowice',41),(566,'KP II Kobierzyce',41),(567,'KP II Kąty Wrocławskie',41),(568,'GLKS Mietków',41),(569,'Polonia Jaksonów',41),(570,'Zachód Sobótka',41),(571,'Wicher Domasław',41),(572,'Zieloni Wilczkowice',41),(573,'Tarant Krzyżowice',41),(574,'KS Magnice',41),(575,'KS Sparta Pustków Żurawski',41),(576,'LKS Sadków',41),(577,'Błyskawica Szewce',42),(578,'Karłowice Wrocław',42),(579,'MKS Sołtysowice',42),(580,'Indata Software Sparta II Wrocław',42),(581,'PKS Augustyn',42),(582,'Płomień Wisznia Mała',42),(583,'Grom Kryniczno-Ligota Piękna',42),(584,'1 KS Ślęża II Wrocław',42),(585,'Tomtex Widawa II Wrocław',42),(586,'Silesia Szymanów',42),(587,'MKP II Wratislavia',42),(588,'Vamos Wrocław',42),(589,'Unia Wrocław',42),(590,'Mundurowi Wrocław',42),(591,'WKS Wierzbice',43),(592,'Sparta Będkowo',43),(593,'Polonia Bielany Wrocławskie',43),(594,'OKS Orzeł Pawłowice',43),(595,'Orzeł Marszowice',43),(596,'Piast Lutyna',43),(597,'Piast Żerniki-Wrocław',43),(598,'KS Łozina',43),(599,'Błysk Kuźniczysko',43),(600,'KS Rokita 1946 Brzeg Dolny',43),(601,'MKP Wołów',43),(602,'Sokół Marcinkowice',43),(603,'Fundacja Zenit Miedzybórz',43),(604,'Piast II Żmigród',43),(605,'Klub Sportowy Strzelinianka Strzelin',43),(606,'GKS Polonia Trzebnica',43);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-06 11:01:46
