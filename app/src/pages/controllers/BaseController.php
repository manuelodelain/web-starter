<?php

namespace src\pages\controllers;

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class BaseController {
  protected $container;
  protected $templateData;
  protected $model;

  public function __construct($container){
    $this->container = $container;

    $this->templateData = [];
  }

  protected function getModelClassName ($routeName) {
    $formatedRouteName = str_replace('-', '', ucwords(ucwords($routeName, '-')));

    return '\\src\\pages\\models\\'.$formatedRouteName.'Model';
  }

  protected function initModel ($routeName) {
    $className = $this->getModelClassName($routeName);

    if (class_exists($className)) {
      $this->model = new $className;
    } else {
      $this->model = new \src\pages\models\BaseModel;
    }
  }

  protected function populateTemplateData ($props) {
    foreach ($props as $keyProp => $prop) {
      $this->templateData[$keyProp] = $prop;
    }

    foreach ($this->model->props as $keyProp => $prop) {
      $this->templateData[$keyProp] = $prop;
    }
  }

  public function __invoke(Request $request, Response $response, $args = []){
    $view = $this->container->get('view');
    $route = $request->getAttribute('route');
    $isNotFound = strpos(get_class($this), 'NotFoundController') !== false;
    $routeName = (isset($route) && !$isNotFound) ? $route->getName() : 'not-found';
    $template = "pages/$routeName.twig";
    $rootUrl = $request->getUri()->getScheme().'://'.$request->getUri()->getHost();
  
    // model
    $this->initModel($routeName);
    $this->model->init($args);

    // template data
    $props = [
      'debug' => $_ENV['DEBUG'] == 1,
      'route_id' => $routeName,
      'is_ajax' => $request->isXhr(),
      'root_url' => $rootUrl,
      'current_url' => $rootUrl.$request->getUri()->getPath()
    ];
    
    if ($this->model->isValid) {
      $this->populateTemplateData($props);
    } else if ($routeName !== 'not-found') {
      // not found
      $notFoundHandler = $this->container->get('notFoundHandler');
      
      return $notFoundHandler($request, $response);
    }

    // cache
    $ttl = 24 * 60 * 60; // seconds
    $response = $response->withHeader('Cache-Control', "public, max-age=$ttl");
    $response = $response->withHeader('Vary', 'Accept-Encoding, x-requested-with');

    //render 
    return $view->render($response, $template, $this->templateData);
  }
}