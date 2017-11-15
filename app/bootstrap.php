<?php

require __DIR__ . '/config.php';
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/env.php';

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
  global $env, $app;

  $settings = [
    'cache' => TEMPLATES_CACHE_PATH,
    'debug' => $env != 'prod',
    'strict_variables' => false,
  ];
  $view = new \Slim\Views\Twig([TEMPLATES_PATH, ASSETS_PATH], $settings);
  $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');

  $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));
  $view->addExtension(new manuelodelain\Twig\Extension\SvgExtension(ASSETS_PATH));

  if ($settings['debug']){
    $view->addExtension(new Twig_Extension_Debug());
  }

  // add global data
  $view->getEnvironment()->addGlobal('app', $app);

  return $view;
};

// init routes
require __DIR__ . '/routes.php';

// // start up app
$app->run();

