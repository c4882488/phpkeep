import {card} from './card.js';

function delkeep(e){
    //console.log(e);
    $.ajax({
        type:"POST",
        url:"back/writer/delete.php",
        data:{
            'id':e,
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
    setTimeout(function(){
        card();
    },100);
}
export{delkeep};