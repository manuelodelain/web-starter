<?php

require __DIR__ . '/config.php';
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/env.php';
require __DIR__ . '/data.php';

$routesData = json_decode(file_get_contents(DATA_PATH . '/routes.json'), true);

// create app
$app = new \Slim\Slim(array(
  'mode' => $env,
  // 'templates.path' => TEMPLATES_PATH,
  'view' => new \Slim\Views\Twig()
));

// allow to add files from multiple directories
$app->view()->twigTemplateDirs = array(
  TEMPLATES_PATH,
  ASSETS_PATH
);

// init app view
$app->view->parserOptions = array(
  'debug' => $env != 'prod',
  'charset' => 'utf-8',
  'cache' => TEMPLATES_CACHE_PATH,
  'auto_reload' => true,
  'strict_variables' => false,
  'autoescape' => true
);

// init twig view extensions
$app->view->parserExtensions = array(
  new \Slim\Views\TwigExtension(),
  new Twig_Extension_Debug()
);

// init view data
$app->view->setData(array(
  'routes' => $routesData,
  'app' => $app
));

// init routes
require __DIR__ . '/routes.php';

// start up app
$app->run();

