# Website

## Architecture

- app: server side code

- build: scripts for building the website

- assets: client side sources

- static: files for building the public folder

- node_modules: npm packages (auto generated)

- exports: project exports (auto generated)

- public: public stuff (auto generated)

## Technos

- server side:
    - dependencies: Composer
    - framework: Slim 3
    - templating: Twig 2
  


- client side:
    - dependencies: NPM
    - CSS: Sass
    - JS: ES6

  
- build : Webpack / NPM

## Installation

### Prerequisites:

PHP 5.5+

- Install composer <https://getcomposer.org/>
- Install Node.js <https://nodejs.org/>

### Setup: 

- Install php packages: `composer install`

- Install js packages: `npm install`

## Development

Launch: `npm run dev`

## Deployment

Launch production task for optimizing assets: `npm run prod`  
  
Export a package: `npm run export-dist`  
  
Inside the exports/dist/ folder, there is the exported package with these folders:  
  - app/  
  - public/
  
Push these folders online at the root.  

Some files are not in the export.  
You have to configure them manualy:  

- public/.htaccess  

<!-- ## Archive project sources

Export the project: `npm run export-archive`  
Get the archive file inside the exports/archive/ folder. -->




