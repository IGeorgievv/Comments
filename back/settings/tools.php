<?php

class Tools {

  // private $host     = "localhost";

  // public $connection;

  public function clearInput( array $data ): array{

      $clearedData = [];
      foreach ($data as $k => $v) {
          $clearedData[$k] = htmlspecialchars(strip_tags(trim( $v )));
      }

      return $clearedData;
  }
}