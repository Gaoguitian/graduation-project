/*
 Navicat Premium Data Transfer

 Source Server         : 电子书下载网
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : book

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 21/06/2021 15:59:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `com1` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`com1`)
) ENGINE=InnoDB AUTO_INCREMENT=540 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (416, 1559, '东方月初1', '31231');
INSERT INTO `comment` VALUES (417, 1559, '东方月初1', '123');
INSERT INTO `comment` VALUES (453, 458, '东方月初1', '21313');
INSERT INTO `comment` VALUES (492, 1561, '东方月初1', '123');
INSERT INTO `comment` VALUES (493, 1561, '东方月初1', '123');
INSERT INTO `comment` VALUES (498, 1561, '东方月初1', '211');
INSERT INTO `comment` VALUES (499, 506, '东方月初1', '21');
INSERT INTO `comment` VALUES (500, 535, '东方月初1', '111');
INSERT INTO `comment` VALUES (502, 512, '东方月初1', '122');
INSERT INTO `comment` VALUES (538, 513, '东方月初1', '1231');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
