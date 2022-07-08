	var http = require("http");
	var express = require('express');
	var app = express();
	var mysql      = require('mysql');
	var bodyParser = require('body-parser');


  var connection = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password:'',
    database:'raj_db'
  });

  connection.connect(function(err){
    if(err) throw err
    console.log('Now connected!')
  })
  
   app.get('/check',function(req,res){
    console.log(req);
    connection.query('SELECT * from blogs', function(error,results,fields){
      if (error) throw error;
      console.log('query resolved')
      res.end(JSON.stringify(results));
    });
  });
 

  app.use(bodyParser.json() );
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  
