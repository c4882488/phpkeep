import {login} from './login.js';

function signup(){
    $.get('javascript/module/sign.html',function(data){
        $('#body').html(data);
        $("#submit").click(function(){
            
            $.ajax({
                type:"POST",
                url:"back/user/insta.php",
                data:{
                    'name':$('#name').val(),
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
                            login();
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
export{signup};