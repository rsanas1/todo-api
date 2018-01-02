var express=require('express');
var bodyParser = require('body-parser');

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
	var match;
	todos.forEach(function(todo){

		if(todo.id === item_id){
			match=todo;
		}
	});

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

	body.id = todoNextId;
	todoNextId++;

	todos.push(body);

	res.json(todos);
});

app.listen(PORT,function(){

	console.log('Express Listening on PORT '+PORT);
})