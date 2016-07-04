var Index = require('../app/controller/index');
var User = require('../app/controller/user');
var Movie = require('../app/controller/movie');
var Comment = require('../app/controller/comment');
var Category = require('../app/controller/category');
var Weixin = require('../app/controller/weixin');
var Email = require('../app/controller/email');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// var OAuth = require('wechat-oauth');

module.exports = function (app) {

// pre handle user
app.use(function (req,res,next) {
    var _user = req.session.user;

    app.locals.user = _user;
    next()
});
    
    
//Index
app.get('/index', Index.index);

//User
app.post('/user/signup', User.signup);
app.post('/user/signin', User.signin);
app.get('/signin', User.showSignin);
app.get('/signup', User.showSignup);
app.get('/logout', User.logout);
app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);

//Movie
app.get('/movie/:id', Movie.detail);
app.get('/admin/movie/new', User.signinRequired, User.adminRequired,Movie.new);
app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired,Movie.update);
app.post('/admin/movie/update/:id', User.signinRequired, User.adminRequired,Movie.save);
app.post('/admin/movie/new', multipartMiddleware,User.signinRequired, User.adminRequired,Movie.savePoster,Movie.save);
app.get('/admin/movie/list', User.signinRequired, User.adminRequired,Movie.list);
app.delete('/admin/movie/list', User.signinRequired, User.adminRequired,Movie.del);


// Comment
app.post('/user/comment', User.signinRequired,Comment.save);


// Category
app.get('/admin/category/new', User.signinRequired, User.adminRequired,Category.new);
app.post('/admin/category', User.signinRequired, User.adminRequired,Category.save);
app.get('/admin/category/list', User.signinRequired, User.adminRequired,Category.list);

// results
app.get('/results', Index.search);

// wechat
app.get('/', Weixin.transmitUrl);
app.get('/callback', Weixin.callbackUrl);
    
//email
app.post('/email', Email.toemail);
};