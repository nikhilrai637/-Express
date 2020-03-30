var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var fortune = require('./lib/fortune.js');
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port', process.env.PORT || 3000);





//Middleware for static files
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
res.render('home');
});
app.get('/about', function(req, res){
res.render('about',{fortune: fortune.getFortune()});
});
// custom 404  catch-all handler (middleware)
app.use(function(req, res){
res.status(404);
res.send('404');
});    
// custom 500 error handler (middleware)
app.use(function(err, req, res, next){
console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send('500 - Server Error');
});
app.listen(app.get('port'), function(){
console.log( 'Express started on  http://localhost: '+
app.get('port') + '; press Ctrl-C to terminate.' );
});
