<?php
include '../conn.php';
try{
    $conn = new PDO($db,"C108156102","c48824880");
    @$id = $_SESSION['id'];
    //@$id = $_POST['id'];
    //判斷空值
    if(empty($id)){
        throw new Exception("Please log in again", 404);      
    }
    //查詢是否出現同樣帳戶
    $sql = $conn->prepare("SELECT * FROM `keep` WHERE `users` LIKE ?");
    $result = $sql->execute(array($id));
    $rows = $sql->fetchALL(PDO::FETCH_ASSOC);
    if($result){
        if($sql->rowCount() >= 1){
            res(200,$rows);
        }else{
            throw new Exception('No Keep Found',200);
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