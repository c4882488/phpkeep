import {signup} from './signup.js';
import {home} from '../writer/home.js';

function login(){
    $.get('javascript/module/login.html',function(data){
        $('#body').html(data);

        $("#signups").click(function(){
            signup();
        })
        $("#submit").click(function (){
            $.ajax({
                type:"POST",
                url:"back/user/login.php",
                data:{
                    'email':$('#email').val(),
                    'password':$('#password').val(),
                },
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
                            home();
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
        })
    })
    
}
export{login};