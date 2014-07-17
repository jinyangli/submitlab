
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , eh = require('errorhandler')
  , multer = require('multer')
  , stylus = require('stylus')
  , url = require('url');

//var app = module.exports = express.createServer();
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

//app.set('upload_dir', __dirname + '/uploads');
//app.set('upload_suffix', '.tgz');
routes.set_param_upload_dir(__dirname + '/uploads');
routes.set_param_upload_suffix('.tex');

var env = process.env.NODE_ENV || 'development';
if (env == 'development')  {
	app.use(eh());
} 

app.use(express.static(__dirname + '/public'));
app.use(stylus.middleware({ src: __dirname + '/public'}));

app.use(multer({ dest: __dirname + '/uploads/tmp/'}));

app.use(function(req, res, next) {
		console.log('%s %s', req.method, req.url);
		next();
});

// get /submit?lab=i&&netid=xx&&uid=yy
app.get('/submit', routes.submit);
app.get('/ajax/getstatus', routes.getstatus);
app.post('/upload', routes.upload); 

var server = app.listen(3000, function(){
  console.log('Express server listening on port %d', server.address().port);
});
