import {addkeep} from './insert.js';
import {delkeep} from './del.js';
import {select} from './select.js';
import {update} from './update.js';
function card(){
    $.get('javascript/module/card.html',function(data){
        $('#body').html(data);

        $.ajax({
            type:"POST",
            url:"back/writer/showkeep.php",
            success: function (data){
                //console.log(data);
                let response = JSON.parse(data);
                if(response['status'] !== 200){
                    $('#toast_title').html("　Warning");
                    $('#toase_bg').attr('class',"toast-header bg-danger text-white");
                    $('#toast_body').html(response['data']);
                    $('#toast-list').toast('show');
                }   
                
                let d = response['data'];
                if(d == "No Keep Found"){
                    $.get('javascript/module/cards.html',function(html){
                        $('#card').append(html);
                        $('.btn-group').html("");
                        $('#card_text').html("Enter today’s thoughts above");
                        $('#card_time').html("just now");
                    });
                }else{
                    d.forEach(function(e,index){
                        setTimeout(function(){
                            $.get('javascript/module/cards.html',function(html){
                                //console.log(html);
                                $('#card').append(html);
                                $('.card_text').last().html(e['text']);
                                $('.card_time').last().html(e['date']);
                                $('.btn-group').last().attr('post',e['id']);
                                if(index == d.length-1){
                                    $(".delete").click(function(){
                                        delkeep($(this).parent('.btn-group').attr('post'));
                                    })
                                    $(".update").click(function(){
                                        //.parent('.btn-group').attr('post');
                                        if($(this).attr("class") == "btn btn-sm btn-outline-secondary update"){
                                            $(this).attr("class","btn btn-sm btn-outline-danger update");
                                            select($(this).closest('.card-body'));
                                        }else{
                                            $(this).attr("class","btn btn-sm btn-outline-secondary update");
                                            update($(this).closest('.card-body'));
                                        }
                                    })
                                }
                            });
                        }, 70*index);
                    });
                    
                }
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

        $("#addkeep").click(function(){
            addkeep();
        });
    });
}
export{card};