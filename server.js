var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var server = app.listen(8000,"127.0.0.1", function (){

    var host = server.address().address
    var port = server.address().port    
    console.log("server running at",port)
});

var connection = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password:'',
    database:'raj_db'
  });
  connection.connect(function(err){
    if(err) throw err
    console.log('Now connected to database!')
  })

  //rest api to create a new record into mysql database
    app.post('/insertpost', function (req, res) {
        var postData  = req.body;
        
        connection.query('INSERT INTO blogs SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });


  //rest api to See All  Records  of table
  app.get('/allpost',function(req,res){
    console.log(req);
    connection.query('SELECT * from blogs', function(error,results,fields){
      if (error) throw error;
      console.log('query Completed , Record updated!')
      res.end(JSON.stringify(results));
    });
  });


   //rest api to get a single post data
app.get('/singlePost/:id', function (req, res) {
    connection.query('select * from blogs where id=?', [req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

  //rest api to delete record from  database
app.delete('/delpost', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `blogs` WHERE `id`=1',  function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });

