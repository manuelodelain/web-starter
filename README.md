# Starter for web projects

## App architecture

- app: server side code

- build: scripts for building the website

- dev: client side sources

- node_modules: npm packages (auto generated)

- temp : project exports

- web: public stuff

## Technos

- server side:
    - dependencies: Composer
    - framework: Slim PHP
    - templating: Twig  
  


- client side:
    - dependencies: NPM
    - CSS: Sass
    - JS: ES6, Browserify

  
- build : Gulp / NPM

## Installation

### Prerequisites:

- Install composer <https://getcomposer.org/>
- Install Node.js <https://nodejs.org/>

### Setup: 

- Install php packages: `composer install`

- Install js packages: `npm install`

## Development

Launch: `npm run dev`

## Deployment

Launch production task for optimizing assets: `npm run prod`  
  
Export a package: `npm run export`  
  
In the temp/ folder, there is the exported package with these folders inside:  
  - app/  
  - web/
  
Push these folders online at the root.  

Some files are not in the export.  
You have to configure them manualy:  

- app/config.php  
- web/.htaccess  




