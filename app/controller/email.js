var nodemailer = require('nodemailer');

exports.toemail = function (req, res) {
    var toEmail = req.body.toEmail;
    var vedioUrl = req.body.vedioUrl;
    console.log('发送邮件到此邮箱:'+toEmail);
    var transporter = nodemailer.createTransport({
        service: 'QQ',
        auth: {
            user:'513098327@qq.com',
            pass:'pofrlqwkgrpubjci'
        }
    });
    
    var mailOptions = {
        from: '源 Primary_Traxex<513098327@qq.com>',
        to:toEmail,
        text:'Hello world',
        html:vedioUrl
    };
    
    transporter.sendMail(mailOptions,function (error, info) {
        if(error){
            console.log(error);
        }else {
            console.log('邮件发送:' + info.response + mailOptions.html)
        }
    });
};