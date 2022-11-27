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
    database : 'db_book'
});

mysql_connection.connect();

var page_info = {
    places:null,
    user:{
        name:null,
        phone:null
    },
    filter:{
        place:null,
        seat_type:null
    }

};

mysql_connection.query('SELECT * from bookclass;', function (error, results, fields) {
    if (error) throw error;
    page_info.places = results;
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
        place_ch += "<option value=\"" + page_info.places[i].classno + "\" class=\"btn place-item\">" + page_info.places[i].classname + "</option>";
    }
    document.getElementById('select-place').innerHTML = place_ch + "</select>";

    var k_find_res;
    var __mysql_cmd = 'SELECT * from book ';

    // if (page_info.filter.place != null) {
    //     __mysql_cmd += 'where classno='
    // }

    if (page_info.filter.place === null && page_info.filter.seat_type === null) {
        // mysql_connection.query('SELECT * from book;', function (error, results, fields) {
        //     if (error) throw error;
        //     page_info.places = results;
        // });
        __mysql_cmd = 'SELECT * from book;';
    } 

    mysql_connection.query(__mysql_cmd, function (error, results, fields) {
        if (error) throw error;
        k_find_res = results;
        console.log(k_find_res);
        
    });

    

    var form_ch = "<tr><th>编号</th><th>姓名</th><th>性别</th><th>身份证号</th><th>单位</th></tr>";
    function add_element(ele) {
        return "<td>" + ele + "</td>"
    }

    for (var i = 0; i < k_find_res.length; i++){
        form_ch += "<tr onclick=\"yuyue('"+k_find_res[i].bookno+"')\">";
        form_ch += add_element(k_find_res[i].bookno);
        form_ch += add_element(k_find_res[i].classno);
        form_ch += add_element(k_find_res[i].bookname);
        form_ch += add_element(k_find_res[i].authorname);
        form_ch += add_element(k_find_res[i].publisherno);
        form_ch += "</tr>";
    }
    document.getElementById('result').innerHTML = form_ch;

    return(document.querySelector("html").outerHTML)
}

app.get('/login', (req, res) => {
    const info = req.query;
    //! 判断用户类型，检验合理性
    console.log('用户登录GET:', info);
    if (info.uid.length != 11 || Number(info.uid) + "" != info.uid) {
        res.type('text');
        res.end("手机号格式错误，请返回重试:" + info.uid.length + " " + Number(info.uid));
        return;
    }
    if (info.typ == '注册') {
        // 在数据库中检查用户id是否被注册过
        // ! 修改子句
        mysql_connection.query('select readerno, readername from reader where readerno=\'' + 'R2015001' + '\'', function (error, results, fields) {
            if (error) throw error;
            console.log('数据库检索:', results);
            if (results.length != 0) {
                res.type('text');
                res.end("该用户已存在，请返回登录");
                return;
            } else {
                page_info.user.name = results[0].readername;
                page_info.user.phone = info.uid;
                // ! 向数据库中插入用户
                // mysql : insert xxxxxx
                res.end(mainpage_action());
                return;
            }
        });
    } else {
        // 在数据库中检索用户密码是否匹配
        // ! 修改子句
        mysql_connection.query('select readerno, readername from reader where readerno=\'' + 'R2015001' + '\'', function (error, results, fields) {
            if (error) throw error;
            console.log('数据库检索:', results);
            if (results.length != 1) {
                res.type('text');
                res.end(results.length == 0 ? "没有此用户啊，请返回重试" : "数据库设计有bug! 请联系管理员");
                return;
            } else {
                page_info.user.name = results[0].readername;
                page_info.user.phone = info.uid;
                res.end(mainpage_action());
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
            tem += (ans[i])
            if (i != ans.length - 1) {
                tem +=  ",";
            } else {
                tem += ""
            }
        }
    } else {
        tem
    }
    res.end(mainpage_action());
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