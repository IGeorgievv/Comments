<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $g_base .'/entities/comment.php';

$connection = $db->getConnection();

$product = new Comment($connection);

$data = json_decode(file_get_contents("php://input"));

$setMsg = $product->setMsg($data->msg);

if ( $setMsg['status'] == 'success' ) {
    if($product->create()){
        echo '{';
            echo '"msg": "Product was created."';
        echo '}';
    }
    else{
        echo '{';
            echo '"msg": "Unable to create product."';
        echo '}';
    }
}
else {
    echo json_encode(
        ["msgs" => [ $setMsg['msg'] ]]
    );
}