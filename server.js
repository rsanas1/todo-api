var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;

var todos=[{

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
];

app.get('/',function(req,res){
	res.send('Todo API root');
});

app.get('/todos',function(req,res){
	res.json(todos);

});

app.listen(PORT,function(){

	console.log('Express Listening on PORT '+PORT);
})