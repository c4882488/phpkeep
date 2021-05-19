import {signup} from './user/signup.js';
import {login} from './user/login.js';
import {home} from './writer/home.js';

$().ready(function(){
    $.get('javascript/module/login_icon.html',function(data){
        $('#href').html(data);
        
        $("#signup").click(function(){
            signup();
        })
        $("#login").click(function(){
            login();
        })
    })
    //console.log(Cookies.get('account'));
    if(Cookies.get('account') != null){
        //console.log('以登入');
        home();
    }
})