const express = require('express');
var app = express();
var router = express.Router();

const util = require('util');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


// * start: mysql *************************************************************
const mysql = require('mysql');
const { isCryptoKey } = require('util/types');
const { table } = require('console');
const { userInfo } = require('os');
const e = require('express');

var mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'self_studyroom',
    timezone: "STSTEM"
});

mysql_connection.connect();

var page_info = {
    places: null,
    rooms: null,
    user: {
        name: null,
        sex: null,
        phone: null,
        idid: null,
        has_info: false
    },
    filter: {
        place: null,
        seat_type: null,
        time: {
            date: null,
            start: null,
            end: null
        }
    },
    inflect: null,
    result: null,
    yuyued: null
};

mysql_connection.query('SELECT * from roomsite;', function (error, results, fields) {
    if (error) throw error;
    page_info.places = results;
});

function site_no_to_name(no) {
    for (var i = 0; i < page_info.places.length; i++) {
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
    for (var i = 0; i < page_info.rooms.length; i++) {
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


function modifypage_action() {
    const dom = new JSDOM(fs.readFileSync(file_root + 'ui_utils/modify.html'));
    const document = dom.window.document;

    document.getElementById('userphone').innerHTML = page_info.user.phone;

    document.getElementById('username').setAttribute("value", page_info.user.name);

    if (page_info.user.idid != null) {
        document.getElementById('idid').setAttribute("value", page_info.user.idid);
    }

    switch (page_info.user.sex) {
        case '男': ;
        case '女': document.getElementById(page_info.user.sex).setAttribute('checked', "true"); break;
    }

    return (document.querySelector("html").outerHTML);
}

function add_element(ele) {
    return "<td>" + ele + "</td>"
}

function yuyuedpage_action() {
    const dom = new JSDOM(fs.readFileSync(file_root + 'ui_utils/my_yuyue.html'));
    const document = dom.window.document;

    document.getElementById('username').innerHTML = page_info.user.name
    document.getElementById('userphone').innerHTML = page_info.user.phone

    var form_ch = "<table><tr><th>房间号</th><th>日期</th><th>开始时间</th><th>结束时间</th><th>费用</th><th>取消预约</th></tr>";
    for (var i = 0; i < page_info.yuyued.length; i++) {
        form_ch += "<tr>";

        var roomn  = page_info.yuyued[i].roomno;
        var stdate = page_info.yuyued[i].startdate;

        form_ch += add_element(roomn);
        form_ch += add_element(stdate);
        form_ch += add_element(page_info.yuyued[i].st);
        form_ch += add_element(page_info.yuyued[i].et);
        form_ch += add_element(page_info.yuyued[i].cost);
        //A02:2021-11-18
        var val = roomn + ":" + stdate;
        form_ch += add_element("<input type=\"checkbox\" name=\"del\" value=\"" + val + "\">");

        form_ch += "</tr>";

    }

    document.getElementById('result').innerHTML = form_ch + '</table>';

    return (document.querySelector("html").outerHTML);
}



function mainpage_action() {
    const dom = new JSDOM(fs.readFileSync(file_root + 'ui_utils/main.html'));
    const document = dom.window.document;

    document.getElementById('username').innerHTML = page_info.user.name
    document.getElementById('userphone').innerHTML = page_info.user.phone

    var place_ch = "<select multiple=\"multiple\" class=\"select-item\" name=\"position\" style=\"height: " + (page_info.places.length * 50 + 3) + ";\">";
    for (var i = 0; i < page_info.places.length; i++) {
        place_ch += "<option value=\"" + page_info.places[i].siteno + "\" class=\"btn place-item\">" + page_info.places[i].sitename + "</option>";
    }
    document.getElementById('select-place').innerHTML = place_ch + "</select>";

    var form_ch = '';

    if (page_info.result != null && page_info.filter.time.end != null) {
        form_ch += "<table><tr><th>座位号</th><th>分区</th><th>小时费用</th><th>地点</th><th>预约</th></tr>"
        for (var i = 0; i < page_info.result.length; i++) {
            form_ch += "<tr>";
            form_ch += add_element(page_info.result[i].roomno);
            form_ch += add_element(room_no_to_name(page_info.result[i].classno));
            form_ch += add_element(page_info.result[i].price);
            // TODO: 检查个人订阅信息, 对应勾选checked
            var isDisable = '';
            var isChecked = '';
            if (page_info.inflect != null && page_info.inflect.length != 0) {
                for (var j = 0; j < page_info.inflect.length; j++) {
                    if (page_info.inflect[j].roomno == page_info.result[i].roomno) {
                        isDisable = 'disabled';
                        if (page_info.inflect[j].phone == page_info.user.phone) {
                            isChecked = 'checked=true';
                        }
                        break;
                    }
                }
            }
            form_ch += add_element(site_no_to_name(page_info.result[i].siteno));
            form_ch += add_element("<input type=\"checkbox\" name=\"seat\" value=\"" + page_info.result[i].roomno + "\" " + isDisable + " " + isChecked + ">");
            form_ch += "</tr>";
        }
        form_ch += '</table>';
    } else {
        form_ch += "<p>没有数据（请先选择时间）</p>"
    }
    document.getElementById('result').innerHTML = form_ch + '</table>';

    var stime = document.querySelector("input[name='stime']");
    var def_stime = page_info.filter.time.start;
    if (def_stime == null) {
        var d = new Date();
        var hour = d.getHours()
        var mini = d.getMinutes()
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (mini < 10) {
            mini = '0' + mini;
        }
        def_stime = hour + ":" + mini;
    }
    stime.setAttribute("value", def_stime);

    if (page_info.filter.time.end != null) {
        var etime = document.querySelector("input[name='etime']");
        etime.setAttribute("value", page_info.filter.time.end);
    }

    var ddd = document.querySelector("input[name='date']");
    if (page_info.filter.time.date != null) {
        ddd.setAttribute("value", page_info.filter.time.date);
    } else {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + day;
        }
        var day = d.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var def_stime = year + '-' + month + '-' + day;
        ddd.setAttribute("value", def_stime);
    }

    return (document.querySelector("html").outerHTML);
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
        mysql_connection.query('select phone, password from information where phone=\'' + info.uid + '\'', function (error, results, fields) {
            if (error) throw error;
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
                    res.redirect('/default_page');
                });
                return;
            }
        });
    } else {
        // 在数据库中检索用户密码是否匹配
        mysql_connection.query('select phone, password from information where phone=\'' + info.uid + '\'', function (error, results, fields) {
            if (error) throw error;
            if (results.length != 1) {
                res.type('text');
                res.end(results.length == 0 ? "没有此用户啊，请返回重试" : "数据库设计有bug! 请联系管理员");
                return;
            } else {
                if (results[0].password != info.psd) {
                    res.type('text');
                    res.end("密码不匹配，请返回重试");
                    return;
                }
                mysql_connection.query('SELECT * from user where phone=\'' + info.uid + '\';', function (error, results, fields) {
                    if (error) throw error;
                    if (results.length == 1) {
                        page_info.user.name = results[0].username;
                        page_info.user.sex = results[0].sex;
                        page_info.user.idid = results[0].identifycard;
                        page_info.user.has_info = true;
                    } else {
                        page_info.user.name = "无名用户";
                    }
                    // TODO: 检查个人订阅信息
                    page_info.user.phone = info.uid;
                    res.redirect('/default_page');
                });
                return;
            }
        });
    }
});

