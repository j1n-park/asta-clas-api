-- MySQL dump 10.16  Distrib 10.1.13-MariaDB, for osx10.11 (x86_64)
--
-- Host: 127.0.0.1    Database: astabio
-- ------------------------------------------------------
-- Server version	10.1.21-MariaDB-1~jessie

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bacteria`
--

DROP TABLE IF EXISTS `Bacteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bacteria` (
  `Bac_ID` varchar(100) NOT NULL,
  `Genus` varchar(25) DEFAULT NULL,
  `Species` varchar(25) DEFAULT NULL,
  `Strain` varchar(100) DEFAULT NULL,
  `Exp_Desc` varchar(200) DEFAULT NULL,
  `Inner_DB` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Bac_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bacteria`
--

LOCK TABLES `Bacteria` WRITE;
/*!40000 ALTER TABLE `Bacteria` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bacteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Peaks`
--

DROP TABLE IF EXISTS `Peaks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Peaks` (
  `P_ID` varchar(100) NOT NULL,
  `Bac_ID` varchar(100) NOT NULL,
  `MZ` double DEFAULT NULL,
  `Rel_Intensity` double DEFAULT NULL,
  `Intensity` double DEFAULT NULL,
  `No` int(4) DEFAULT NULL,
  `SNR` double DEFAULT NULL,
  PRIMARY KEY (`P_ID`),
  KEY `Bac_ID` (`Bac_ID`),
  CONSTRAINT `PEAK_INFO_ibfk_1` FOREIGN KEY (`Bac_ID`) REFERENCES `BACTERIA` (`Bac_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Peaks`
--

LOCK TABLES `Peaks` WRITE;
/*!40000 ALTER TABLE `Peaks` DISABLE KEYS */;
/*!40000 ALTER TABLE `Peaks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-02 16:13:01
