<?php
include '../conn.php';
try{
    $conn = new PDO($db,"C108156102","c48824880");
    @$name = $_POST['name'];
    @$email = $_POST['email'];
    @$password = $_POST['password'];
    //判斷空值
    if(empty($name) || empty($email) || empty($password)){
        throw new Exception("input text empty", 404);      
    }
    //查詢是否出現同樣帳戶
    $sql = $conn->prepare("SELECT * FROM `users` WHERE `account` LIKE ?");
    $result = $sql->execute(array($email));
    if($sql->rowCount() >= 1){
        throw new Exception('Duplicate email', 400);
    }
    $sql = $conn->prepare("INSERT INTO `users` VALUES (NULL, ?, ?, ?, '0')");
    $result = $sql->execute(array($email,$password,$name));
    if($result){
        if($sql->rowCount() >= 1){
            res(200,'added success');
        }else{
            throw new Exception('added Error',204);
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