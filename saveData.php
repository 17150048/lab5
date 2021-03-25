
<?php

include 'connect.php';


if (count($_POST) > 0){
  $sql_add = "INSERT INTO tableData SET `data`='" . $_POST['data']."'";
  @mysqli_query($conn, $sql_add);
}


?>