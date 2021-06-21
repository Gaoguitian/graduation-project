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

 Date: 21/06/2021 15:58:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sort` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sort
-- ----------------------------
BEGIN;
INSERT INTO `sort` VALUES (1, '历史传记', NULL, NULL);
INSERT INTO `sort` VALUES (2, '经济管理', NULL, NULL);
INSERT INTO `sort` VALUES (3, '小说文学', NULL, NULL);
INSERT INTO `sort` VALUES (4, '励志成功', NULL, NULL);
INSERT INTO `sort` VALUES (5, '人文社科', NULL, NULL);
INSERT INTO `sort` VALUES (6, '生活时尚', NULL, NULL);
INSERT INTO `sort` VALUES (7, '学习教育', NULL, NULL);
INSERT INTO `sort` VALUES (8, '英文原版', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
