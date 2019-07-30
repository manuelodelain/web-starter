<?php

namespace src\pages\models;

class HomeModel extends BaseModel{
  public function init($args = []){
    $this->props['title'] = 'home';
  }
}