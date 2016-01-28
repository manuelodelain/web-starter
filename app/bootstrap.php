<?php

require __DIR__ . '/config.php';
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/env.php';

$webDir = 'web';
$templatesPath = __DIR__ . '/templates';
$assetsPath = __DIR__ . '/../' . $webDir . '/assets';
$templatesCachePath = $templatesPath . '/cache';
$dataPath = __DIR__ . '/data';

$routesData = json_decode(file_get_contents($dataPath . '/routes.json'), true);

// create app
$app = new \Slim\Slim(array(
  'mode' => $env,
  // 'templates.path' => $templatesPath,
  'view' => new \Slim\Views\Twig()
));

// allow to add files from multiple directories
$app->view()->twigTemplateDirs = array(
  $templatesPath,
  $assetsPath
);

// init app view
$app->view->parserOptions = array(
  'debug' => $env != 'prod',
  'charset' => 'utf-8',
  'cache' => $templatesCachePath,
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

