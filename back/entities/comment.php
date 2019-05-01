<?php
class Comment{

    // Connection instance
    private $connection;

    // table name
    private $table_name = "comments";

    // table columns
    public $id;
    public $msg;
    public $dt_created;
    public $dt_edit;

    public function __construct($connection){
        $this->connection = $connection;
    }

    public function fieldRules( $field ) {
        if ( $field['name'] == 'msg' ) {
            if ( strlen($field['val']) >= 1 && strlen($field['val']) <= 100 ) {
                return [ 'status' => true ];
            }
            else {
                return [ 'status' => false, 'msg' => 'Size of comment must be between 1 and 100 characters.' ];
            }
        }
    }

    public function setMsg( $msg ) {
        if ( strlen($msg) >= 1 && strlen($msg) <= 100 ) {
            $this->msg = $msg;
            return [ 'status' => 'success', 'msg' => "Comment added." ];
        }
        else {
            return [ 'status' => 'error', 'msg' => "Size of comment must be between 1 and 100 characters." ];
        }
    }

    //C
    public function create(): bool {
        $query = "INSERT INTO " . $this->table_name . " (msg, dt_created, dt_edit) VALUES (?, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())";

        $stmt = $this->connection->prepare($query);

        // execute query
        if($stmt->execute([ $this->msg ])){
            return true;
        }

        return false;
    }
    //R
    public function read() {
        $query = "SELECT c.id, c.msg, c.dt_edit
                    FROM ". $this->table_name ." AS c
                ORDER BY c.dt_created";

        $stmt = $this->connection->prepare($query);

        $stmt->execute();

        return $stmt;
    }
    //U
    public function update(){
        // update query
        $query = "UPDATE
        " . $this->table_name . "
        SET
            msg     = :msg,
            dt_edit = :dt_edit
        WHERE
            id = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // bind new values
        $stmt->bindParam(':msg', $this->msg);
        $stmt->bindParam(':dt_edit', UNIX_TIMESTAMP());
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
        return true;
        }

        return false;
    }
    //D
    public function delete(){}
}