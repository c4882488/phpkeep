import {signup} from './signup.js';
import {login} from './login.js';

function logout(){
    $.get('javascript/module/login_icon.html',function(data){
        $('#href').html(data);
        $('#body').html('');
        $("#signup").click(function(){
            signup();
        })
        $("#login").click(function(){
            login();
        })
        $.ajax({
            type:"POST",
            url:"back/user/logout.php",
            success: function (data){
                //console.log(data);
                let response = JSON.parse(data);
                $.get('javascript/module/toast.html',function(html){
                    $('#toast').html(html);
                    console.log(response['status']);
                    if(response['status'] == 200){
                        $('#toast_title').html("　Alert");
                        $('#toase_bg').attr('class',"toast-header bg-warning text-white");
                        $('#toast_body').html(response['data']);
                    }else{
                        $('#toast_title').html("　Warning");
                        $('#toase_bg').attr('class',"toast-header bg-danger text-white");
                        $('#toast_body').html(response['data']);
                    }   
                    $('#toast-list').toast('show');
                });
            },
            error: function (data){
                $.get('javascript/module/toast.html',function(html){
                    $('#toast').html(html);
                    $('#toast_title').html("　Warning");
                    $('#toase_bg').attr('class',"toast-header bg-danger text-white");
                    $('#toast_body').html(data);
                    $('#toast-list').toast('show');
                });
            }
        })
    });
}
export{logout};