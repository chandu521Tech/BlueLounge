var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var mysql = require('mysql');

router.post('/deleteProductDataById',function(req,res){
  console.log(req);
  var pid=req.body.pid;
  console.log(pid);
  var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'bluelounge'
	});
    con.connect(function(err){
    	console.log("connect");
		if (err) {
			console.log("Error while communicating to database ");
			res.send("connectionFail");
		} else {
			con.query("DELETE FROM products WHERE pid = ?",[pid], function(err, rows){
				if(err){
					console.log("delection failed");
					res.end("fail");
				}else{
					console.log('Deleted ' + rows.affectedRows + ' rows');
					console.log("succss");
					res.end("success");
				}
			});
			con.end();
		}
	});	
});

module.exports = router;