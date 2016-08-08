# MonitorLocalUX
Angular Based Web interface for Monitor

## Prerequisites
You need to install the following tools onto your system in order to build the web frontend app.

Install ruby  
Currently running with ruby 2.2.1 on my dev boxen

* https://www.ruby-lang.org/en/ -- Consider RVM https://rvm.io/ rather than a root install of ruby, don't forget you will need to manually add "source ~/.rvm/scripts/rvm" to ~/.bashrc. Using RVM will avoid problems with root install privs and also support easier environment switching.

Install compass, and sass-globbing as a ruby gem
```
gem install compass sass-globbing
```

Install node.js and npm
* see: https://www.npmjs.com/ -- Consider nvm -- I currently have "nvm use v0.12.5" at the bottom of my .bashrc

Install dependancies including bower and grunt using npm:
```
npm install -g bower grunt-cli karma phantomjs jasmine-core sass-globber
```
__note:__ If you see errors regarding permissions take a look at this script (https://github.com/glenpike/npm-g_nosudo/blob/master/npm-g-nosudo.sh) to allow global npm packages without sudo. Alternatively, use nvm which will cause -g to use a user local repository for -g and allow easy switching of node environments [II Suggests this approach]


Requires ElasticSearch version 1.6 to be installed. Uses the cluster name 'elasticsearch' by default.

## Building
Change into root directory of this project.
```
bower install & npm install
```

## Running
Running the application also watches files for changes and updates the application live.
```
grunt serve
```
__note:__ If the app does not launch in your browser automatically you should navigate to: 
http://localhost:9090/

## Deploying
```
grunt build
```
Creates a folder named "dist" in the root of the project. Compress and upload this folder to the server.

## App Settings
There is a json file containing config in the root directory named config.js. This file is copied to the app module
when building and this is where you should modify settings for the production environment.
Sometimes we wish to override these settings for dev, i.e. To point at a local instance of the monitor local service,
and to do this you should create a file named \_config.js at the same level. These get merged with the production values when using 'grunt serve'.
My \_config.js contains a single entry to change the location of the backend application to one running on my local machine on port 8080
```
{
  "appConfig": {
    "backend": "http://localhost:8080/monitorLocalSvc"
  }
}
```   

## Apache Config
Example apache config to serve directly istead of grunt serve
Alias /monitor/ /home/user/some/path/MonitorLocalUX/app/

<Directory /home/user/some/path/MonitorLocalUX/app/>
  Order allow,deny
  Allow from all

  RewriteEngine on

  Require local

  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Rewrite everything else to index.html to allow html5 state links
  RewriteRule ^ index.html [L]
</Directory>



Test DOIs
10.1037/0003-066X.59.1.29
