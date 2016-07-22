var React = require('react');

// returns router for react-router. use for programmatic linking (hashHistory)
module.exports = {
	routerMixin: {
		contextTypes: {
		  router: React.PropTypes.object.isRequired,
		},
	    getRouter: function() {
	        return this.context.router;
	    }
	}
};