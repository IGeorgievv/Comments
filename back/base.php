<?php

if($_SERVER['HTTP_ORIGIN'] == "http://comments.th") {
  header('Access-Control-Allow-Origin: http://comments.th');
  header('Content-Type: application/json; charset=UTF-8');

  $g_base = dirname(__DIR__) ."/back";
  include_once $g_base .'/settings/db.php';
  include_once $g_base .'/settings/tools.php';

  $db     = new DB();
  $tools  = new Tools();

  $requestToAPI = [
      'GET'    => 'read',
      'POST'   => 'create',
      'PUT'    => 'update',
      'DELETE' => 'delete',
  ];

  $link = substr($_SERVER['REQUEST_URI'], 1); // Clearing first slash
  $open = explode('?', $link)[0]; // Clearing GET request

  if ( !empty( $open ) ) {

  // echo json_encode([ 'msg' => $_SERVER['REQUEST_METHOD'] ]);exit();
      require_once $g_base."/api/". $open ."/". $requestToAPI[ $_SERVER['REQUEST_METHOD'] ] .".php";
      exit();
  }


  echo json_encode([ 'msg' => 'No data!' ]);
} else {    
  header('Content-Type: text/html');
  echo "<html>";
  echo "<head>";
  echo "   <title>Another Resource</title>";
  echo "</head>";
  echo "<body>",
      "<h1>Limited Access!<h1>";
  echo "</body>",
  "</html>";
}