<?php
include '../conn.php';
try{
    $conn = new PDO($db,"C108156102","c48824880");
    @$id = $_SESSION['id'];
    @$password = $_POST['password'];
    @$Repassword = $_POST['Repassword'];
    //判斷空值
    if(empty($id)){
        throw new Exception("Please log in again", 404);      
    }
    if($password != $Repassword){
        throw new Exception("Repeated password input does not match", 204);    
    }
    //查詢是否出現同樣帳戶
    $sql = $conn->prepare("UPDATE `users` SET `password` = ? WHERE `users`.`id` = ?;");
    $result = $sql->execute(array($password,$id));
    if($result){
        if($sql->rowCount() >= 1){
            res(200,"Update success");
        }else{
            throw new Exception('Update Error',200);
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