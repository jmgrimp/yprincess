var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Hash = require('react-router').hashHistory;



var Home = require('./components/home/home');
var Tribe = require('./components/tribe/tribe');
var Footer = require('./components/footer/footer');
var Weather = require('./components/weather/weather');

ReactDOM.render((
		<Router history={Hash}>
			<Route path='/' component={Home} />
			<Route path='/:tribename' component={Tribe} />
		</Router>
), document.getElementById('main-body-view'));


