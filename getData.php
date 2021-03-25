<?php

include 'connect.php';
$getTable = "SELECT `id`, `data` FROM `tableData`";


$array = [];
if($result = mysqli_query($conn, $getTable)){
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
            $array[] = $row;
        }
        echo json_encode($array); 
    } else{
        echo "empty";
    }
} else{
    echo "Ошибка: " . mysqli_error($conn);
}





?>