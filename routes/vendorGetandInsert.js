var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'bluelounge'
	});
  con.connect(function(err){
		if (err) {
			console.log("Error while communicating to db ");
		} else {
			con.query("select * from vendordetails", function(err, rows){
				var vendorDetails = {};
				vendorDetails.data = rows;
				res.send(JSON.stringify(vendorDetails));
			});
			con.end();
		}
	});
});

router.post('/vendorData',function(req,res){
  var vendordata = {
	  vid:req.body.vid,
	  vname:req.body.vname,
	  vlocation:req.body.vloc
	}
  console.log(vendordata);
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
			con.query("INSERT INTO vendordetails SET ?",vendordata, function(err){
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
