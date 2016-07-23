var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/getVendorDataById',function(req,res){
  var vid=req.body.vid;	
  console.log(vid);
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
			con.query("select * from vendordetails WHERE vid = ?",[vid], function(err, rows){
				var vendorDataById = {};
				vendorDataById.data = rows;
				res.send(JSON.stringify(vendorDataById.data[0]));
			});
			con.end();
		}
	});	
});

router.post('/updateVendorDataById',function(req,res){
  var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'bluelounge'
	});
    con.connect(function(err){
    	console.log("connect");
		if (err) {
			console.log("Error while communicating to db");
		} else {
			con.query('UPDATE vendordetails SET ? WHERE ?', [{ vname:req.body.vname,
	  vlocation:req.body.vlocation}, { vid:req.body.vid }], function(err){
				if(err){
					console.log("updation failed");
					res.end("fail");
				}else{
					console.log("updation success");
					res.end("success");
				}
			});
			con.end();
		}
	});	
});

router.post('/deleteVendorDataById',function(req,res){
  console.log(req);
  var vid=req.body.vid;
  console.log(vid);
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
			con.query("DELETE FROM vendordetails WHERE vid = ?",[vid], function(err, rows){
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
