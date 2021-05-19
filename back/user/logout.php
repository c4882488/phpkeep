<?php
include '../conn.php';
try{
    unset($_SESSION['id']);
    unset($_SESSION['account']);
    setcookie("account", "", time() - 4000,"/");
    res(200,'Logout Suceesfully');
}catch(Exception $e){
    res($e->getCode(),$e->getMessage());
}
?>