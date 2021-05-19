<?php
include '../conn.php';
try{
    $conn = new PDO($db,"C108156102","c48824880");
    @$id = $_SESSION['id'];

    //判斷空值
    if(empty($id)){
        throw new Exception("Please log in again", 404);      
    }

    //查詢是否出現同樣帳戶
    $sql = $conn->prepare("DELETE FROM `users` WHERE `id` = ?;");
    $result = $sql->execute(array($id));
    if($result){
        if($sql->rowCount() >= 1){
            res(200,"Hope to see you again");
        }else{
            throw new Exception('Delete Error',200);
        }
    }else{
        throw new Exception('SQL Error',400);
    }

}catch(PDOException $e){
    res($e->getCode(),$e->getMessage());
}catch(Exception $e){
    res($e->getCode(),$e->getMessage());
}
?>