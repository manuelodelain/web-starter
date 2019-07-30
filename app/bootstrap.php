<?php

require __DIR__.'/vendor/autoload.php';

use Symfony\Component\Dotenv\Dotenv;

// load environment variables
$dotenv = new Dotenv();
$dotenv->loadEnv(__DIR__.'/../.env');

// app settings
$config = [
  'settings' => [
    'displayErrorDetails' => $_ENV['DEBUG'] == 1,
  ],
];

// container
$container = new \Slim\Container($config);

//Override the default Not Found Handler before creating App
$container['notFoundHandler'] = function ($container) {
  return new \src\pages\BasePage($container);
};

// create app
$app = new \Slim\App($container);

// init template engine
$container['view'] = function ($container) {
  global $env, $app;

  $templatesPath = __DIR__.'/templates';
  $assetsPath = __DIR__.'/../'.$_ENV['WEB_DIR'].'/assets';
  $templatesCachePath = __DIR__.'/'.$_ENV['TEMP_DIR'].'/templates/cache';

  $settings = [
    'cache' => $_ENV['TEMPLATES_CACHE'] == 1 ? $templatesCachePath : false,
    'debug' => $_ENV['DEBUG'] == 1,
    'strict_variables' => false,
  ];

  $view = new \Slim\Views\Twig([$templatesPath, $assetsPath], $settings);
  $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');

  $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));
  $view->addExtension(new manuelodelain\Twig\Extension\SvgExtension($assetsPath));

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

