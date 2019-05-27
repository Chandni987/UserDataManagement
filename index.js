var express = require('express');
var app = express();
var fs = require('fs');
// MongoDB Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://rajan:rajan028@ds145128.mlab.com:45128/userdata',{ useNewUrlParser: true });
var db = mongoose.connection;

//DB connection Error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("Connected To MLab cloud database");
});


// Schema
var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	DOB:String,
	phoneNumber:String,
	Email:String,
	created:String

});

// Model
var userData = mongoose.model('userData', userSchema);

console.log('soo far not soo good');

app.use(express.static(__dirname+'/public'));


console.log('soo far soo good');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/',function(req, res){
	res.sendFile('home.html',{root:__dirname});
});




app.post('/check',function(req, res){
	var k = req.body.phoneNumber;
    userData.find({phoneNumber:k},function (err, success) {
        if(success.length>0)
          res.send('available');
        else
          res.send('unavailable');
        if (err) 
        	return console.error(err);
    });
});


app.post('/create', function(req, res){

	var fname = req.body.firstName;
	var lname = req.body.lastName
	var dateofbirth = req.body.dob;

	var phone=req.body.phoneNumber;
	var userID=req.body.userName;


	var c = new Date();

		// Adding values in DB
		var newUser = new userData({firstName: fname, lastName:lname, DOB:dateofbirth, phoneNumber:phone, Email:userID, created:c});
		newUser.save(function (err, testEvent) {
  			if (err) 
  				return console.error(err);
  			console.log("data sent to DB");
		});

	res.redirect('/user');
});


app.post('/getUser',function(req,res){

userData.find({},function(err, result){

	console.log(result);
	res.send(result);

});

});

app.post('/deleteUser',function(req,res){

	var k = req.body._id;

	userData.deleteOne({_id:k},function(err, result){

		console.log("result deleted");
		res.send(true);

	});


});







app.post('/updateUser',function(req,res){

	var id = req.body.id;
	var field=req.body.field;
	var upData =req.body.updateData;

	var obj={};
	obj[field]=upData;

	console.log(id,field,upData,obj);


userData.updateOne({_id:id}, obj, function(err, res) {
    if (err)
    	console.log(err);
    else
    	console.log("1 document updated",res);
});

res.send(true);

});



app.get('/user',function(req,res){
	res.sendFile("user.html",{root:__dirname});
});

app.get('/*',function(req, res){
	res.sendFile('error.html',{root:__dirname});
});

app.listen(process.env.PORT || 3000,function(){
	console.log('Server is up and running');
});
