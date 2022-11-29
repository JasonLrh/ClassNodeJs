DROP DATABASE IF EXISTS `self_studyroom`;
CREATE DATABASE `self_studyroom`;
USE `self_studyroom`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `room`
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `roomno` char(10) NOT NULL,
  `classno` char(5) NOT NULL,
  `price` int(7) NOT NULL,
  
  `state` varchar(20) NOT NULL,
  `siteno` char(10) NOT NULL,
  PRIMARY KEY (`roomno`),
  KEY `ScoreFK2` (`classno`),
  KEY `ScoreFK3` (`siteno`),
  CONSTRAINT `roomFK2` FOREIGN KEY (`classno`) REFERENCES `roomclass` (`classno`),
  CONSTRAINT `roomFK3` FOREIGN KEY (`siteno`) REFERENCES `roomsite` (`siteno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('A01', 'C001', '5', '空闲','P001');
INSERT INTO `room` VALUES ('A02', 'C002', '5',  '空闲','P001');
INSERT INTO `room` VALUES ('A03', 'C001', '5',   '空闲','P001');
INSERT INTO `room` VALUES ('A04', 'C003', '8',  '空闲','P002');
INSERT INTO `room` VALUES ('A05', 'C003', '15',  '空闲','P005');
INSERT INTO `room` VALUES ('A06', 'C002', '12', '空闲','P004');
INSERT INTO `room` VALUES ('A07', 'C003', '10',  '空闲','P003');
INSERT INTO `room` VALUES ('A08', 'C002', '12',  '空闲','P004');
INSERT INTO `room` VALUES ('A09', 'C003', '8',   '空闲','P002');
INSERT INTO `room` VALUES ('A10', 'C001', '5',    '空闲','P001');
INSERT INTO `room` VALUES ('A11', 'C003', '10',   '空闲','P003');
INSERT INTO `room` VALUES ('A12', 'C003', '15', '空闲','P005');
INSERT INTO `room` VALUES ('A13', 'C005', '5', '空闲','P001');
INSERT INTO `room` VALUES ('A14', 'C003', '5',  '空闲','P001');
INSERT INTO `room` VALUES ('A15', 'C003', '8',  '空闲','P002');

-- ----------------------------
-- Table structure for `roomclass`
-- ----------------------------
DROP TABLE IF EXISTS `roomclass`;
CREATE TABLE `roomclass` (
  `classno` char(6) NOT NULL,
  `classname` varchar(20) NOT NULL,
  PRIMARY KEY (`classno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roomclass
-- ----------------------------
INSERT INTO `roomclass` VALUES ('C001', '单间');
INSERT INTO `roomclass` VALUES ('C002', '双人间');
INSERT INTO `roomclass` VALUES ('C003', '朗读背诵');
INSERT INTO `roomclass` VALUES ('C004', '靠窗区');
INSERT INTO `roomclass` VALUES ('C005', '沉浸区');

-- ----------------------------
-- Table structure for `apply`
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `phone` char(20) NOT NULL,
  `roomno` varchar(10) NOT NULL,
  `startdate` date NOT NULL,
  `st` TIME NOT NULL,
  `et` TIME NOT NULL,
  `cost` char(10) DEFAULT NULL,
  PRIMARY KEY (`phone`,`roomno`,`startdate`),
  KEY `applyFK2` (`phone`),
  KEY `applyFK3` (`roomno`),
  CONSTRAINT `applyFK2` FOREIGN KEY (`phone`) REFERENCES `information` (`phone`),
  CONSTRAINT `applyFK3` FOREIGN KEY (`roomno`) REFERENCES `room` (`roomno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------
INSERT INTO `apply` VALUES ('11234678812', 'A01', '2022-11-29', '10:00:00', '11:00:00','5');
INSERT INTO `apply` VALUES ('11234678812', 'A03', '2022-11-30', '10:00:00', '11:00:00','5');
INSERT INTO `apply` VALUES ('11234678812', 'A05', '2022-12-01', '11:00:00', '12:00:00','15');
INSERT INTO `apply` VALUES ('11234678812', 'A10', '2022-12-02', '09:00:00', '11:00:00','10');
INSERT INTO `apply` VALUES ('11234678912', 'A01', '2022-12-01', '07:00:00', '09:00:00','10');
INSERT INTO `apply` VALUES ('11234678912', 'A03', '2022-12-02', '10:00:00', '12:00:00','10');
INSERT INTO `apply` VALUES ('11234678912', 'A06', '2022-12-03', '07:00:00', '09:00:00','24');
INSERT INTO `apply` VALUES ('11234678912', 'A07', '2022-12-04', '08:00:00', '09:00:00','10');
INSERT INTO `apply` VALUES ('11234678912', 'A10', '2022-12-05', '08:00:00', '09:00:00','5');
INSERT INTO `apply` VALUES ('11234678912', 'A10', '2022-12-06', '08:00:00', '09:00:00','5');
INSERT INTO `apply` VALUES ('11234678912', 'A13', '2022-12-07', '09:00:00', '10:00:00','5');
INSERT INTO `apply` VALUES ('12234678912', 'A05', '2022-11-29', '09:00:00', '11:00:00','30');
INSERT INTO `apply` VALUES ('13234678912', 'A01', '2022-12-03', '09:00:00', '10:00:00','5');
INSERT INTO `apply` VALUES ('13234678912', 'A01', '2022-12-04', '09:00:00', '11:00:00','10');
INSERT INTO `apply` VALUES ('13234678912', 'A07', '2022-12-05', '07:00:00', '09:00:00','20');
INSERT INTO `apply` VALUES ('13234678912', 'A08', '2022-12-06', '09:00:00', '10:00:00','12');
INSERT INTO `apply` VALUES ('13234678912', 'A10', '2022-12-07', '09:00:00', '10:00:00','5');
INSERT INTO `apply` VALUES ('11204678912', 'A01', '2022-11-29', '08:00:00', '10:00:00','10');
INSERT INTO `apply` VALUES ('11204678912', 'A07', '2022-11-30', '07:00:00', '09:00:00','20');
INSERT INTO `apply` VALUES ('11204678912', 'A08', '2022-12-01', '08:00:00', '09:00:00','12');
INSERT INTO `apply` VALUES ('11204678912', 'A10', '2022-12-02', '08:00:00', '09:00:00','5');
INSERT INTO `apply` VALUES ('11204678912', 'A13', '2022-12-02', '13:00:00', '14:00:00','5');
INSERT INTO `apply` VALUES ('11294678912', 'A04', '2022-11-29', '08:00:00', '10:00:00','16');
INSERT INTO `apply` VALUES ('11294678912', 'A07', '2022-11-30', '10:00:00', '11:00:00','10');
INSERT INTO `apply` VALUES ('11244678912', 'A01', '2022-11-29', '10:00:00', '11:00:00','5');
INSERT INTO `apply` VALUES ('11244678912', 'A01', '2022-11-30', '08:00:00', '10:00:00','10');
INSERT INTO `apply` VALUES ('11244678912', 'A05', '2022-12-01', '07:00:00', '10:00:00','45');
INSERT INTO `apply` VALUES ('11244678912', 'A07', '2022-12-02', '10:00:00', '12:00:00','20');
INSERT INTO `apply` VALUES ('11244678912', 'A07', '2022-12-03', '08:00:00', '10:00:00','20');
INSERT INTO `apply` VALUES ('11244678912', 'A08', '2022-12-04', '09:00:00', '10:00:00','12');
INSERT INTO `apply` VALUES ('11244678912', 'A09', '2022-12-04', '14:00:00', '15:00:00','8');
INSERT INTO `apply` VALUES ('11244678912', 'A10', '2022-12-05', '09:00:00', '10:00:00','5');
INSERT INTO `apply` VALUES ('11244678912', 'A11', '2022-12-06', '07:00:00', '09:00:00','20');
-- INSERT INTO `apply` VALUES ('11244678912', 'A11', '2022-12-06', '15:00:00', '16:00:00','10');
-- INSERT INTO `apply` VALUES ('11244678912', 'A11', '2022-12-06', '19:00:00', '20:00:00','10');
INSERT INTO `apply` VALUES ('11244678912', 'A11', '2022-12-07', '10:00:00', '11:00:00','10');
INSERT INTO `apply` VALUES ('11244678912', 'A12', '2022-12-07', '14:00:00', '15:00:00','30');
INSERT INTO `apply` VALUES ('11244678912', 'A13', '2022-12-07', '18:00:00', '21:00:00','15');

-- ----------------------------
-- Table structure for `roomsite`
-- ----------------------------
DROP TABLE IF EXISTS `roomsite`;
CREATE TABLE `roomsite` (
  `siteno` char(4) NOT NULL,
  `sitename` varchar(20) NOT NULL,
  PRIMARY KEY (`siteno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roomsite
-- ----------------------------
INSERT INTO `roomsite` VALUES ('P001', '武汉青山');
INSERT INTO `roomsite` VALUES ('P002', '重庆二仙桥');
INSERT INTO `roomsite` VALUES ('P003', '上海虹桥');
INSERT INTO `roomsite` VALUES ('P004', '杭州西湖');
INSERT INTO `roomsite` VALUES ('P005', '总部');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `phone` char(20) NOT NULL,
  `username` varchar(8) NOT NULL,
  `sex` varchar(2) NOT NULL,
  `identifycard` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `balance` char(10) DEFAULT NULL,
  
  PRIMARY KEY (`phone`),
  KEY `userFK2` (`phone`),
  CONSTRAINT `ScoreFK2` FOREIGN KEY (`phone`) REFERENCES `information` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('11234618912', '陈辉',     '男', '010207199111014200',  '50');
INSERT INTO `user` VALUES ('11234678812', '张小娟', '女', '332712199301014000', '30');
INSERT INTO `user` VALUES ('11234678912', '刘凤',     '女', '312734199203121000',  '20');
INSERT INTO `user` VALUES ('12234678912', '高代鹏', '男', '412703199005223000',  '80');
INSERT INTO `user` VALUES ('13234678912', '张露' ,    '女', '112708199002098000',  '80');
INSERT INTO `user` VALUES ('11204678912', '喻自强' ,'男', '360102199304241000',  '20');
INSERT INTO `user` VALUES ('11294678912', '张晓梅', '女', '360102199412112000',  '20');
INSERT INTO `user` VALUES ('11244678912', '张良',    '男', '412701199510014000',  '80');
INSERT INTO `user` VALUES ('11238678912', '张良2',  '男', '412701199610014000',  '80');

-- ----------------------------
-- Table structure for `information`
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
`phone` char(20) NOT NULL,
`password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '111111',
PRIMARY KEY (`phone`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES ('11234618912','123456a');
INSERT INTO `information` VALUES ('11234678812','123456a');
INSERT INTO `information` VALUES ('11234678912','123456a');
INSERT INTO `information` VALUES ('12234678912','123456a');
INSERT INTO `information` VALUES ('13234678912','123456a');
INSERT INTO `information` VALUES ('11204678912','123456a');
INSERT INTO `information` VALUES ('11294678912','123456a');
INSERT INTO `information` VALUES ('11244678912','123456a');
INSERT INTO `information` VALUES ('11238678912','123456a');

