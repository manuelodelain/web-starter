<?php

require __DIR__ . '/config.php';
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/env.php';
require __DIR__ . '/data.php';

// // create app
// $app = new \Slim\Slim(array(
//   'mode' => $env,
//   // 'templates.path' => TEMPLATES_PATH,
//   'view' => new \Slim\Views\Twig(),
// ));
$config = [
  'settings' => [
    'displayErrorDetails' => true,
  ],
];
$app = new \Slim\App($config);

// Get container
$container = $app->getContainer();

$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(TEMPLATES_PATH, [
        'cache' => TEMPLATES_CACHE_PATH
    ]);
    
    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));

    return $view;
};

// // allow to add files from multiple directories
// $app->view()->twigTemplateDirs = array(
//   TEMPLATES_PATH,
//   ASSETS_PATH,
// );

// // init app view
// $app->view->parserOptions = array(
//   'debug' => $env != 'prod',
//   'charset' => 'utf-8',
//   'cache' => TEMPLATES_CACHE_PATH,
//   'auto_reload' => true,
//   'strict_variables' => false,
//   'autoescape' => true,
// );

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

