var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var mysql = require('mysql');


router.post('/getProductDataById',function(req,res){
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
			con.query("select * from products WHERE pid = ?",[pid], function(err, rows){
				var productDataById = {};
				productDataById.data = rows;
				productDataById.data[0].productimage = new Buffer(productDataById.data[0].productimage).toString();
				res.send(JSON.stringify(productDataById.data[0]));
			});
			con.end();
		}
	});	
});

router.post('/updateProductDataById',function(req,res){
  var procuctdata = {
  	  pid:req.body.pid,
	  productname:req.body.pname,
	  productcategory:req.body.pcategory,
	  productvendor:req.body.pvendor,
	  productprice:req.body.price,
	  productmanufacture:req.body.pmanufacture,
	  productdescription:req.body.pdescription,
	  productimage:req.body.editImage
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
			con.query('UPDATE products SET ? WHERE ?', [{ productname:req.body.pname,
	  productcategory:req.body.pcategory,
	  productvendor:req.body.pvendor,
	  productprice:req.body.price,
	  productmanufacture:req.body.pmanufacture,
	  productdescription:req.body.pdescription,
	  productimage:req.body.editImage }, { pid:req.body.pid }], function(err){
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

module.exports = router;