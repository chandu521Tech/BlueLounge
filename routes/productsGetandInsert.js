var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var mysql = require('mysql');

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
			con.query("select * from products", function(err, rows){
				var productDetails = {};
				productDetails.data = rows;
				//console.log(productDetails.data[0].productimage);
				//console.log(productDetails.data);
				for(var i=0;i<productDetails.data.length;i++){
					//console.log(productDetails.data[i].productimage);
					productDetails.data[i].productimage = new Buffer(productDetails.data[i].productimage).toString();//encode to base64
				}
				res.send(JSON.stringify(productDetails));
			});
			con.end();
		}
	});
});

router.post('/productsData',function(req,res){
  var procuctdata = {
	  productname:req.body.pname,
	  productcategory:req.body.pcategory,
	  productvendor:req.body.pvendor,
	  productprice:req.body.price,
	  productmanufacture:req.body.pmanufacture,
	  productdescription:req.body.pdescription,
	  productimage:req.body.pImage
   }
  console.log(procuctdata);
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
			con.query("INSERT INTO products SET ?",procuctdata, function(err){
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