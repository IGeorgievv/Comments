<?php
include_once $g_base .'/entities/comment.php';

$connection = $db->getConnection();

$inUse = new Comment($connection);

$stmt  = $inUse->read();
$count = $stmt->rowCount();

$data = [];
$data["records"] = [];
$data["count"] = $count;

$recordId = 0;
if($count > 0){

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $p  = [
            "id" => $id,
            "comment" => $msg
        ];

        $data["records"][$recordId] = $p;
        ++$recordId;

        // array_push($data["records"], $p);
    }

    echo json_encode($data);
}
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    // echo json_encode(
    //     ["msgs" => ["No products found."]]
    // );
    echo json_encode($data);
}