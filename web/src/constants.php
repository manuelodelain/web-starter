<?php


/***********************/
/* ENVIRONMENT         */
/***********************/
define("LOCAL", 1);
define("PREPROD", 2);
define("PROD", 3);

if (@$_SERVER["APPLICATION_ENV"] == "local" || strpos($_SERVER["HTTP_HOST"],  "localhost") !== false || strpos($_SERVER["HTTP_HOST"],  "127.0.0.1") !== false) {
    define("ENV", LOCAL);
} else if (strpos(@$_SERVER["SERVER_ENV"], "dev") !== false){
	define("ENV", PREPROD);
} else {
    define("ENV", PROD);
}

/***********************/
/* BASE URL            */
/***********************/
define('ABSPATH', str_replace('\\', '/', dirname(__FILE__)) . '/');

$tempPath1 = explode('/', str_replace('\\', '/',
dirname($_SERVER['SCRIPT_FILENAME'])));
$tempPath2 = explode('/', substr(ABSPATH, 0, -1));
$tempPath3 = explode('/', str_replace('\\', '/', dirname($_SERVER['PHP_SELF'])));

for ($i = count($tempPath2); $i < count($tempPath1); $i++)
   array_pop ($tempPath3);

$urladdr = $_SERVER['HTTP_HOST'] . implode('/', $tempPath3);

if ($urladdr{strlen($urladdr) - 1}== '/')
   define('BASE_URL', '//' . $urladdr);
else
   define('BASE_URL', '//' . $urladdr . '/');

unset($tempPath1, $tempPath2, $tempPath3, $urladdr);

?>