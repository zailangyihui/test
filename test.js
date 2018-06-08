var arr = '11,2,3,4,5,6'.split(',');
//console.log("====", qrr.sort(sortNumber));


var common = require('./library/common.js');
var urllib = require('urllib');
var db = require('./library/db.js');

//console.log(common.shuffle(qrr));

/**
 * 从小到大排序（数字排序模式）
 * @param {*} arr 
 */
// function mintomax(arr) {
//     return arr.sort(sortNumber);
// }

// function sortNumber(a, b) {
//     return a - b
// }

// console.log("====", arr.sort(sortNumber));
//console.log(common.array_combination(arr, 2));

// console.log(common.sha1('6BDD-2A18-0894-64FE-266C-82B5-9168-7AE5'));
// var obj = {};

// if (common.empty(obj['ee'])) {
//     obj['ee'] = {}
// }
// obj['ee']['333'] = 999;
// obj['ee']['444'] = 888;
// console.log('r', obj);

// var gameconfig = require('./model/gameconfig.js');
// var tsplay = {};
// gameconfig.getspecialoddsbygah(null, 'JL11OF5', 'A', function(err, tsplays) {
//     if (!common.empty(tsplays)) {
//         for (var id in tsplays) { //形成{'playitemkey':{"1":2,'2':8}} json 
//             if (common.empty(tsplay[tsplays[id].playitemkey]))
//                 tsplay[tsplays[id].playitemkey] = {};

//             if (common.empty(tsplay[tsplays[id].playitemkey][tsplays[id].specialoddkey]))
//                 tsplay[tsplays[id].playitemkey][tsplays[id].specialoddkey] = '';

//             tsplay[tsplays[id].playitemkey][tsplays[id].specialoddkey] = tsplays[id].specialoddvalue;

//         }
//         console.log("tsplay====", tsplay)
//     }
// });

// var opencode = '14,11,03,20,10,18,07,06';
// var numbers = '7|小'
// var playkey = 'sing_big_small';
// var comput = require('./apps/games/hnk10/module/compute.js');
// var tsplay = {
//     r2_3m: { '2': 4.7, '3': 14.1 },
//     r2_4m: { '2': 4.7, '3': 14.1, '4': 28.2 },
//     r2_5m: { '2': 4.7, '3': 14.1, '4': 28.2, '5': 47 },
//     r2_6m: { '2': 4.7, '3': 14.1, '4': 28.2, '5': 47 },
//     r3_4m: { '3': 14.1, '4': 56.4 },
//     r3_5m: { '3': 14.1, '4': 56.4, '5': 141 },
//     r3_6m: { '3': 14.1, '4': 56.4, '5': 141 }, //
//     r4_5m: { '4': 56.5, '5': 282.5 },
//     r4_6m: { '4': 56.5, '5': 282.5 },
//     r4_7m: { '4': 56.5, '5': 282.5 }
// }
// console.log("zj====", comput.calculateBonus(playkey, numbers, 100, opencode, 16, tsplay));
// var str = "1,2";
// var arr = [1, 2].join(',')
// console.log(arr.indexOf(str))
// console.log(common.sha1('HUA123789'));
//console.log("===", "20170902012".slice(2, 11));

/**
 * str 字符串
 * word 要补充的字符c
 * len 结果字串的总长度
 */
// function supplement(str, word, len) {
//     if (str.length < len) {
//         for (var i = 0; i < (len - str.length - 1); i++) {
//             word += "0";
//         }
//         return word + str;
//     } else {
//         return str;
//     }
// }

//console.log(supplement("5", "0", 3));

// var ordermodule = require('./module/ordermodule.js');
// ordermodule.getplaykeyodd("JL11OF5", 'A', 'q3_7m', function(err, data) {
//     console.log(err, data);
// });

// ordermodule.getbetcountbyplaykey("test", "2017031809", "r5_kd_10", "JL11OF5", "10", function(err, data) {
//     console.log(err, data[0].betcount);
//     return;
// });

// var data = JSON.parse('{"list":[{"amount":10,"odds":"7.0","number":"大","key":"he_big_small"}],"game":"JLK3","userno":"3333","no":"20170416010","pkname":"B"}');
// var list = data.list;
// if (!common.isarray(list) || !list[0].hasOwnProperty('amount') || common.empty(list[0].amount) ||
//     !list[0].hasOwnProperty('number') || common.empty(list[0].number) ||
//     !list[0].hasOwnProperty('key') || common.empty(list[0].key) ||
//     !list[0].hasOwnProperty('odds') || common.empty(list[0].odds)) {
//     console.log("----2ß--")
// } else {
//     console.log("------")
// }

