<?php

// define app environment
if (@$_SERVER["APPLICATION_ENV"] == "local" 
  || strpos($_SERVER["HTTP_HOST"],  "localhost") !== false 
  || strpos($_SERVER["HTTP_HOST"],  "127.0.0.1") !== false) 
{
  $env = 'dev';
} else if (strpos(@$_SERVER["SERVER_ENV"], "staging") !== false 
  || strpos($_SERVER["HTTP_HOST"],  "manuelodelain.com") !== false)
{
  $env = 'staging';
} else {
  $env = 'prod';
}