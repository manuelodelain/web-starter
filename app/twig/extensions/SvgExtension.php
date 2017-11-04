<?php

namespace twig_extensions;

class SvgExtension extends \Twig_Extension
{
  public function __construct($basePath){
    $this->basePath = $basePath;
  }

  public function getName(){
    return 'twigSvgExtension';
  }

  public function getFunctions(){
    $parentFunctions = parent::getFunctions();

    array_push(
      $parentFunctions, 
      new \Twig_SimpleFunction('svg', array($this, 'getSvg'), array("is_safe" => array("html")))
    );

    return $parentFunctions;
  }

  public function getSvg($path, $params = []) {
    $fullPath = $this->basePath . '/' . $path;
    $ext = substr($fullPath, -4);

    if ($ext !== '.svg'){
      $fullPath .= '.svg';
    }
    
    $svg = file_get_contents($fullPath);

    return $svg;
  }
}