// var url = "43.227.97.179:9900/wexin/saveorder.html";
// urllib.request(url, {
//     dataType: "JSON",
//     method: "GET",
//     content: { "list": [{ "amount": 10, "odds": "7.0", "number": "大", "key ": "he_big_small " }], "game ": "JLK3 ", "userno ": "3333 ", "no ": "20170416012 ", "pkname ": "B" }
// }, function(err, data) {
//     //console.log(err, data);
// });

//console.log(common.sha1("978F-04DF-19A8-F40A-04F8-4950-A731-DE37"));

// console.log(common.dateToStr('yyyy-MM-dd hh:mm:ss', new Date('2017-04-29T14:17:00.000Z')));
// console.log(common.dateToStr("yyyy-MM-dd hh:mm:ss", common.dateAdd("n", 5, new Date(new Date('2017-04-29T14:17:00.000Z')))));
// var arr = [1, 2, 3, 4, 5, 6, 7];
// //console.log(arr.splice(0, 6));
// //console.log(arr[6]);
// for (let id in arr) {
//     console.log(id);
//     for (let i = 0; i < 5; i++) {
//         if (i == 2) {
//             console.log("===1===", i)
//             break;
//         } else {
//             console.log('---2-----', i)
//         }
//     }
// }
// const redis = require("redis");
// const async = require('async');
// const db = redis.createClient({ host: '127.0.0.1', "prot": 6379 });
// const data = { "80": true, "01": true, "23": true, "24": true };
// const key = "K8A";
// async.waterfall([
//     function(next) {
//         db.hmset(key, data, next);
//     },
//     function(mrt, next) {
//         db.hgetall(key, next);
//     }
// ], function(err, data) {
//     console.log(err, data);
//     return;
// });

//console.log(common.choose([1, 2, 3, 4, 5], 3)) 3)) 6, 7, 8], 3)) 8], 2))


// let coul = ["playitemkey", "specialoddkey", "specialoddvalue"];
// let tj = [{ "gameid": "LHC10" }, { "handicap": 'A' }];
// db.select(null, "game_special_odds", coul, tj, [{ "playitemkey": "DESC" }, { "specialoddkey": "ASC" }, { "specialoddvalue": "ASC" }], function(err, data) {
//         if (err) {
//             return callback(err, data);
//         } else {
//             //console.log("===", data);
//             let obj = {};
//             for (let id in data) {
//                 obj[data[id].playitemkey] = data[id].specialoddvalue;
//             }
//             console.log(obj);
//         }
//     })
/*

    INSERT INTO `game_sequence` (`keynames`, `keyvalues`, `groups`)
    VALUES
    	('startecpect', '820977', 'K8');


    CREATE TABLE `game_setting` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `gameid` varchar(20) DEFAULT NULL COMMENT '游戏ID',
      `handicap` varchar(20) DEFAULT NULL COMMENT '盘口/房间',
      `ip` varchar(30) DEFAULT NULL COMMENT '房间IP',
      `port` int(11) DEFAULT NULL COMMENT '端口',
      `handicapname` varchar(50) DEFAULT NULL COMMENT '盘口/房间名称',
      `maxuser` int(11) DEFAULT NULL COMMENT '最大用户数',
      `initcount` int(11) DEFAULT NULL COMMENT '初始用户数',
      `minamount` int(11) DEFAULT NULL COMMENT '最小金额',
      `maxamount` int(11) DEFAULT NULL COMMENT '最大金额',
      `onlinecount` int(11) DEFAULT NULL COMMENT '在线人数',
      `states` char(11) DEFAULT NULL COMMENT '状态（1：正常，2：关闭，3：人满）',
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

    INSERT INTO `game_setting` (`gameid`, `handicap`, `ip`, `port`, `handicapname`, `maxuser`, `initcount`, `minamount`, `maxamount`, `onlinecount`, `states`)
VALUES
	( 'K8', 'A', '192.168.0.102', 3000, '一元专区', 100, 0, 1, 10, 0, '1'),
	( 'K8', 'B', '192.168.0.102', 3000, '十元专区', 100, 0, 10, 100, 0, '1'),
	( 'K8', 'C', '192.168.0.102', 3000, '百元专区', 100, 0, 100, 1000, 0, '1');


INSERT INTO `game_config` ( `gameid`, `handicap`, `playitemkey`, `playitemname`, `odds`, `rebate`, `purchase`, `sortindex`, `types`, `groups`)
VALUES
	('K8', 'A', 'oddnumber', '单号', 60.000, 0.000, 600, 0, '1', '2'),
	('K8', 'A', 'big', '大', 1.860, 0.000, 300, 1, '1', '1'),
	('K8', 'A', 'small', '小', 1.860, 0.000, 300, 2, '1', '1'),
	('K8', 'A', 'odds', '单', 1.860, 0.000, 300, 3, '1', '1'),
	('K8', 'A', 'evens', '双', 1.860, 0.000, 300, 4, '1', '1'),
	('K8', 'B', 'oddnumber', '单号', 60.000, 0.000, 6000, 0, '1', '2'),
	('K8', 'B', 'big', '大', 1.860, 0.000, 3000, 1, '1', '1'),
	('K8', 'B', 'small', '小', 1.860, 0.000, 3000, 2, '1', '1'),
	('K8', 'B', 'odds', '单', 1.860, 0.000, 3000, 3, '1', '1'),
	('K8', 'B', 'evens', '双', 1.860, 0.000, 3000, 4, '1', '1'),
	('K8', 'C', 'oddnumber', '单号', 60.000, 0.000, 60000, 0, '1', '2'),
	('K8', 'C', 'big', '大', 1.860, 0.000, 30000, 1, '1', '1'),
	('K8', 'C', 'small', '小', 1.860, 0.000, 30000, 2, '1', '1'),
	('K8', 'C', 'odds', '单', 1.860, 0.000, 30000, 3, '1', '1'),
	('K8', 'C', 'evens', '双', 1.860, 0.000, 30000, 4, '1', '1');

CREATE TABLE `game_user_desc` (
  `Id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(11) DEFAULT NULL COMMENT '用户ID',
  `accountname` varchar(50) DEFAULT NULL COMMENT '帐号名称',
  `branch` varchar(100) DEFAULT NULL COMMENT '帐号组织单位',
  `account` varchar(100) DEFAULT NULL COMMENT '帐号',
  `types` char(11) DEFAULT NULL COMMENT '帐号类型（1:微信，2：支付宝，3：银行卡）',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `phone` varchar(30) DEFAULT NULL COMMENT '联系手机',
  `state` char(1) DEFAULT 'Y' COMMENT '状态',
  `qcode` longtext COMMENT '二维码',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

INSERT INTO `game` (`Id`, `gameid`, `gamename`, `gameip`, `gameport`, `state`)
VALUES
	(14, 'K8', '快8夺宝', '192.168.0.100', '{\"server\":9911,\"www\":9900,\"siteport\": 9982}', '正常');


    */

