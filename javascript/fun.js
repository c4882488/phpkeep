function readDoc(href,id){
    $.get(href,function(data){
        $('#'+id).html(data);
    })
}
export{readDoc}