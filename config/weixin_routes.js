/*
 * Created by Administrator on 2016/5/31.
 */
var Weixin = require('weixin-apis');
var API = require('wechat-api');
var config = require('config');
var async = require('async');

var app_id     = config.get('wx.app_id');
var app_secret = config.get('wx.app_secret');
var menu_config = config.get('wx.wx_menu');
var api = new API(app_id, app_secret);
// api.moveUserToGroup()
api.getGroups(function (err,result) {
    console.log("分组: "+result.groups[0].name + result.groups[0].id+";  人数: "+result.groups[0].count);
    console.log("分组: "+result.groups[1].name + result.groups[1].id+ ";  人数: "+result.groups[1].count);
    console.log("分组: "+result.groups[2].name + result.groups[2].id+ ";  人数: "+result.groups[2].count)
});
module.exports = function (app) {
    var weixin = new Weixin({
        app: app,
        appid: app_id,
        appsecret: app_secret,
        token: 'qbtest'
    });
//    api.getMenu(function(err,result){
//	console.log(result.menu.button[0].sub_button)
//    });
    api.createMenu(menu_config, function(err,result){
	console.log('目录创建' + result.errmsg)
    });
    
    weixin.on('allMsg', function (data) {
	async.waterfall([
	    function(cb){
		api.getUser({openid:data.fromUserName, lang: 'zh_CN'},function (err,result) {
	           cb(err,result.nickname); 
                });
	    }
        ],function(err,results){
	    weixin.sendTextMsg({
            toUserName: data.fromUserName,
            fromUserName: data.toUserName,
            content:results  
            });
       });
    });
    weixin.on('VIEWEventMsg', function (data) {
        // console.log(data);
        api.getUser({openid:data.fromUserName, lang: 'zh_CN'},function (err,result) {
            // console.log(result.nickname)
        });
    })
};


