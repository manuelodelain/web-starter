<?php

namespace src\pages;

class NotFound extends BasePage{
  public function __invoke(Request $request, Response $response, $args = []){
    $response = parent::__invoke($request, $response, $args);
    
    return $response->withStatus(404);
  }
}