# Host: localhost  (Version: 5.5.53)
# Date: 2018-12-17 14:26:46
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
  `artcategoryid` bigint(20) DEFAULT NULL COMMENT '文章所属分类',
  `arttitle` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `tuijian` varchar(255) DEFAULT NULL COMMENT '是否推荐',
  `artcon` longtext COMMENT '文章内容',
  `browse` int(11) DEFAULT '1' COMMENT '浏览次数',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='文章中心';

#
# Data for table "article"
#

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (2,18888348998,'/uploadfile/articleimg/1543302251634.jpeg',2,'八首最霸气，最有气势的诗词，踏碎云霄、横绝古今','1','[{\"type\":\"text\",\"data\":\"对于诗词整体来说，一般分为婉约派和豪放派。向来，豪放派的诗词最具气势，主要代表诗人有李白，李贺，辛弃疾，陆游等。还有一位是苏轼，婉约、豪放平分秋色。\\n\\n今天要和大家一起探讨最有气势的诗词，一瞬间又感觉竟然不知从何谈起？诗词之见，也是仁者见仁智者见智。下边作者结合自身多年来对古诗词的研究，做出排列，敬请赏鉴：\\n修改啦啦啦啦啦\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543302188647.jpeg\"]},{\"type\":\"text\",\"data\":\"第八名：《江城子·密州出猎》\\n\\n作者：苏轼\\n\\n老夫聊发少年狂，左牵黄，右擎苍。锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。\\n\\n酒酣胸胆尚开张，鬓微霜，又何妨？持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。\\n\\n点评：苏轼的词，最像李白，潇洒中有气势。但是相比李白，更有意境和哲思。“鬓微霜，又何妨？” “会挽雕弓如满月，西北望，射天狼。”，这气势，叹为观止！\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543302237709.jpeg\"]}]',90,'2018-11-27 15:04:14.884'),(3,18888348998,'/uploadfile/articleimg/1543306126367.jpeg',2,'将进酒','1','[{\"type\":\"text\",\"data\":\"君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪！ 人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。 与君歌一曲，请君为我倾耳听。 钟鼓馔玉不足贵，但愿长醉不复醒。 古来圣贤皆寂寞，惟有饮者留其名。 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。 五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543302237709.jpeg\"]},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543218693464.jpeg\",\"/uploadfile/articleimg/1543219959602.jpeg\"]},{\"type\":\"video\",\"data\":[\"/uploadfile/videos/1543306213445.mp4\"]}]',18,'2018-11-27 16:10:20.542'),(16,18888348998,'/uploadfile/articleimg/1544768120370.jpeg',5,'测试不推荐','1','[{\"type\":\"text\",\"data\":\"修改文章测试\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543218788743.jpeg\"]},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1544759629317.jpeg\"]}]',11,'2018-12-14 10:48:22.534'),(25,16601152980,'/uploadfile/articleimg/1543302251634.jpeg',5,'八首最霸气，最有气势的诗词，踏碎云霄、横绝古今','1','[{\"type\":\"text\",\"data\":\"对于诗词整体来说，一般分为婉约派和豪放派。向来，豪放派的诗词最具气势，主要代表诗人有李白，李贺，辛弃疾，陆游等。还有一位是苏轼，婉约、豪放平分秋色。\\n\\n今天要和大家一起探讨最有气势的诗词，一瞬间又感觉竟然不知从何谈起？诗词之见，也是仁者见仁智者见智。下边作者结合自身多年来对古诗词的研究，做出排列，敬请赏鉴：\\n修改啦啦啦啦啦\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543302188647.jpeg\"]},{\"type\":\"text\",\"data\":\"第八名：《江城子·密州出猎》\\n\\n作者：苏轼\\n\\n老夫聊发少年狂，左牵黄，右擎苍。锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。\\n\\n酒酣胸胆尚开张，鬓微霜，又何妨？持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。\\n\\n点评：苏轼的词，最像李白，潇洒中有气势。但是相比李白，更有意境和哲思。“鬓微霜，又何妨？” “会挽雕弓如满月，西北望，射天狼。”，这气势，叹为观止！\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1543302237709.jpeg\"]}]',4,'2018-12-14 17:02:03.471'),(26,18888348998,'/uploadfile/articleimg/1544784208572.jpeg',2,'给对方股市大幅改善','1','[{\"type\":\"text\",\"data\":\"岁的法国岁的法国士大夫士大夫是 大幅改\"},{\"type\":\"img\",\"data\":[\"/uploadfile/articleimg/1544784272568.jpeg\"]},{\"type\":\"video\",\"data\":[\"/uploadfile/videos/1543306213445.mp4\"]}]',4,'2018-12-14 18:44:44.532');
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
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='文章图片';

#
# Data for table "articleimg"
#

