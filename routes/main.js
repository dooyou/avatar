const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
  host : 'adidas03315.cafe24.com',
  user : 'adidas03315',
  password : 'milkymilky87*',
  database : 'adidas03315',
  port : '3306',
  multipleStatements: true,
  typeCast : (field, next) => {
    if (field.type == 'VAR_STRING') {
        return field.string();
    }
    return next();
    }
});
connection.connect();

/* GET home page. */
router.get('/', (req, res, next) => {
  let albumList = [];
  connection.query('SELECT * FROM album', (error, results, fields) => {
    if(error) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    } else {
      results.forEach((item, i) => {
        let album = {
          'category':item.category,
          'contents':item.contents,
          'photo':item.photo,
          'releasedate':item.releasedate
        }
        albumList.push(album);
      });
       res.render('main', { title:'Main',albumList});
       //console.log(albumList);
    }
  });
//connection.end();
});

module.exports = router;
