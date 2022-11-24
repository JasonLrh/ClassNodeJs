const express = require('express');
var app       = express();

const fs      = require('fs');
const jsdom   = require('jsdom');
const {JSDOM} = jsdom;


// * start: mysql *************************************************************
const mysql   = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'db_book'
});

connection.connect();
var place;
var users;

// function get_data_from_mysql(order) {
//     var conn = connection.query(order, function (error, results, fields) {
//         if (error) throw error;
//         place = results;
//     });

//     conn.
// }

connection.query('SELECT * from bookclass;', function (error, results, fields) {
    if (error) throw error;
    place = results;
});

connection.query('select * from reader;', function (error, results, fields) {
    if (error) throw error;
    users = results;
});


// * end : mysql *************************************************************
const file_root = '../'


function regist_directory(dir) {
    app.use('/' + dir, express.static(file_root + dir));
}

regist_directory('css');
regist_directory('imgs');
regist_directory('js');

app.use('/', function(req, res) {
    const dom = new JSDOM(fs.readFileSync(file_root + 'index.html'));
    const document = dom.window.document
    
    var place_ch = "<select multiple=\"multiple\" class=\"select-item\" name=\"position\" style=\"height: " + (place.length * 50 + 3) + ";\">";
    
    for (var i = 0; i < place.length; i++){
        place_ch += "<option value=\"" + place[i].classno + "\" class=\"btn place-item\">" + place[i].classname + "</option>"
    }
    
    document.getElementById('select-place').innerHTML = place_ch + "</select>";

    var form_ch = "<tr><th>编号</th><th>姓名</th><th>性别</th><th>身份证号</th><th>单位</th></tr>";

    function add_element(ele) {
        return "<td>" + ele + "</td>"
    }
    for (var i = 0; i < users.length; i++){
        // link = users[i].readerno
        form_ch += "<tr onclick=\"yuyue('"+users[i].readerno+"')\">";
        form_ch += add_element(users[i].readerno);
        form_ch += add_element(users[i].readername);
        form_ch += add_element(users[i].sex);
        form_ch += add_element(users[i].identifycard);
        form_ch += add_element(users[i].workunit);
        form_ch += "</tr>";
    }
    document.getElementById('result').innerHTML = form_ch;

    res.end(document.querySelector("html").outerHTML);
});

app.get('/select-place', function(req, res) {
    var ans = req.query.position;

    if (ans instanceof Array) {
        var tem = "place: ['"
        for (var i = 0; i < ans.length; i++){
            // console.log(ans[i])
            tem += (ans[i])
            if (i != ans.length - 1) {
                tem +=  "', ";
            } else {
                tem += "'],"
            }
        }
        console.log(tem);
    } else {
        console.log('place: \'' + ans + '\',')
    }

    res.redirect('/');
});

app.get('/yuyue', function(req, res) {
    var ans = req.query.readerno;

    console.log('yuyue ')

    if (ans instanceof Array) {
        var tem = "预约者: ['"
        for (var i = 0; i < ans.length; i++){
            // console.log(ans[i])
            tem += (ans[i])
            if (i != ans.length - 1) {
                tem +=  "', ";
            } else {
                tem += "'],"
            }
        }
        console.log(tem);
    } else {
        console.log('预约者: \'' + ans + '\',')
    }

    res.redirect('/');
});

var server = app.listen(8888, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
 
});
