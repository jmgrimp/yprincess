var gulp        = require( 'gulp' );
var shell 		= require( 'shelljs' );
var fs			= require( 'fs' );
var Handlebars	= require( 'handlebars' );

var config          = require('../config.json');

var cssSource       = fs.readFileSync( __dirname + '/templates/main.css.template' ).toString( );
var cssTemplate     = Handlebars.compile( cssSource );

function generateMainSassFile ( cb ) {

    var workingDir = shell.pwd();
    var components = config.defaultComponents.map( function( component ){
    	return { name: component };
	});

    var data = {
    	components: components
    }

	var mainCss = cssTemplate( data );
    var cssFilePath = workingDir + '/src/styles/main.styles.scss';
    fs.writeFileSync( cssFilePath , mainCss );
};

module.exports = generateMainSassFile;
