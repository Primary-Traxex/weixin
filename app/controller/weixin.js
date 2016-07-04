var OAuth = require('wechat-oauth');
var config = require('config');
// var User = require('../models/user');


var app_id     = config.get('wx.app_id');
var app_secret = config.get('wx.app_secret');
var client = new OAuth(app_id,app_secret);

exports.transmitUrl = function (req,res) {
    var url = client.getAuthorizeURL('http://ddziyuan.ngrok.cc/callback', 'STATE', 'snsapi_userinfo');
    res.redirect(url);
    // console.log(url + '网址')
};    

exports.callbackUrl = function (req, res) {
    // console.log('----------weixin callback-----------');
    var code = req.query.code;
    var User = require('../models/user');

    client.getAccessToken(code, function (err, result) {
        if (err){
            console.dir(err);
            console.dir(result);
        } else{
            var accessToken = result.data.access_token;
            var openid = result.data.openid;

            // console.log('token=' + accessToken);
            // console.log('openid=' + openid);

            User.findOne({openid: openid}, function (err, user) {
                // console.log('微信回调后, User.find_by_openid(openid) 返回的user = ' + user);
                if(err || user == null){
                    // console.log('user is not exist.');
                    client.getUser(openid, function (err, result) {
                        if (err){
                            console.log(err)
                        } else{
                            // console.log('use weixin api get user: ' + result.nickname);
                            var headimg = result.headimgurl;
                            console.log('头像'+headimg);
                            // var oauth_user = result;
    
                            var _user = new User({
                                headimg:headimg,
                                name: result.nickname,
                                password: 123,
                                openid: result.openid,
                                role: 1
                            });
                            // _user.name = oauth_user.nickname;
                            // _user.nickname = oauth_user.nickname;
    
                            _user.save(function (err, user) {
                                if (err){
                                    console.log('User save error ....' + err);
                                    res.redirect('index')
                                }else{
                                    console.log('User save sucess ....' + err);
                                    req.session.user = user;
                                    res.redirect('/index');///user/' + user._id + '/verify
                                }
                            });
                        }
                        
                    });
                }else {
                    console.log('根据openid查询,用户已经存在');
                    // if(user){
                    req.session.user = user;
                    res.redirect('/index');
                    // }else{
                    //     req.session.current_user = void 0;
                    //     res.redirect('/user/' + user._id + '/verify');
                    // }
                }
            })
        }


    })
};


