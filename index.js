var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');


var app = express();

//Configure tempate engine
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Set up static folder
app.use(express.static(__dirname + '/public'));

var user = 'azat_co';
var story_slug = 'kazan';

//Paste your values
var api_key = "";
var username = "";
var _token = "";

app.get('/', function(req, res, next) {
    console.log("here we are the middleware ");
    next();
  },
  function(req, res) {
    //Fetch elements from server
    superagent.get("http://app1-by-herry.herokuapp.com/messages/list.json")
      .set({
        Accept: 'text/html'
      })
      .end(function(e, messages) {
        console.dir(JSON.parse(messages.text));
        if (e) next(e);
        //res.end("OK");
        //Render template with story object in response body     
        return res.render('msgs', {elements: JSON.parse(messages.text)});
      })
  });


app.listen(3001);