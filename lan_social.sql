-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lan-social
-- ------------------------------------------------------
-- Server version	5.6.21

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `newsfeed_id` char(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` mediumtext,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_newsfeed_id_idx` (`newsfeed_id`),
  CONSTRAINT `fk_newsfeed_id` FOREIGN KEY (`newsfeed_id`) REFERENCES `newsfeed` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends_list`
--

DROP TABLE IF EXISTS `friends_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends_list` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `friend_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`list_id`),
  KEY `fk_user_idx` (`user_id`),
  KEY `fk_friend_id_idx` (`friend_id`),
  CONSTRAINT `fk_friend_id` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends_list`
--

LOCK TABLES `friends_list` WRITE;
/*!40000 ALTER TABLE `friends_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_list`
--

DROP TABLE IF EXISTS `genre_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre_list` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_list`
--

LOCK TABLES `genre_list` WRITE;
/*!40000 ALTER TABLE `genre_list` DISABLE KEYS */;
INSERT INTO `genre_list` VALUES (0,'Action'),(1,'FPS'),(2,'RPG'),(3,'Strategy'),(4,'Platformer'),(5,'MMORPG'),(6,'CoOp'),(7,'JRPG');
/*!40000 ALTER TABLE `genre_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zip` char(5) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `zip_UNIQUE` (`zip`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'60510','41.8383772','-88.3530747'),(2,'60174','41.9169525','-88.29476749999999'),(3,'60554','41.77026070000001','-88.4597673');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `message` varchar(150) NOT NULL,
  `sent` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sender_idx` (`sender`),
  KEY `fk_receiver_idx` (`receiver`),
  CONSTRAINT `fk_receiver` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sender` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsfeed`
--

DROP TABLE IF EXISTS `newsfeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsfeed` (
  `id` char(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `message` mediumtext NOT NULL,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_userID_idx` (`user_id`),
  CONSTRAINT `fk_userID` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsfeed`
--

LOCK TABLES `newsfeed` WRITE;
/*!40000 ALTER TABLE `newsfeed` DISABLE KEYS */;
INSERT INTO `newsfeed` VALUES ('sr7117',21,'2016-04-09 15:02:50','But I hate rocks...',0),('zqQd0W',21,'2016-04-09 15:02:35','I love flying..',0);
/*!40000 ALTER TABLE `newsfeed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owned_games`
--

DROP TABLE IF EXISTS `owned_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owned_games` (
  `id` char(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `summary` text NOT NULL,
  `title` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owned_games`
--

LOCK TABLES `owned_games` WRITE;
/*!40000 ALTER TABLE `owned_games` DISABLE KEYS */;
INSERT INTO `owned_games` VALUES ('123',5,'cool','Banjo Kazooie');
/*!40000 ALTER TABLE `owned_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `user_id` int(11) NOT NULL,
  `user_avatar` varchar(150) DEFAULT NULL,
  `user_genres` int(11) NOT NULL DEFAULT '0',
  `owned_games` char(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`user_genres`),
  KEY `owned-games-fk_idx` (`owned_games`),
  CONSTRAINT `owned-games-fk` FOREIGN KEY (`owned_games`) REFERENCES `owned_games` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user-id-fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (20,'https://octodex.github.com/images/stormtroopocat.jpg',0,NULL),(21,'http://img06.deviantart.net/fab7/i/2015/173/9/a/crobat_by_remember2fly1-d8y9zoq.png',0,NULL),(22,'https://img0.etsystatic.com/060/0/10163260/il_340x270.749795582_6zpn.jpg',0,NULL),(23,'https://img0.etsystatic.com/060/0/10163260/il_340x270.749795582_6zpn.jpg',0,NULL);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `session` varchar(64) NOT NULL,
  `api_key` varchar(64) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_status_idx` (`status`),
  KEY `location_id_fk_idx` (`location_id`),
  CONSTRAINT `location_fk` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'rnice4christ','03d194eb46776348d8ce86d2dd4efca6b4941c6c','rnice@christ.com',NULL,0,'8c6df644d71ae43bdfc85cb47ce14ba925ea89d6','',1),(21,'crobat','0343ae4af25ceb55c0704d3ab8252c48bd0b930e','crobat@crobat.com',NULL,1,'8a81988cb064393231207c404c7ff6f3417fe60e','011f8abbd81db82f66d8f3fad334dc8f35f5c96e',2),(22,'bnice','f1de74b78a0cbbdb206db5d88c0aaca9a1c6d87b','b@nice.com',NULL,0,'173b873c4550f8ce40bd7fc653871374a1b9319d','',1),(23,'Genji','f1956edc88b7eb0e90fd0b56c672f82a9c35cc9b','genji@assassins.com',NULL,0,'92cc22f3c543d468bef16d8c3d8e61b763aae9d4','',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-15  0:49:07
