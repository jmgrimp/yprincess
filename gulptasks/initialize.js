var gulp        = require( 'gulp' );
var shell       = require( 'shelljs' );
var fs          = require( 'fs' );
var Handlebars  = require( 'handlebars' );
var chalk       = require( 'chalk' );

function create( cb ) {

    // Main index file rendering
    var indexSource   = fs.readFileSync( __dirname + '/initialize/templates/main.index.template' ).toString( ),
        indexTemp     = Handlebars.compile( indexSource );

    // Main index file rendering
    var appSource     = fs.readFileSync( __dirname + '/initialize/templates/app.js.template' ).toString( ),
        appTemp       = Handlebars.compile( appSource );
  

    var mainIndex     = indexTemp(),
        mainApp       = appTemp(),
        cwd           = shell.pwd();

    shell.mkdir( 'src' );
    shell.cd( 'src' );
    shell.mkdir( 'components' );
    shell.mkdir( 'assets' );
    shell.mkdir( 'libs' );
    shell.mkdir( 'styles' );

    fs.writeFileSync( 'app.js' , appSource );
    fs.writeFileSync( 'index.html' , indexSource );


    shell.cd( cwd );

    console.log( '---------------------- Site Initialized! ----------------------' );

}

create.deps = [];


module.exports = create;
