var fs        = require('fs');
const jsdom   = require('jsdom');
const {JSDOM} = jsdom;

var mysql     = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'db_book'
});

connection.connect();
var place;
connection.query('SELECT * from bookclass', function (error, results, fields) {
    if (error) throw error;
    place = results;
});

// **************************************************************

setTimeout(function () {
    const file_root = '../'

    const dom = new JSDOM(fs.readFileSync(file_root + 'index.html'));
    const document = dom.window.document
    
    var place_ch = "";
    
    for (var i = 0; i < place.length; i++){
        place_ch += "<option value=\"" + place[i].classno + "\" class=\"btn place-item\">" + place[i].classname + "</option>\n"
    }
    
    document.getElementById('select-place').innerHTML = place_ch;

    console.log(document.querySelector("html").outerHTML);
}, 1000)

