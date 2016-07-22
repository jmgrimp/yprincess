## YMCA/Adventure Guides Scoreboard

### Git Information

Please cut your branch off of "develop".


### Initialization information

This site uses node.js, npm, bower and gulp for handling the build and compiling processes. The versions are listed below:

* node: 0.12.7 or greater
* npm: 3.5.1
* bower: 1.7.1
* gulp cli: 3.9.0

### Initialization instructions

After cloning the repository, install the node modules:

```
npm install
```

Once the modules are installed, install the bower modules:

```
bower install
```

After all modules are installed, run the gulp initialization. This will create a /dev directory and place the initial assets in it. It will also compile any sass and js:

```
gulp initialize
```

Once finished, fire up a web server. The root directory is the /dev folder. Note that the webserver is looking for the live reload plugin so make sure you install it in your browser of choice if you have not already:

```
gulp webserver
```

Finally, run the watch and you can begin developing:

```
gulp watch
```

