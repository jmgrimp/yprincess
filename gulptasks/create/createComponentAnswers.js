var gulp 		= require( 'gulp' );
var shell 		= require( 'shelljs' );
var fs			= require( 'fs' );
var Handlebars	= require( 'handlebars' );
var chalk		= require( 'chalk' );


module.exports = function ( answers ) {

	// Main js file rendering
	var cmplxJSSource 	= fs.readFileSync( __dirname + '/templates/main.js.template' ).toString( );
	var cmplxJSTemp		= Handlebars.compile( cmplxJSSource );

	// Main js Simple file rendering
	var smplJSSource	= fs.readFileSync( __dirname + '/templates/main-simple.js.template' ).toString( );
	var smplJSTemp		= Handlebars.compile( smplJSSource );

	// main.scss file
	var scssSource 		= fs.readFileSync( __dirname + '/templates/main.scss.template' ).toString( );
	var scssTemp 		= Handlebars.compile( scssSource );

	var cmplxJS 		= cmplxJSTemp( answers );
	var smplJS			= smplJSTemp( answers );
	var mainScss 		= scssTemp( answers );

	var cwd 				= shell.pwd();

	shell.cd( 'src/components' );
	shell.mkdir( answers.component_name );
	shell.cd( answers.component_name );
	shell.mkdir( 'styles' );

	var componentDirPath = shell.pwd();

	console.log(answers.component_type);

	if( answers.component_type == 'complex' ){
		shell.mkdir( 'components' );
		fs.writeFileSync( componentDirPath + '/' + answers.component_name + '.js' , cmplxJS );
	} else {
		fs.writeFileSync( componentDirPath + '/' + answers.component_name + '.js' , smplJS );
	}

	fs.writeFileSync( componentDirPath + '/styles/' + answers.component_name + '.scss' , mainScss );

	shell.cd( cwd );

	console.log( chalk.bold.green( '\n-----------------------------------------------') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '|   ' ) + chalk.bold.green( 'Created Component' ) + ' : ' + answers.component_name );
	console.log( chalk.bold.green( '|' ) + '   ' + chalk.bold('Files created') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.component_name + '.js') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.component_name + '.scss') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '-----------------------------------------------\n' ) );


}
