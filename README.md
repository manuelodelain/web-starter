# Starter for web projects

## App architecture

- app: server side code

- build: scripts for building the website

- dev: client side sources

- static: files for building the public folder (web/)

- node_modules: npm packages (auto generated)

- exports: project exports (auto generated)

- web: public stuff (auto generated)

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
  
Export a package: `npm run export:dist`  
  
Inside the exports/dist/ folder, there is the exported package with these folders:  
  - app/  
  - web/
  
Push these folders online at the root.  

Some files are not in the export.  
You have to configure them manualy:  

- app/config.php  
- web/.htaccess  

## Archive project sources

Export the project: `npm run export:archive`  
Get the archive file inside the exports/archive/ folder.




