<?php
include '../conn.php';
try{
    $conn = new PDO($db,"C108156102","c48824880");
    @$email = $_POST['email'];
    @$password = $_POST['password'];
    //判斷空值
    if(empty($email) || empty($password)){
        throw new Exception("input text empty", 404);      
    }
    //查詢是否出現同樣帳戶
    $sql = $conn->prepare("SELECT * FROM `users` WHERE `account` LIKE ?");
    $result = $sql->execute(array($email));
    $rows = $sql->fetch(PDO::FETCH_ASSOC);
    if($result){
        if($sql->rowCount() >= 1){
            if($rows['password'] == $password){
                $_SESSION['id'] = $rows['id'];
                $_SESSION['account'] = $email;
                setcookie('account',$email, time() + 3600,"/");
                res(200,'Login Suceesfully');
            }else{
                throw new Exception('Incorrect account or password, please try again',204);
            }
        }else{
            throw new Exception('No Account Found',204);
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