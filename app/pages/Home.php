<?php

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class Home{
  public function __construct($container){
    $this->view = $container['view'];
  }

  public function __invoke(Request $req,  Response $res, $args = []){
    return $this->view->render($res, 'pages/home.twig', [
      'routeId' => 'home',
    ]);
  }
}