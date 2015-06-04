<?php require_once('src/includes.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale = 1.0, user-scalable=no">
  <!--[if IE]>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <![endif]-->
  <title></title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <script type="text/javascript">
      var ENV = <?php echo ENV ?>;
      var BASE_URL = "<?php echo BASE_URL ?>";
      var IS_DEBUG = <?php echo json_encode(isset($_GET["debug"])) ?>;
  </script>
  <script src="js/scripts.js"></script>
</body>
</html>