app.get('/select-place', function (req, res) {
    var ans = req.query.position;

    console.log('筛选地点:', ans);

    var tem = ""
    if (ans instanceof Array) {
        for (var i = 0; i < ans.length; i++) {
            tem += ('siteno=\'' + ans[i] + '\'')
            if (i != ans.length - 1) {
                tem += " OR ";
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
        res.redirect('/default_page');
    });
});

app.get('/modify', function (req, res) {
    var ans = req.query;

    console.log('修改用户信息:', ans);

    if (ans.sex == undefined) {
        res.end(modifypage_action());
        return;
    } else {
        // ! 修改用户信息
        page_info.user.sex = ans.sex;
        page_info.user.idid = ans.id;
        page_info.user.name = ans.username;
        if (page_info.user.has_info == true) {
            var mysql_cmd = "update user set sex='" + ans.sex + "',identifycard='" + ans.id + "',username='" + ans.username + "' where phone='" + page_info.user.phone + "';"
            mysql_connection.query(mysql_cmd, function (error, results, fields) {
                if (error) throw error;
                if (ans.psd != '') {
                    mysql_cmd = "update information set password='" + ans.psd + "' where phone='" + page_info.user.phone + "';"
                    mysql_connection.query(mysql_cmd, function (error, results, fields) {
                        if (error) throw error;
                        res.redirect('/default_page');
                        return;
                    });
                } else {
                    res.redirect('/default_page');
                    return;
                }
            });
        } else { // add info to database
            var mysql_cmd = "INSERT INTO `user` VALUES ('" + page_info.user.phone + "','" + ans.username + "','" + ans.sex + "','" + ans.id + "','80');"
            mysql_connection.query(mysql_cmd, function (error, results, fields) {
                if (error) throw error;
                page_info.user.has_info = true;
                if (ans.psd != '') {
                    mysql_cmd = "update information set password='" + ans.psd + "' where phone='" + page_info.user.phone + "';"
                    mysql_connection.query(mysql_cmd, function (error, results, fields) {
                        if (error) throw error;
                        res.redirect('/default_page');
                        return;
                    });
                } else {
                    res.redirect('/default_page');
                    return;
                }
            });
        }
    }
});

app.get('/filter', function (req, res) {
    var ans = req.query;

    console.log('选择时间:', ans);

    var da, st, et;

    if (ans.date != undefined) {
        page_info.filter.time.date = ans.date;
        page_info.filter.time.start = ans.stime;
        page_info.filter.time.end = ans.etime;

        da = ans.date;
        st = ans.stime + ":00";
        et = ans.etime + ":00";
    } else {
        da = page_info.filter.time.date;
        st = page_info.filter.time.start + ":00";
        et = page_info.filter.time.end   + ":00";
    }

    var cmd = 'select * from apply where startdate=\'' + da + '\' AND ((\'' + st + '\' between st and et) OR (\'' + et + '\' between st and et) OR ( \'' + st + '\' < st AND \'' + et + '\' > et ));'
    mysql_connection.query(cmd, function (error, results, fields) {
        if (error) throw error;
        page_info.inflect = results;
        res.redirect('/default_page');
    });
});

app.get('/default_page', function(req, res) {
    res.end(mainpage_action());
})


// INSERT INTO `apply` VALUES ('11244678912', 'B201603004', '2022-11-29', '07:00:00', '10:00:00','50');

function add_apply_cmd(roomno) {
    var st = page_info.filter.time.start + ":00";
    var et = page_info.filter.time.end   + ":00";
    var dbg = "INSERT INTO `apply` VALUES ('" + page_info.user.phone + "', '" + roomno + "', '" + page_info.filter.time.date + "', '" + st + "', '" + et + "','50');"
    return dbg
}

app.get('/yuyue', function (req, res) {
    var ans = req.query.seat;

    console.log('预约申请:', ans);

    if (ans instanceof Array) {
        var tem = "预约者: ['"
        for (var i = 0; i < ans.length; i++) {
            tem += (ans[i])
            if (i != ans.length - 1) {
                tem += "', ";
            } else {
                tem += "'],"
            }
        }
        console.warn('array!', tem);
    } else {
        mysql_connection.query(add_apply_cmd(ans), function (error, results, fields) {
            if (error) {
                console.warn('insert data error:');
                console.log(error);
                res.redirect('/default_page');
                return;
            };

            var da = page_info.filter.time.date;
            var st = page_info.filter.time.start + ":00";
            var et = page_info.filter.time.end   + ":00";
            var cmd = 'select * from apply where startdate=\'' + da + '\' AND ((\'' + st + '\' between st and et) OR (\'' + et + '\' between st and et) OR ( \'' + st + '\' < st AND \'' + et + '\' > et ));'
            mysql_connection.query(cmd, function (error, results, fields) {
                if (error) throw error;
                page_info.inflect = results;
                res.redirect('/default_page');
            });
        });
    }
});

app.get('/my_yuyue', function (req, res) {
    var ans = req.query;

    console.log('查看预约:', ans);

    if (ans.del == undefined) {
        // default page 
        cmd = "select * from apply where phone=\'" + page_info.user.phone + "\';"
        mysql_connection.query(cmd, function (error, results, fields) {
            if (error) throw error;
            page_info.yuyued = results;
            res.end(yuyuedpage_action());
        });
    } else {
        // delete data from base
        var q = ans.del.split(":");
        cmd = "delete from apply where phone=\'" + page_info.user.phone + "\' AND roomno=\'" + q[0] + "\' and startdate=\'" + q[1] + "\';"
        mysql_connection.query(cmd, function (error, results, fields) {
            if (error) throw error;
            // page_info.yuyued = results;
            res.redirect('/my_yuyue');
        });   
    }
});

var server = app.listen(8888);

console.log("listen @ http://:::8888")