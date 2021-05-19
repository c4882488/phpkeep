import {signup} from '../user/signup.js';
import {login} from '../user/login.js';
import {card} from './card.js';

function setup(){
    $.get('javascript/module/setup.html',function(data){
        $('#body').html(data);
        $("#submit").click(function(){
            $.ajax({
                type:"POST",
                url:"back/user/update.php",
                data:{
                    'password':$('#password').val(),
                    'Repassword':$('#Repassword').val(),
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
                            setTimeout(function(){
                                card();
                            },100);
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
            });
            
        })
        $("#delsubmit").click(function(){
            $.ajax({
                type:"POST",
                url:"back/user/delete.php",
                success: function (data){
                    //console.log(data);
                    let response = JSON.parse(data);
                    
                    $.get('javascript/module/toast.html',function(html){
                        $('#toast').html(html);
                        console.log(response['status']);
                        if(response['status'] == 200){
                            setTimeout(function(){
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
                                    })
                                });
                            },100);
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
            });
        })
    });
}
export{setup};