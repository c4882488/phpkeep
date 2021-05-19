import {card} from './card.js';
import {setup} from './setup.js';
import {logout} from '../user/logout.js';

function home(){
    $.get('javascript/module/logout_icon.html',function(data){
        $('#href').html(data);
        card();
        $("#writrt").click(function(){
            card();
        })
        $("#setup").click(function(){
            setup();
        })
        $("#logout").click(function(){
            logout();
        })
    });
}
export{home};