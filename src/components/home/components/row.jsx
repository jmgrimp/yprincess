/**
 *  This is the main file for test
 */

var React = require('react');

module.exports = React.createClass({
	render: function(){

		var row = <li className={'panel-content__table__body--empty'}><span className={'empty-event'}>{'No Scoring Available Yet'}</span></li>;

		if (!this.props.empty) {
			row = <li className={'panel-content__table__body'}>
					<span className={'panel-content__name'}>{this.props.fullName}</span>
					<span className={'panel-content__tribe-name'}>{this.props.tribeName}</span>
					<span className={'panel-content__tribe'}>{this.props.tribe}</span>
					<span className={'panel-content__score panel-content__center'}>{this.props.score}</span>
					<span className={'panel-content__bullseyes panel-content__center'}>{this.props.bulls}</span>
				</li>;
		}

		return row;
	}
});

