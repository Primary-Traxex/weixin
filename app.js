var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var fs = require('fs');
var dburl = 'mongodb://localhost/imooc';
var serveStatic = require('serve-static');


mongoose.connect(dburl);

// models loading 'for test'
var models_path = __dirname + '/app/models';
var walk = function (path) {
    fs
        .readdirSync(path)
        .forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)){
                    require(newPath)
                }
            }
            else if (stat.isDirectory()){
                walk(newPath)
            }
        })
};
walk(models_path);

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url:dburl,
        collection: 'sessions'
    })
}));
var env = process.env.NODE_ENV || 'development';

if ('development' === env){
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true)
}

require('./config/routes')(app);
require('./config/weixin_routes')(app);

app.locals.moment = require('moment');
app.listen(port);
app.use(serveStatic(path.join(__dirname, 'public')));


console.log('淘通科技 started on port ' + port);

