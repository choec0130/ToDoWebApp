var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({extended:false});

//connect to database
mongoose.connect('mongodb://chloe:thisischloe123@ds231643.mlab.com:31643/todoapp-chloe',  {useNewUrlParser: true});

//create schema for data
var todoSchema = new mongoose.Schema({
	item: String
});

var todomodel = mongoose.model('Todo', todoSchema);


module.exports = function(app) {

	app.get('/todo', function(request, response) {
		//get data from mongoDB and pass to view

		//retrieves all items in todomodel
		todomodel.find({}, function(err, data) {
			if (err) {
				throw err;
			}
			response.render('todo', {todos: data});
		});
		
	});

	app.post('/todo', urlencodedParser, function(request, response) {
		//get data from view and add to mongoDB
		var newtodomodel = todomodel(request.body).save(function(err, data) {
			if (err) {
				throw err;
			} 
			response.json(data);
		});
		
	});

	app.delete('/todo/:item', function(request, response) {
		//delete item from mongoDB
		todomodel.find({item: request.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) {
			if (err) {
				throw err;
			}
			response.json(data);
		})


	});
};