var gulp = require('gulp');
var eslint = require('gulp-eslint');

var path = require('../gulp-paths');

var rc = {
    'ecmaFeatures': {
        'blockBindings': true,
        'forOf': true,
        'jsx': true,
        'modules': true
    },
    'rules': {
        'semi': [2, 'always'],
        'quotes': [1, 'single'],
        'no-multi-spaces' : 0,
        'camelcase': 0,
        'key-spacing': 0,
        'no-trailing-spaces' : 0,
        'vars-on-top' : 1,
        'no-unused-vars': 1,
        'no-mixed-spaces-and-tabs': 0,
        'new-cap' : 1,
        'constructor-super': 0,
        'no-reserved-keys': 0
    },
    'globals' : {
        'jQuery':false,
        '$':true,
        'ggp': true,
        'JMap': true
    },
    'envs': [
        'browser',
        'node'
    ]
}



module.exports = function ( cb ) {

    return gulp.src([path.src.js, path.src.entry])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint(rc))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());

}
