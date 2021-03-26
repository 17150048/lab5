<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab5</title>
  <link rel="stylesheet" href="style.css">
  <script src="jquery.js"></script>
  <script src="game.js"></script>
  <style>
  #delete{
    margin: 1rem;
  }
  </style>
</head>

<body>
<button id="delete">Удалить таблицу</button>
</body>
<script>
  $(document).ready(function () {
    $('body').game()
  });
</script>

</html>