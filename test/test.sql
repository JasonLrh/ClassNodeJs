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
INSERT INTO `room` VALUES ('B201501001', 'C001', '10', '空闲','P001');
INSERT INTO `room` VALUES ('B201501002', 'C002', '9',  '空闲','P001');
INSERT INTO `room` VALUES ('B201501003', 'C001', '5',   '空闲','P001');
INSERT INTO `room` VALUES ('B201503001', 'C003', '65',  '空闲','P002');
INSERT INTO `room` VALUES ('B201503002', 'C003', '45',  '空闲','P005');
INSERT INTO `room` VALUES ('B201506001', 'C002', '76', '空闲','P004');
INSERT INTO `room` VALUES ('B201601001', 'C003', '57',  '空闲','P003');
INSERT INTO `room` VALUES ('B201601002', 'C002', '67',  '空闲','P004');
INSERT INTO `room` VALUES ('B201601003', 'C003', '5',   '空闲','P002');
INSERT INTO `room` VALUES ('B201601004', 'C001', '6',    '空闲','P001');
INSERT INTO `room` VALUES ('B201603001', 'C003', '7',   '空闲','P003');
INSERT INTO `room` VALUES ('B201603003', 'C003', '65', '空闲','P005');
INSERT INTO `room` VALUES ('B201603004', 'C005', '78', '空闲','P001');
INSERT INTO `room` VALUES ('B201605001', 'C003', '76',  '空闲','P001');
INSERT INTO `room` VALUES ('B201605002', 'C003', '67',  '空闲','P002');

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
INSERT INTO `roomclass` VALUES ('C001', '经济类');
INSERT INTO `roomclass` VALUES ('C002', '外语类');
INSERT INTO `roomclass` VALUES ('C003', '计算机类');
INSERT INTO `roomclass` VALUES ('C004', '数学类');
INSERT INTO `roomclass` VALUES ('C005', '文学类');

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
INSERT INTO `apply` VALUES ('11234678812', 'B201501001', '2022-11-29', '10:00:00', '11:00:00',null);
INSERT INTO `apply` VALUES ('11234678812', 'B201501003', '2022-11-29', '10:00:00', '11:00:00',null);
INSERT INTO `apply` VALUES ('11234678812', 'B201503002', '2022-11-29', '07:00:00', '12:00:00','50');
INSERT INTO `apply` VALUES ('11234678812', 'B201601004', '2022-11-29', '09:00:00', '11:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201501001', '2022-11-29', '07:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201501003', '2022-11-29', '10:00:00', '12:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201506001', '2022-11-29', '07:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201601001', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201601004', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201601004', '2022-11-30', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11234678912', 'B201603004', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('12234678912', 'B201503002', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('13234678912', 'B201501001', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('13234678912', 'B201501001', '2022-11-30', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('13234678912', 'B201601001', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('13234678912', 'B201601002', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('13234678912', 'B201601004', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11204678912', 'B201501001', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11204678912', 'B201601001', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11204678912', 'B201601002', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11204678912', 'B201601004', '2022-11-29', '09:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11204678912', 'B201603004', '2022-11-29', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11294678912', 'B201503001', '2022-11-29', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11294678912', 'B201601001', '2022-11-29', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201501001', '2022-11-29', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201501001', '2022-11-30', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201503002', '2022-11-29', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201601001', '2022-11-29', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201601001', '2022-11-30', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201601002', '2022-11-29', '09:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201601003', '2022-11-29', '09:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201601004', '2022-11-29', '09:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201603001', '2022-11-29', '07:00:00', '09:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201603001', '2022-11-30', '09:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201603001', '2022-11-28', '09:00:00', '07:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201603001', '2022-12-01', '10:00:00', '10:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201603003', '2022-11-29', '10:00:00', '12:00:00','50');
INSERT INTO `apply` VALUES ('11244678912', 'B201603004', '2022-11-29', '07:00:00', '10:00:00','50');

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

