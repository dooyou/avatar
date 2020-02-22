const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
  host : 'us-cdbr-iron-east-04.cleardb.net',
  user : 'b876f255aa5580',
  password : '2d0e4833',
  database : 'heroku_87b90e8f22d9be2',
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
       res.render('index', { title:'Express',albumList});
       //console.log(albumList);
    }
  });
//connection.end();
});

module.exports = router;
