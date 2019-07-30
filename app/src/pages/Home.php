<?php

namespace src\pages;

class Home extends BasePage{
  public function __construct($container){
    parent::__construct($container);

    $this->template = 'pages/home.twig';
    $this->templateData['routeId'] = 'home';
  }
}