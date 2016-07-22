/**
 *  This is the main file for test
 */

var React = require('react');
var Panel = require('./panel.jsx');
var CONST = require('../../globals/constants.js');

module.exports = React.createClass({

	render: function(){
		var self = this;
		var groups = CONST.AGE_GROUPS;

		var panels = groups.map(function(group, index){

			var players = self.props.data.players.filter(function(player){
				return player.age >= group.ages[0] && player.age <= group.ages[1];
			});
			return <Panel key={index} title={group.name} scoreType={self.props.scoreType} data={players} />;
		});



		return <div className={'yp-leaderboard__content'}>
					<h3>{this.props.title}</h3>
					<ul className={'scoring-table'}>
						{panels}
					</ul>
				</div>;
	}
});