/*!40000 ALTER TABLE `articleimg` DISABLE KEYS */;
INSERT INTO `articleimg` VALUES (1,18888348998,'/uploadfile/articleimg/1543218693464.jpeg','2018-11-26 15:51:33.474'),(2,18888348998,'/uploadfile/articleimg/1543218788743.jpeg','2018-11-26 15:53:08.764'),(3,18888348998,'/uploadfile/articleimg/1543219959602.jpeg','2018-11-26 16:12:39.610'),(4,18888348998,'/uploadfile/articleimg/1543302188647.jpeg','2018-11-27 15:03:08.652'),(5,18888348998,'/uploadfile/articleimg/1543302237709.jpeg','2018-11-27 15:03:57.714'),(6,18888348998,'/uploadfile/articleimg/1543302251634.jpeg','2018-11-27 15:04:11.639'),(7,18888348998,'/uploadfile/articleimg/1543305989915.jpeg','2018-11-27 16:06:29.924'),(8,18888348998,'/uploadfile/articleimg/1543306110728.jpeg','2018-11-27 16:08:30.746'),(9,18888348998,'/uploadfile/articleimg/1543306126367.jpeg','2018-11-27 16:08:46.370'),(10,18888348998,'/uploadfile/articleimg/1544419619691.jpeg','2018-12-10 13:26:59.720'),(11,18888348998,'/uploadfile/articleimg/1544420366120.jpeg','2018-12-10 13:39:26.124'),(12,18888348998,'/uploadfile/articleimg/1544759629317.jpeg','2018-12-14 11:53:49.340'),(13,18888348998,'/uploadfile/articleimg/1544760186504.jpeg','2018-12-14 12:03:06.508'),(14,18888348998,'/uploadfile/articleimg/1544760394627.jpeg','2018-12-14 12:06:34.631'),(15,18888348998,'/uploadfile/articleimg/1544760451605.jpeg','2018-12-14 12:07:31.609'),(16,18888348998,'/uploadfile/articleimg/1544764658541.jpeg','2018-12-14 13:17:38.563'),(17,18888348998,'/uploadfile/articleimg/1544768120370.jpeg','2018-12-14 14:15:20.375'),(18,18888348998,'/uploadfile/articleimg/1544784208572.jpeg','2018-12-14 18:43:28.577'),(19,18888348998,'/uploadfile/articleimg/1544784272568.jpeg','2018-12-14 18:44:32.592');
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
INSERT INTO `category` VALUES (2,'我的文章','18888348998','2018-11-21 10:41:51.843','1'),(5,'获取文章','16601152980','2018-12-14 16:53:17.982','1');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='微链接';

#
# Data for table "link"
#

/*!40000 ALTER TABLE `link` DISABLE KEYS */;
INSERT INTO `link` VALUES (1,'18888348998','百度','http://www.baidu.com','2018-11-28 14:38:15.340'),(3,'18888348998','谷歌','https://www.google.com','2018-11-28 15:50:25.400');
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
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

#
# Data for table "userinfo"
#

/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'徐原野',18888348998,'/uploadfile/userfile/18888348998headimg.jpeg?t=94','xyy18888348998','/uploadfile/userfile/18888348998ewm.jpeg?t=75','北京正阳堂科技孵化器有限公司','技术部','前端开发工程师','哈哈哈','北京市海淀区西直门','网页设计，前端开发，后端开发，网站开发，小程序开发，全栈开发工程师','79792b1f2bf9b1237108c457945ffb21','16601152980','4|3|5|2',1,NULL),(10,'姜亚茹',16601152980,'/uploadfile/userfile/16601152980headimg.jpeg','xka16601152980','/uploadfile/userfile/16601152980ewm.jpeg','北京瑞尼尔公司','市场部','市场专员','我是隔壁的泰山。','北三环','吃喝拉萨水','79792b1f2bf9b1237108c457945ffb21','18888348998',NULL,1,'2018-11-16 15:53:40.236'),(11,NULL,15949821769,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3731558b609178fef0f1a0a9ba9493f7','',NULL,1,'2018-12-10 15:46:18.631');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;

#
# Structure for table "uservideo"
#

DROP TABLE IF EXISTS `uservideo`;
CREATE TABLE `uservideo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` bigint(11) DEFAULT NULL COMMENT '用户手机号',
  `video` varchar(255) DEFAULT NULL COMMENT '视频存放地址',
  `createtime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户视频';

#
# Data for table "uservideo"
#

/*!40000 ALTER TABLE `uservideo` DISABLE KEYS */;
INSERT INTO `uservideo` VALUES (1,18888348998,'/uploadfile/videos/1543306213445.mp4','2018-11-27 16:10:13.453');
/*!40000 ALTER TABLE `uservideo` ENABLE KEYS */;
