var url = require('url');

var fs=require("fs");

var path=require('path');

var express = require ( "express" );

var app=express();

//app.set("view engine", "ejs");

//app.set("views" , path.join ( __dirname, 'pages' ));

app.use (express.static (path.join (__dirname,'public')));

var bodyParser= require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true }));

const nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


var gmailInformation = {
    service: 'gmail',
    auth: {
        user: 'devprasan4@gmail.com',
        pass: 'bhardwaj;'
    }
};

var records={};

/* Reads the file at the given path and serves it to the client. The
 * Content-Type header will be set to the . contentType. */
function readAndServe(callback) 
{
  fs.readFile("./records.json", function(error, data) {
    if (error) {
      throw error;
    }
    data=data.toString();
    callback(data);
  });
}

/* Writes the given tasks to the filesystem. Calls the given callback when
 * finished. */
function writeRecords(data, callback) 
{
  fs.writeFile('./records.json', data, function(error) {
  if (error) 
  {
    throw error;
  }
    callback();
  });
}

app.get("/records",function(req,res){
	readAndServe(function(data){
		res.status(200).send(data);
	});

});

app.get('/trackMail/:id', function (req, res) {
	var x=new Date();
   console.log("user tracked:",req.params.id,x);
   fs.readFile('./public/logo.png', function(error, img) 
  {
    if (error) 
	{
      throw error;
    }
    res.writeHead(200, {'Content-type': 'image/png'});
    res.end(img);

  });

});

app.post('/send-mail', function(req,res){
	console.log(req.body);
	var queryUrl="https://mail-tracking.herokuapp.com/trackMail"+ req.body.id;
	var transporter = nodemailer.createTransport(gmailInformation);
	var mailOptions ={
		from: 'devprasan4@gmail.com',
		to: req.body.id, 
		subject: 'Cruisecoder ✔', 
		text: 'Hello world ?'
		};
	//https://firebasestorage.googleapis.com/v0/b/consicious-commerce.appspot.com/o/logo.png?alt=media&token=5ca9fa97-e19c-483f-8db6-c6bb6d0f41f3
	mailOptions.html = "<h2>Hello</h2><p>"+ req.body.text +"</p><img src='"+ queryUrl +"'>";
	transporter.sendMail(mailOptions, (error, info) =>{
		console.log("inside");
	    if (error) 
	    {
	        return console.log(error);
	        res.send(400).send(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	    res.status(200).send();
	});

});

	var queryUrl="https://mail-tracking.herokuapp.com/trackMail/prasandev14@gmail";
	var transporter = nodemailer.createTransport(gmailInformation);
	var mailOptions ={
		from: 'devprasan4@gmail.com',
		to: "prasandev14@gmail.com", 
		subject: 'Cruisecoder ✔', 
		text: 'Hello world ?'
		};
	//https://firebasestorage.googleapis.com/v0/b/consicious-commerce.appspot.com/o/logo.png?alt=media&token=5ca9fa97-e19c-483f-8db6-c6bb6d0f41f3
	mailOptions.html = "<h2>Hello</h2><p>Hello USER.</p><img src='"+ queryUrl +"'>";
	transporter.sendMail(mailOptions, (error, info) =>{
		console.log("inside");
	    if (error) 
	    {
	        return console.log(error);
	        res.send(400).send(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	    res.status(200).send();
	});
app.listen(5000);

console.log("server running...........");




//3003465 95 60.3 1/4/15