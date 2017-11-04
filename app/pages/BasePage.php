<?php

namespace pages;

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class BasePage{
  public function __construct($container){
    $this->view = $container['view'];

    $this->templateData = [];
  }

  public function __invoke(Request $req,  Response $res, $args = []){
    return $this->view->render($res, $this->template, $this->templateData);
  }
}