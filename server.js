var express=require('express');
var bodyParser = require('body-parser');

var _=require('underscore');

var app=express();
var PORT=process.env.PORT || 3000;



var todos=[];
var todoNextId =1;

/*var todos=[{

	id:1,
	description: 'Call Mom',
	completed: false
},
{
	id:2,
	description: 'Water plants',
	completed: false
},
{
	id:3,
	description: 'Watch match',
	completed: true
}
];*/

app.use(bodyParser.json());



app.get('/',function(req,res){
	res.send('Todo API root');
});

app.get('/todos',function(req,res){
	res.json(todos);

});

app.get('/todos/:id',function(req,res){
	//res.send("Requested id is "+req.params.id);
	// params are read as string so convert to integer
	var item_id = parseInt(req.params.id,10);
	var match = _.findWhere(todos,{id:item_id});
	

	if(match){
		res.json(match);
	}
	else{
		res.status(404).send();
	}
});

app.post('/todos',function(req,res){

	var body = req.body;

	/*console.log('description: '+body.description);

	res.json(body);*/



	if(!_.isBoolean(body.completed) ||
		!_.isString(body.description) ||
		body.description.trim().length===0){

		return res.status(400).send();
	}

	body = _.pick(body,"description","completed");
	body.description = body.description.trim();

	body.id = todoNextId;
	todoNextId++;

	todos.push(body);

	res.json(todos);
});

app.delete('/todos/:id',function(req,res){

	var item_id = parseInt(req.params.id,10);

	var match = _.findWhere(todos,{id:item_id});

	if(match){

		todos=_.without(todos,match);

		return res.status(200).json(match).send();

	}

	else{

		return res.status(404).send();
	}
});


app.put('/todos/:id',function(req,res){

	var body = _.pick(req.body,"description","completed");
	body.description = body.description.trim();

	if(!body.hasOwnProperty('completed') || !_.isBoolean(body.completed) ||
		!body.hasOwnProperty('description') || !_.isString(body.description) ||
		body.description.trim().length===0){

		return res.status(400).send();
	}

	


	var item_id=parseInt(req.params.id,10);

	var  match = _.findWhere(todos,{id:item_id});

	if(match){

		//todos = _.without(todos,match);
		body.id = item_id;

		_.extend(match,body);
	}
	else{

		body.id = todoNextId;
		todos.push(body);
		todoNextId++;
	}

	

	res.json(todos);

	
});

app.listen(PORT,function(){

	console.log('Express Listening on PORT '+PORT);
})