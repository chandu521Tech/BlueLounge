var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  var data={
  	name:"chandu",
  	age:23
  }
  res.send(data);
});

router.post('/adminLoginData',function(req,res){
  var adminname=req.body.adminname;
  var password=req.body.password;
  var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'bluelounge'
	});
  var adminDetails = {};
    con.connect(function(err){
    	console.log("connect");
		if (err) {
			console.log("Error while communicating to db ");
			res.end("connectionFail");
		} else {
			con.query("select adminname,password from admin WHERE adminname = ? and password = ?",[adminname,password], function(err, rows){
				adminDetails.data = rows;
				if(adminDetails.data.length < 1){
					console.log("Invalid creds");
					res.end("fail");
				}else{
					console.log("Valid creds!");
					res.end("success");
				}
			});
			con.end();
		}
	});	
});

module.exports = router;
