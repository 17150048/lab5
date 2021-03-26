
<?php

include 'connect.php';


  $query = "SELECT    id
            FROM      tableData
            ORDER BY  id DESC
            LIMIT     1";
  $lastId = mysqli_query($conn, $query)->fetch_assoc()['id'];
  $sql_delete = "DELETE FROM tableData WHERE `id`='" . $lastId."'";
  @mysqli_query($conn, $sql_delete);



?>
