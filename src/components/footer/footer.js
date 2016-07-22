var React = require('react');
var ReactDOM = require('react-dom');


var footerElem   = document.getElementById('main-footer');


var Footer = React.createClass({
	
	render: function(){	
		return (
			<div className='main-footer__wrapper'>
          		<div className='main-footer__wrapper__links'>
          			<a href='/#/'>Home</a>
          		</div>
			</div>
		);
	}
});


ReactDOM.render(<Footer />, footerElem);
