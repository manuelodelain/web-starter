<?php

namespace src\pages\controllers;

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class NotFoundController extends BaseController {
  public function __invoke(Request $request, Response $response, $args = []){
    $response = parent::__invoke($request, $response, $args);
    
    return $response->withStatus(404);
  }
}