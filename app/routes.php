<?php 

// init app routes
foreach ($routesData as $route => $routeData){

  $app->get($route, function() use ($app, $routeData) {
    $view = 'views/' . $routeData['view'] . '.twig';
    $routeParams = $app->router()->getCurrentRoute()->getParams();
    
    $app->render($view, array(
      'routeParams' => $routeParams,
      'routeData' => $routeData,
      'routeId' => $routeData['id']
    ));
  })->name($routeData['id']);

}