// var url = "http://pay.366pay.com/Bank/?parter=1723&type=985&value=0.01&orderid=1495160073340&callbackurl=http://34.227.97.179:9900/api/pay.go&refbackurl=http://34.227.97.179:9900/app.html?mode=1&payerIp=127.0.0.1&attach=test&sign=62c5a52750b6a2e5dae7d455ea45b630";
// urllib.request(url, {
//     method: "get",
//     content: {}
// }, function(err, data) {
//     console.log(err, data);
// });
// var crypto = require('crypto');
// var hasher = crypto.createHash("md5");

// var url = "http://pay.366pay.com/Bank/";
// var parter = "1723";
// var key = "df5f1b3dd2d94889afb047f04ea8d41a";
// var type = "985";
// var value = "0.01";
// var orderid = new Date().getTime();
// var callback = "http://34.227.97.179:9900/api/pay.go";
// var refcallback = "http://34.227.97.179:9900/app.html?mode=1";
// var payerIp = "127.0.0.1";
// var attach = "test";
// var signstr = "parter=" + parter + "&type=" + type + "&value=" + value + "&orderid=" + orderid + "&callbackurl=" + callback + key;

// var sign = common.md5(signstr);
// var agent = "";

// var sendurl = url + "?parter=" + parter + "&type=" + type + "&value=" + value + "&orderid=" + orderid + "&callbackurl=" + callback + "&refbackurl=" + refcallback + "&payerIp=" + payerIp + "&attach=" + attach + "&sign=" + sign;

// console.log(sendurl);

//fde74a4c040b5022cd9c4d9e6b917fcc
//5d49ec003d46cd586a23dd689a99dd8a
// let numberstr = '1,2,3,4';

// const seqChoose = function(numberstr, len) {
//     let arr = [];
//     let str = numberstr.split(',');
//     for (let id in str) {
//         if ((parseInt(id) + 1) < str.length) {
//             let newstr = [];
//             for (let i = 0; i < len; i++) {
//                 if (str[parseInt(id) + i] != undefined) {
//                     newstr.push(str[parseInt(id) + i]);
//                 }
//             }
//             if (newstr.length == len) {
//                 arr.push(newstr);
//             }
//         }
//     }
//     return arr;
// };
// console.log(seqChoose(numberstr, 2));

