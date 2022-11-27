const express = require('express');
var app       = express();
var router    = express.Router();

const util    = require('util');
const fs      = require('fs');
const jsdom   = require('jsdom');
const {JSDOM} = jsdom;


// * start: mysql *************************************************************
const mysql   = require('mysql');
const { isCryptoKey } = require('util/types');

var mysql_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'self_studyroom'
});

mysql_connection.connect();

var page_info = {
    places:null,
    rooms:null,
    user:{
        name:null,
        phone:null
    },
    filter:{
        place:null,
        seat_type:null
    },
    result:null
};

mysql_connection.query('SELECT * from roomsite;', function (error, results, fields) {
    if (error) throw error;
    page_info.places = results;
});

function site_no_to_name(no) {
    for (var i = 0 ; i < page_info.places.length; i++) {
        if (no == page_info.places[i].siteno) {
            return page_info.places[i].sitename;
        }
    }
    return "奇妙的地点";
}

mysql_connection.query('SELECT * from roomclass;', function (error, results, fields) {
    if (error) throw error;
    page_info.rooms = results;
});

function room_no_to_name(no) {
    for (var i = 0 ; i < page_info.rooms.length; i++) {
        if (no == page_info.rooms[i].classno) {
            return page_info.rooms[i].classname;
        }
    }
    return "奇妙的区域";
}

mysql_connection.query('SELECT * from room;', function (error, results, fields) {
    if (error) throw error;
    page_info.result = results;
});

// * end : mysql *************************************************************


// * start : server config *************************************************************
const file_root = '../'

// function regist_directory(dir) {
//     app.use('/' + dir, express.static(file_root + dir));
// }

// regist_directory('css');
// regist_directory('imgs');
// regist_directory('js');
app.use(express.static(file_root))
app.use(express.json())
// * end : server config *************************************************************

function mainpage_action() {
    const dom = new JSDOM(fs.readFileSync(file_root + 'ui_utils/main.html'));
    const document = dom.window.document;

    document.getElementById('username').innerHTML = page_info.user.name
    document.getElementById('userphone').innerHTML = page_info.user.phone

    var place_ch = "<select multiple=\"multiple\" class=\"select-item\" name=\"position\" style=\"height: " + (page_info.places.length * 50 + 3) + ";\">";
    for (var i = 0; i < page_info.places.length; i++){
        place_ch += "<option value=\"" + page_info.places[i].siteno + "\" class=\"btn place-item\">" + page_info.places[i].sitename + "</option>";
    }
    document.getElementById('select-place').innerHTML = place_ch + "</select>";

    var form_ch = "<table><tr><th>编号</th><th>区号</th><th>价钱</th><th>评级</th><th>地点</th><th>预约</th></tr>\n";
    function add_element(ele) {
        return "<td>" + ele + "</td>"
    }

    if (page_info.result != null) {
        for (var i = 0; i < page_info.result.length; i++){
            form_ch += "<tr>";
            form_ch += add_element(page_info.result[i].roomno);
            form_ch += add_element(room_no_to_name(page_info.result[i].classno));
            form_ch += add_element(page_info.result[i].price);
            form_ch += add_element(page_info.result[i].evaluate);
            // form_ch += add_element(page_info.result[i].state);
            const isDisable = page_info.result[i].state == '空闲' ? '':'disabled';
            form_ch += add_element(site_no_to_name(page_info.result[i].siteno));
            form_ch += add_element("<input type=\"checkbox\" name=\"seat\" value=\"" + page_info.result[i].roomno + "\" " + isDisable + ">");
            form_ch += "</tr>\n";
        }
    }
    document.getElementById('result').innerHTML = form_ch + '</table>';

    return(document.querySelector("html").outerHTML);
}

app.get('/login', (req, res) => {
    const info = req.query;
    //! 判断用户类型，检验合理性
    console.log('用户登录GET:', info);
    if (info.uid.length != 10 || Number(info.uid) + "" != info.uid) {
        res.type('text');
        res.end("手机号格式错误，请返回重试:" + info.uid.length + " " + Number(info.uid));
        return;
    }
    if (info.typ == '注册') {
        // 在数据库中检查用户id是否被注册过
        // ! 修改子句
        mysql_connection.query('select phone, password from information where phone=\'' + info.uid + '\'', function (error, results, fields) {
            if (error) throw error;
            console.log('数据库检索:', results);
            if (results.length != 0) {
                res.type('text');
                res.end("该用户已存在，请返回登录");
                return;
            } else {
                page_info.user.name = "新注册用户"; 
                page_info.user.phone = info.uid;
                // ! 向数据库中插入用户
                mysql_connection.query('INSERT INTO `information` VALUES (\'' + info.uid + '\',\'' + info.psd + '\');', function (error, results, fields) {
                    if (error) throw error;
                    res.end(mainpage_action());
                });
                return;
            }
        });
    } else {
        // 在数据库中检索用户密码是否匹配
        // ! 修改子句
        mysql_connection.query('select phone, password from information where phone=\'' + info.uid + '\'', function (error, results, fields) {
            if (error) throw error;
            console.log('数据库检索:', results);
            if (results.length != 1) {
                res.type('text');
                res.end(results.length == 0 ? "没有此用户啊，请返回重试" : "数据库设计有bug! 请联系管理员");
                return;
            } else {
                if (results[0].password != info.psd) {
                    // ! 密码不匹配，请重试
                    res.type('text');
                    res.end("密码不匹配，请返回重试");
                    return;
                }
                mysql_connection.query('SELECT username from user where phone=\'' + info.uid + '\';', function (error, results, fields) {
                    if (error) throw error;
                    if (results.length == 1) {
                        page_info.user.name = results[0].username; // !
                    } else {
                        page_info.user.name = "无名用户"; // !
                    }
                    page_info.user.phone = info.uid;
                    res.end(mainpage_action());
                });
                return;
            }
        });
    }
});

app.get('/select-place', function(req, res) {
    var ans = req.query.position;

    var tem = ""
    if (ans instanceof Array) {
        for (var i = 0; i < ans.length; i++){
            // console.log(ans[i])
            tem += ('siteno=\'' + ans[i] + '\'')
            if (i != ans.length - 1) {
                tem +=  " OR ";
            } else {
                tem += "";
            }
        }
    } else {
        tem = 'siteno=\'' + ans + '\'';
    }
    mysql_connection.query('SELECT * from room where ' + tem + ';', function (error, results, fields) {
        if (error) throw error;
        page_info.result = results;
        res.end(mainpage_action());
    });
});

// app.get('/yuyue', function(req, res) {
//     var ans = req.query.readerno;

//     console.log('yuyue ');
//     if (ans instanceof Array) {
//         var tem = "预约者: ['"
//         for (var i = 0; i < ans.length; i++){
//             // console.log(ans[i])
//             tem += (ans[i])
//             if (i != ans.length - 1) {
//                 tem +=  "', ";
//             } else {
//                 tem += "'],"
//             }
//         }
//         console.log(tem);
//     } else {
//         console.log('预约者: \'' + ans + '\',');
//     }

//     res.redirect('/');
// });

var server = app.listen(8888);

console.log("listen @ http://:::8888")