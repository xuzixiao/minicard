# Host: localhost  (Version: 5.5.53)
# Date: 2018-12-29 18:17:05
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "admin"
#

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Account` varchar(255) DEFAULT NULL COMMENT '登录账号（手机号）',
  `password` varchar(255) DEFAULT NULL COMMENT '登录密码',
  `state` int(11) DEFAULT '1' COMMENT '账号状态',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员';

#
# Data for table "admin"
#

/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

#
# Structure for table "article"
#

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` bigint(11) DEFAULT NULL COMMENT '用户',
  `artbanner` varchar(255) DEFAULT NULL COMMENT '文章头图',
  `companyid` varchar(255) DEFAULT NULL COMMENT '所属公司',
  `artcategoryid` bigint(20) DEFAULT NULL COMMENT '文章所属分类',
  `arttitle` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `tuijian` varchar(255) DEFAULT NULL COMMENT '是否推荐',
  `artcon` longtext COMMENT '文章内容',
  `browse` int(11) DEFAULT '1' COMMENT '浏览次数',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='文章中心';

#
# Data for table "article"
#

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (2,18888348998,'/uploadfile/articleimg/1545818069347.jpeg',NULL,1,'轻诺必寡信，多易必多难','1','[{\"type\":\"video\",\"data\":[\"/uploadfile/videos/1545873864723.mp4\"]}]',25,'2018-12-27 09:26:29.176'),(3,18888348998,'/uploadfile/articleimg/1545818069347.jpeg',NULL,1,'好红红火火恍恍惚惚','1','[{\"type\":\"text\",\"data\":\"好红红火火恍恍惚惚\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1545818135379.gif\"]}]',5,'2018-12-27 12:40:06.019'),(4,16601152980,'/uploadfile/articleimg/1545818069347.jpeg',NULL,6,'好红红火火恍恍惚惚','1','[{\"type\":\"text\",\"data\":\"好红红火火恍恍惚惚\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1545818135379.gif\"]}]',2,'2018-12-27 14:57:54.519');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

#
# Structure for table "articleimg"
#

DROP TABLE IF EXISTS `articleimg`;
CREATE TABLE `articleimg` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` bigint(11) DEFAULT NULL COMMENT '用户名',
  `image` varchar(255) DEFAULT NULL COMMENT '图片路径',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='文章图片';

#
# Data for table "articleimg"
#

/*!40000 ALTER TABLE `articleimg` DISABLE KEYS */;
INSERT INTO `articleimg` VALUES (1,18888348998,'/uploadfile/articleimg/1545818069347.jpeg','2018-12-26 17:54:29.363'),(2,18888348998,'/uploadfile/articleimg/1545818135379.gif','2018-12-26 17:55:35.379');
/*!40000 ALTER TABLE `articleimg` ENABLE KEYS */;

#
# Structure for table "category"
#

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(255) DEFAULT NULL COMMENT '分类名称',
  `userid` varchar(255) DEFAULT NULL COMMENT '所属用户',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `state` varchar(255) DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='文章分类';

#
# Data for table "category"
#

/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'我的笔记','18888348998','2018-12-26 17:53:31.145','1'),(3,'学习','15201479538','2018-12-27 11:53:19.504','1'),(5,'视频','13381357797','2018-12-27 12:55:47.519','1'),(6,'修改分类','16601152980','2018-12-27 14:57:50.254','1');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

#
# Structure for table "company"
#

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '公司名称',
  `banner` varchar(255) DEFAULT NULL COMMENT '广告图',
  `state` varchar(255) DEFAULT NULL COMMENT '公司状态',
  `expiration_date` varchar(255) DEFAULT NULL COMMENT '到期时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='公司';

#
# Data for table "company"
#

/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

#
# Structure for table "link"
#

DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `linkname` varchar(255) DEFAULT NULL,
  `linkurl` varchar(255) DEFAULT NULL COMMENT '链接地址',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='微链接';

#
# Data for table "link"
#

/*!40000 ALTER TABLE `link` DISABLE KEYS */;
/*!40000 ALTER TABLE `link` ENABLE KEYS */;

#
# Structure for table "userinfo"
#

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `mobile` bigint(11) DEFAULT NULL COMMENT '手机号',
  `headimg` varchar(255) DEFAULT NULL COMMENT '头像',
  `wechat` varchar(255) DEFAULT NULL COMMENT '微信',
  `wxewmimg` varchar(255) DEFAULT NULL COMMENT '微信二维码',
  `company` varchar(255) DEFAULT NULL COMMENT '公司名称',
  `branch` varchar(255) DEFAULT NULL COMMENT '部门',
  `office` varchar(255) DEFAULT NULL COMMENT '职务',
  `dictum` varchar(255) DEFAULT NULL COMMENT '我的格言',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `operate` varchar(255) DEFAULT NULL COMMENT '主要经营',
  `password` varchar(255) DEFAULT NULL COMMENT '登录密码',
  `Frineds` longtext COMMENT '好友',
  `collarticle` text COMMENT '收藏文章',
  `status` int(11) DEFAULT '1' COMMENT '当前状态',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

#
# Data for table "userinfo"
#

/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'徐原野',18888348998,'/uploadfile/userfile/18888348998headimg.jpeg?t=51','xyy18888348998','/uploadfile/userfile/18888348998ewm.png?t=45','正阳堂(北京)科技孵化器有限公司','技术研发部','前端开发工程师','好好生活，好好拼搏','北京市交大东路31号院质量管理学院','前端开发，小程序开发，全栈开发，网站应用开发','79792b1f2bf9b1237108c457945ffb21',NULL,NULL,1,'2018-12-26 17:48:23.161'),(2,NULL,16601152980,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'79792b1f2bf9b1237108c457945ffb21',NULL,NULL,1,'2018-12-27 10:55:21.082'),(3,NULL,15201479538,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cb88763b4870ad5eef96fac9bbaf3c86',NULL,NULL,1,'2018-12-27 11:51:05.738'),(4,'李宁',13381357797,'/uploadfile/userfile/13381357797headimg.jpeg?t=98','13381357797',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2d9ef765093fd53fb8a10b2c8c4a78c3',NULL,NULL,1,'2018-12-27 12:15:52.144');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;

#
# Structure for table "uservideo"
#

DROP TABLE IF EXISTS `uservideo`;
CREATE TABLE `uservideo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` bigint(11) DEFAULT NULL COMMENT '用户手机号',
  `video` varchar(255) DEFAULT NULL COMMENT '视频存放地址',
  `videologo` varchar(255) DEFAULT NULL COMMENT '视频封面图片',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户视频';

#
# Data for table "uservideo"
#

/*!40000 ALTER TABLE `uservideo` DISABLE KEYS */;
INSERT INTO `uservideo` VALUES (1,18888348998,'/uploadfile/videos/1545827530347.mp4','/uploadfile/nothave.jpg','2018-12-26 20:32:10.363'),(2,18888348998,'/uploadfile/videos/1545873864723.mp4','/uploadfile/videos/1545873864723.mp4.jpg','2018-12-27 09:24:24.739');
/*!40000 ALTER TABLE `uservideo` ENABLE KEYS */;
