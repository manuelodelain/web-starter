<?php

namespace src\pages;

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class BasePage{
  protected $container;
  protected $templateData;

  public function __construct($container){
    $this->container = $container;

    $this->templateData = [];
  }

  protected function populateTemplateData ($props) {
    foreach ($props as $keyProp => $prop) {
      $this->templateData[$keyProp] = $prop;
    }
  }

  public function __invoke(Request $request, Response $response, $args = []){
    $view = $this->container->get('view');
    $route = $request->getAttribute('route');
    $routeName = isset($route) ? $route->getName() : 'not-found';
    $template = "pages/$routeName.twig";
    $rootUrl = $request->getUri()->getScheme().'://'.$request->getUri()->getHost();

    // template data
    $props = [
      'debug' => $_ENV['DEBUG'] == 1,
      'route_id' => $routeName,
      'is_ajax' => $request->isXhr(),
      'root_url' => $rootUrl,
      'current_url' => $rootUrl.$request->getUri()->getPath()
    ];
    
    $this->populateTemplateData($props);

    // cache
    $ttl = 24 * 60 * 60; // seconds
    $response = $response->withHeader('Cache-Control', "public, max-age=$ttl");
    $response = $response->withHeader('Vary', 'Accept-Encoding, x-requested-with');

    //render 
    return $view->render($response, $template, $this->templateData);
  }
}