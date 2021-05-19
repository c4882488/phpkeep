<?php
$db = "mysql:host=db.mis.kuas.edu.tw;dbname=c108156102;charset=utf8";
@session_start();
function res($status,$text){
    $response['status'] = $status;
    $response['data'] = $text;
    echo json_encode($response);
}
?>