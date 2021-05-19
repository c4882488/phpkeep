<?php
include '../conn.php';
try{
    $conn = new PDO($db,"C108156102","c48824880");
    @$id = $_SESSION['id'];
    //@$id = $_POST['id'];
    @$text = $_POST['text'];
    //判斷空值
    if(empty($id)){
        throw new Exception("Please log in again", 404);      
    }
    if(empty($text)){
        throw new Exception("input text empty", 404);      
    }
    //新增
    $sql = $conn->prepare("INSERT INTO `keep` VALUES (NULL, NULL, ?, current_timestamp(), ?)");
    $result = $sql->execute(array($text,$id));
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