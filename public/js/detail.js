$(function () {
    $('.comment').click(function (e) {
        var target = $(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');
        if ($('#toId').length > 0){
            $('#toId').val(toId)
        }
        else {
                $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm')
        }

        if ($('#commentId').length > 0){
            $('#commentId').val(commentId)
        }
        else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm')
        }
    });
    $('.form-inline button').click(function (e) {
        var toEmail = $(".toemail").val();
        var vedioUrl = $(".vedio").attr("src");
        var vedioName = $("dd:first").text();
        // $(document).ajaxSuccess(function () {
        //     alert("邮件发送成功!")
        // });
        $.ajax({
            type:"POST",
            url:"/email",
            dataType:'json',
            data:{
                toEmail:toEmail,
                vedioUrl:vedioUrl
            }
            // ,success:function () {
            //     alert(vedioName)
            // }
        });
        alert('电影:'+ vedioName + '发送成功')
    })
});