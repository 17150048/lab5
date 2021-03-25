
<?php

include 'connect.php';


if (count($_POST) > 0){
  $query = "SELECT    id
            FROM      tableData
            ORDER BY  id DESC
            LIMIT     1";
  $lastId = mysqli_query($conn, $query)->fetch_assoc()['id'];
  $sql_update = "UPDATE tableData SET `data`='" . $_POST['data']."' WHERE `id`='".$lastId."'";
  @mysqli_query($conn, $sql_update);
}


?>
