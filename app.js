var express = require('express');
var controller = require('./controllers/controller');

var app = express();

//set up template engine

app.set('view engine', 'ejs');

//static files

app.use(express.static('./public'));

//fire controllers
controller(app);

//listen to port
app.listen(3000);
console.log('Currently on port 3000');
console.log('Connect with localhost:3000/todo');