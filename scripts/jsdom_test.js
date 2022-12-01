const mysql = require('mysql');
var mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'self_studyroom',
    timezone: "STSTEM"
});


cmd = "select * from apply where phone=\'18507202657\';"
mysql_connection.query(cmd, function (error, results, fields) {
    if (error) throw error;
    var date = results[0].startdate + ""
    console.log(date)
});