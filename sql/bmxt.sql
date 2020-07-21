/*
 Navicat Premium Data Transfer

 Source Server         : jspStudy
 Source Server Type    : MySQL
 Source Server Version : 50547
 Source Host           : localhost:3306
 Source Schema         : bmxt

 Target Server Type    : MySQL
 Target Server Version : 50547
 File Encoding         : 65001

 Date: 21/07/2020 17:56:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `Aid` int(11) NOT NULL AUTO_INCREMENT,
  `Aname` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Apwd` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Aid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '123');
INSERT INTO `admin` VALUES (2, 'root', '123');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `Cid` int(11) NOT NULL AUTO_INCREMENT,
  `Cname` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '科目名称',
  `Callgrade` int(11) NOT NULL COMMENT '总分',
  PRIMARY KEY (`Cid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '大学英语', 100);
INSERT INTO `course` VALUES (2, 'C语言', 100);
INSERT INTO `course` VALUES (3, '离散数学', 100);
INSERT INTO `course` VALUES (4, '教育学', 100);
INSERT INTO `course` VALUES (5, '工程力学', 100);
INSERT INTO `course` VALUES (6, '会计学原理', 100);
INSERT INTO `course` VALUES (7, '市场营销学通论', 100);

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `Sid` int(11) NOT NULL,
  `Cid` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  PRIMARY KEY (`Sid`, `Cid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (202001, 1, 85);
INSERT INTO `grade` VALUES (202001, 2, 74);
INSERT INTO `grade` VALUES (202001, 3, 68);
INSERT INTO `grade` VALUES (202002, 1, 78);
INSERT INTO `grade` VALUES (202002, 4, 70);
INSERT INTO `grade` VALUES (202003, 1, 72);
INSERT INTO `grade` VALUES (202003, 6, 80);
INSERT INTO `grade` VALUES (202004, 1, 65);
INSERT INTO `grade` VALUES (202004, 7, 87);
INSERT INTO `grade` VALUES (202005, 1, 89);
INSERT INTO `grade` VALUES (202005, 2, 87);
INSERT INTO `grade` VALUES (202005, 3, 68);
INSERT INTO `grade` VALUES (202011, 1, 76);
INSERT INTO `grade` VALUES (202011, 5, 84);
INSERT INTO `grade` VALUES (202012, 1, 68);
INSERT INTO `grade` VALUES (202012, 4, 72);
INSERT INTO `grade` VALUES (202013, 1, 65);
INSERT INTO `grade` VALUES (202013, 4, 90);
INSERT INTO `grade` VALUES (202014, 1, 90);
INSERT INTO `grade` VALUES (202014, 2, 90);
INSERT INTO `grade` VALUES (202014, 3, 90);
INSERT INTO `grade` VALUES (202020, 1, 49);
INSERT INTO `grade` VALUES (202020, 2, 80);
INSERT INTO `grade` VALUES (202020, 3, 81);
INSERT INTO `grade` VALUES (202021, 1, 66);
INSERT INTO `grade` VALUES (202021, 5, 90);

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major`  (
  `mid` int(11) NOT NULL AUTO_INCREMENT COMMENT '专业id',
  `mname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '专业名称',
  `cids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '课程 id 使用 , 分割',
  PRIMARY KEY (`mid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3006 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of major
-- ----------------------------
INSERT INTO `major` VALUES (3001, '计算机科学与技术', '1,2,3');
INSERT INTO `major` VALUES (3002, '会计', '1,6');
INSERT INTO `major` VALUES (3003, '学前教育', '1,4');
INSERT INTO `major` VALUES (3004, '土木工程', '1,5');
INSERT INTO `major` VALUES (3005, '市场营销', '1,7');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `Nid` int(11) NOT NULL AUTO_INCREMENT COMMENT '通告编号',
  `Aid` int(11) NOT NULL COMMENT '管理员id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '内容',
  `time` date NOT NULL COMMENT '发布日期',
  PRIMARY KEY (`Nid`, `Aid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, 1, '2019专升本考试报名通知', '2019年6月22日举行，现将报名有关事项通知如下：\r\n\r\n一、报名对象\r\n\r\n1、专科应届毕业生\r\n\r\n2019年湖北省普通高校普通全日制高职高专应届毕业生，包括普通本科院\r\n\r\n校、独立设置的高职高专院校、独立学院以及成人高校举办的普通全日制高职高专应届毕业生。\r\n2019年6月22日举行，现将报名有关事项通知如下：\r\n\r\n一、报名对象\r\n\r\n1、专科应届毕业生\r\n\r\n2019年湖北省普通高校普通全日制高职高专应届毕业生，包括普通本科院\r\n\r\n校、独立设置的高职高专院校、独立学院以及成人高校举办的普通全日制高职高专应届毕业生。\r\n', '2019-06-03');
INSERT INTO `notice` VALUES (2, 1, '专升本招生简章', '招生范围及对象\r\n\r\n2019年湖北省普通高校普通全日制高职高专应届毕业生，包括普通本科院校、独立设置的高职高专院校、独立学院以及成人高校举办的普通全日制高职高专应届毕业生。\r\n', '2019-06-11');
INSERT INTO `notice` VALUES (3, 2, '专升本新生入学通知', '一、“专升本”(含专本联合培养)预录取新生凭身份证和专科毕业证于2019年8月31日—9月1日到所归属教学院(具体地点见下表)领取预录取通知书并办理入学手续、党、团员组织关系转入手续、档案迁入手续（“专升本”学生自己负责将档案迁入我校）。\r\n', '2019-07-20');

-- ----------------------------
-- Table structure for process
-- ----------------------------
DROP TABLE IF EXISTS `process`;
CREATE TABLE `process`  (
  `Sid` int(11) NOT NULL,
  `apply` int(11) NULL DEFAULT 0 COMMENT '报名（0未提交报名申请，1已提交）',
  `pay` int(11) NULL DEFAULT 0 COMMENT '缴费（0 未缴费，1已缴费）',
  `check` int(11) NULL DEFAULT 0 COMMENT '审核(0 待审核，1审核通过，2审核不通过)',
  `addgrade` int(11) NULL DEFAULT 0 COMMENT '添加成绩（0未添加，1已添加）',
  `offer` int(11) NULL DEFAULT 0 COMMENT '录取状态(0表示等待录取，1表示录取，2表示未被录取)',
  PRIMARY KEY (`Sid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of process
-- ----------------------------
INSERT INTO `process` VALUES (202001, 1, 1, 2, 0, 0);
INSERT INTO `process` VALUES (202002, 1, 1, 1, 1, 1);
INSERT INTO `process` VALUES (202003, 0, 0, 0, 0, 0);
INSERT INTO `process` VALUES (202011, 1, 1, 1, 0, 0);
INSERT INTO `process` VALUES (202012, 1, 1, 0, 0, 0);
INSERT INTO `process` VALUES (202013, 1, 1, 1, 1, 2);
INSERT INTO `process` VALUES (202014, 1, 1, 1, 1, 2);
INSERT INTO `process` VALUES (202015, 0, 0, 0, 0, 0);
INSERT INTO `process` VALUES (202016, 0, 0, 0, 0, 0);
INSERT INTO `process` VALUES (202017, 0, 0, 0, 0, 0);
INSERT INTO `process` VALUES (202018, 0, 0, 0, 0, 0);
INSERT INTO `process` VALUES (202019, 1, 1, 0, 0, 0);
INSERT INTO `process` VALUES (202020, 1, 1, 1, 1, 2);
INSERT INTO `process` VALUES (202021, 1, 1, 1, 1, 1);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `Sid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id（202001）',
  `Sname` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '姓名',
  `Spwd` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `Sbirth` date NULL DEFAULT NULL COMMENT '出生日期',
  `Spolitics` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '政治面貌',
  `Sidcard` char(18) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '身份证号',
  `Sschool` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '\r\n所在院校\r\n',
  `Smajor` int(11) NULL DEFAULT NULL COMMENT '专业',
  `Sphone` char(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '电话',
  PRIMARY KEY (`Sid`, `Sphone`) USING BTREE,
  INDEX `mid`(`Smajor`) USING BTREE,
  CONSTRAINT `mid` FOREIGN KEY (`Smajor`) REFERENCES `major` (`mid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 202022 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (202001, '李亚', '123', '1995-07-13', '群众', '141126190512143939', '湖北理工学院', 3001, '13245678901');
INSERT INTO `student` VALUES (202002, '张三', '123', '1998-12-24', '群众', '441800398903289750', '湖北理工学院', 3003, '13245678909');
INSERT INTO `student` VALUES (202003, '陈乔', '123', '1999-07-22', '团员', '441800398903289750', '湖北理工学院', 3002, '15935678939');
INSERT INTO `student` VALUES (202011, '张娜', '123', '1999-03-18', '团员', '441800198903289750', '湖北理工学院', 3004, '17060148893');
INSERT INTO `student` VALUES (202012, '王莉', '123', '1997-07-25', '群众', '141126190512143939', '湖北理工学院', 3003, '15874322134');
INSERT INTO `student` VALUES (202013, '好好', '123', '2020-06-01', '党员', '130803194612220857', '湖北理工学院', 3003, '15827111542');
INSERT INTO `student` VALUES (202014, '郝雪彪', '123', '2020-06-02', '群众', '142327190412024121', '湖北理工学院', 3001, '18267318447');
INSERT INTO `student` VALUES (202015, NULL, '123', NULL, NULL, NULL, NULL, NULL, '12312312311');
INSERT INTO `student` VALUES (202016, NULL, '123', NULL, NULL, NULL, NULL, NULL, '12312312311');
INSERT INTO `student` VALUES (202017, NULL, '123', NULL, NULL, NULL, NULL, NULL, '12312312311');
INSERT INTO `student` VALUES (202018, NULL, '123', NULL, NULL, NULL, NULL, NULL, '12312312311');
INSERT INTO `student` VALUES (202019, '张某人', '123', '2020-01-02', '群众', '441800398903289751', '武汉学院', 3002, '12312312311');
INSERT INTO `student` VALUES (202020, '法外狂徒张某人', '123', '2020-07-07', '群众', '110101192007217912', '武汉商贸职业学院', 3001, '15119836979');
INSERT INTO `student` VALUES (202021, '周领袖', '123', '1982-06-08', '精神领袖', '110101192007218958', 'xxx看守所', 3004, '18050753400');

-- ----------------------------
-- Triggers structure for table student
-- ----------------------------
DROP TRIGGER IF EXISTS `addStuProcess`;
delimiter ;;
CREATE TRIGGER `addStuProcess` AFTER INSERT ON `student` FOR EACH ROW BEGIN
INSERT INTO process(Sid) values(NEW.Sid);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
