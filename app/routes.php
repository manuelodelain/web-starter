<?php 

/**
 * Home
 */
// $app->get('/', function() use ($app) {
//   $view = 'views/home.twig';

//   $app->render($view, array(
//     'routeId' => 'home'
//   ));
// })->name('home');
$app->get('/', 'Home')->setName('home');
