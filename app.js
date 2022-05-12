const express= require('express');
const app= express();
const port= 2022;
let score=0;
let index=0;
const questions= ['1, 1, 2, 3, 5',
                '1, 4, 9, 16, 25', 
                '2, 3, 5, 7, 11',
                '1, 2, 4, 8, 16',
                '1, 2, 3, 4, 5',
              ];
const answers= [9, 36, 13, 32, 6];


// middleware: parse incoming request
app.use(express.json());
app.use(express.urlencoded());

//Starting the viewEngine to handle the pug to html rendering tasks.
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//when the user request via the brawser is  localhost:2020/  execute the index.pug to render the the page 
//where a user play the numquize game.
app.get('/', function(req, res){
  index=0;
  res.render('index', {score: score, sequence: questions[index]});
});

//this handles the the action when a user submits his tryers.
app.post('/submit', function(req, res){

  
  var input= req.body.answer;
  if(input== answers[index]){
    score++;
  }
  index++;
  if(index==questions.length){
    res.render('result', {score: score, max: questions.length});//the viewEngin will render the result.pug to show the result page to the user.
    index=0;
    score=0;
    return;
  }
  res.render('index', {score: score, sequence:questions[index] });

  
});



app.listen(port, ()=> console.log("Server start on port "+ port))


