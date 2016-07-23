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

router.post('/signupdata',function(req,res){
  var userdata = {
	  email:req.body.email,
	  username:req.body.username,
	  password:req.body.password,
	  phonenumber:req.body.phoneNumber
	}
  console.log(userdata);
  var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'bluelounge'
	});
    con.connect(function(err){
    	console.log("connect");
		if (err) {
			console.log("Error while communicating to db ");
		} else {
			con.query("INSERT INTO userdetails SET ?",userdata, function(err){
				if(err){
					console.log("Insertion failed");
					res.end("fail");
				}else{
					console.log("insertion success");
					res.end("success");
				}
			});
			con.end();
		}
	});	
});

module.exports = router;