// /**
// 组选方式
// *@param arr [1,2,3,4,5]
// *@param len 每组号码个数 2
// *@return [[1,2],[2,3],[3,4],[4,5]]
// */
// const groupChoose = function(arr, len) {
//     var allResult = [];
//     (function fn (arr, len, result) {
//         var arrLen = arr.length;
//         if (len > arrLen) {
//             return;
//         }
//         if (len == arrLen) {
//             allResult.push([].concat(result, arr))
//         } else {
//             for (var i = 0; i < arrLen; i++) {
//                 var newResult = [].concat(result);
//                 newResult.push(arr[i]);

//                 if (len == 1) {
//                     allResult.push(newResult);
//                 } else {
//                     var newArr = [].concat(arr);
//                     newArr.splice(0, i + 1);
//                     fn(newArr, len - 1, newResult);
//                 }
//             }
//         }
//     })(arr, len, []);
//     return allResult;
// };
// console.log(groupChoose([2, 1, 3], 2));

// /**
//  * 二连直选
//  * @param arr [3, 4, 5, 2]
//  * @return [ [ 3, 4 ], [ 3, 2 ], [ 4, 5 ] ]
//  */
// let str = [3, 4, 5, 2];
// const shunChoose = function(arr) {
//     let result = [];
//     let narr = common.clone(arr);
//     for (let id in arr) {
//         for (let ids in narr) {
//             if (arr[id] == narr[ids]) {
//                 delete narr[ids];
//             }
//             if (Math.abs(arr[id] - narr[ids]) == 1) {
//                 result.push([arr[id], narr[ids]]);
//                 delete narr[ids];
//             }
//         }
//     }
//     return result;
// }

// console.log(shunChoose(str));

// /**
//  * 二连组选
//  * @param arr [2,9, 4, 5]
//  * @return [ [ 3, 4 ], [ 3, 2 ], [ 4, 3 ], [ 4, 5 ], [ 5, 4 ], [ 2, 3 ] ]
//  */
// const shunzhuChoose = function(arr) {
//     let result = [];
//     let narr2 = common.clone(arr);
//     let narr3 = common.clone(arr);
//     let narr4 = common.clone(arr);
//     let narr5 = common.clone(arr);

//     for (let id in arr) {
//         for (let ids in narr2) {
//             if (arr[id] != narr2[ids]) {
//                 for (let id3 in narr3) {
//                     if (narr3[id3] != narr2[ids]) {
//                         for (let id4 in narr4) {
//                             if (narr3[id3] != narr4[id4]) {
//                                 result.push([arr[id], narr2[ids], narr3[id3], narr4[id4]]);
//                             } else {
//                                 delete narr4[id4];
//                             }
//                         }
//                     } else {
//                         delete narr3[id3];
//                     }
//                 }
//             } else {
//                 delete narr2[ids];
//             }
//         }
//         return result;
//     }
// }

// console.log(shunzhuChoose([2, 9, 4, 5]));
// function zuhelen(c1, c2) {
//     var bch = c1;
//     var ch = 1;
//     var st = 1;
//     for (var i = 1; i < c2; i++) {
//         bch = bch * (c1 - i);
//         ch = ch * (st + i);
//         console.log(bch, ch)
//     }
//     return bch / ch
// }

// console.log(zuhelen(10, 1))
// undefined

// //c1 所有号码个数   c2 组合成号码个数 
// function pailielen(c1, c2) {
//     var bch = c1;
//     for (var i = 1; i < c2; i++) {
//         bch = bch * (c1 - i);
//     }
//     return bch
// }

var opencode = '08,05,16,20,11,04,06,02';
var numbers = '8|02';
var playkey = 'tema';
var comput = require('./model/compute.js');
var tsplay = {
    r2_3m: { '2': 4.7, '3': 14.1 },
    r2_4m: { '2': 4.7, '3': 14.1, '4': 28.2 },
    r2_5m: { '2': 4.7, '3': 14.1, '4': 28.2, '5': 47 },
    r2_6m: { '2': 4.7, '3': 14.1, '4': 28.2, '5': 47 },
    r3_4m: { '3': 14.1, '4': 56.4 },
    r3_5m: { '3': 14.1, '4': 56.4, '5': 141 },
    r3_6m: { '3': 14.1, '4': 56.4, '5': 141 }, //
    r4_5m: { '4': 56.5, '5': 282.5 },
    r4_6m: { '4': 56.5, '5': 282.5 },
    r4_7m: { '4': 56.5, '5': 282.5 }
}

console.log(comput.gamehnklsf(playkey, numbers, 100, opencode, 1.98))