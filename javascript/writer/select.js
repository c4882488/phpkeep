function select(e){
    //console.log(e.find('p').html('<textarea class="form-control" rows="3">今天的心情：怕怕怕怕怕</textarea>'));
    //console.log(e.find('.btn-group').attr('post'))
    $.ajax({
        type:"POST",
        url:"back/writer/select.php",
        data:{
            'id':e.find('.btn-group').attr('post'),
        },
        success: function (data){
            //console.log(data);
            let response = JSON.parse(data);
            
            $.get('javascript/module/toast.html',function(html){
                $('#toast').html(html);
                console.log(response['status']);
                if(response['status'] == 200){
                    e.find('.update').attr("class","btn btn-sm btn-outline-danger update");
                    e.find('p').html('<textarea class="form-control" rows="3">'+response['data']['text']+'</textarea>');
                }else{
                    $('#toast_title').html("　Warning");
                    $('#toase_bg').attr('class',"toast-header bg-danger text-white");
                    $('#toast_body').html(response['data']);
                    $('#toast-list').toast('show');
                }   
                
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
}
export{select};