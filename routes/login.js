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

router.post('/logindata',function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  console.log(username);
  var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'bluelounge'
	});
  var userDetails = {};
    con.connect(function(err){
    	console.log("connect");
		if (err) {
			console.log("Error while communicating to database ");
			res.send("connectionFail");
		} else {
			con.query("select username,password from userdetails WHERE username = ? and password = ?",[username,password], function(err, rows){
				userDetails.data = rows;
				if(userDetails.data.length < 1){
					console.log("Invalid user");
					res.send("fail");
				}else{
					console.log("Valid user!");
					res.send("success");
				}
			});
			con.end();
		}
	});	
});

module.exports = router;
