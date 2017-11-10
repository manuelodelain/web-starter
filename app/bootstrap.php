<?php

require __DIR__ . '/config.php';
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/env.php';
require __DIR__ . '/data.php';

// // create app
$config = [
  'settings' => [
    'displayErrorDetails' => $env != 'prod',
  ],
];
$app = new \Slim\App($config);

// get container
$container = $app->getContainer();

// init template engine
$container['view'] = function ($container) {
  global $env;

  $view = new \Slim\Views\Twig(TEMPLATES_PATH, [
      'cache' => TEMPLATES_CACHE_PATH,
      'debug' => $env != 'prod',
      'strict_variables' => false,
  ]);
  $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');

  $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));
  $view->addExtension(new twig_extensions\SvgExtension(ASSETS_PATH));

  return $view;
};

// // init twig view extensions
// $app->view->parserExtensions = array(
//   new \Slim\Views\TwigExtension(),
//   new Twig_Extension_Debug(),
// );

// // init view data
// $app->view->setData(array(
//   'app' => $app,
// ));

// init routes
require __DIR__ . '/routes.php';

// // start up app
$app->run();

