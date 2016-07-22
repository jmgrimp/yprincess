/**
 *  This is the main file for test
 */

var React = require('react');
var Player = require('./row.jsx');
var _ = require('lodash');


module.exports = React.createClass({
	render: function(){
		var data = this.props.data,
			scoreType = this.props.scoreType === 'Points' ? 'Bulls' : '',
			rawplayers,
			sortby = null,
			sortOrder = null,
			players = <Player empty={true} />;
			if(data.length){
				if(data[0].kind === 'time'){
					sortBy = 'time';
					sortOrder = 'asc';
				} else {
					sortBy = 'score';
					sortOrder = 'desc';
				}
				
				rawplayers = _.orderBy(data, [sortBy], [sortOrder]);
				players = rawplayers.map(function(player, index){
					var score = player.score !== -1 ? player.score : 'Pending',
						bulls = player.bulls !== -1 ? player.bulls : '--';
					return <Player key={index} fullName={player.firstName + ' ' + player.lastName} 
								tribeName={player.moniker} 
								tribe={player.tribe} 
								score={score} 
								bulls={bulls} />;
					});
			}

		return (
			<li className={'scoring-table__panel'}>
				<h4>{this.props.title}</h4>
				<div className={'panel-content'}>
					<ul className={'panel-content__table__head'}>
						<li>
							<span className={'panel-content__name'}>{'Name'}</span>
							<span className={'panel-content__tribe-name'}>{'Tribe Name'}</span>
							<span className={'panel-content__tribe'}>{'Tribe'}</span>
							<span className={'panel-content__score panel-content__center'}>{'Score'}</span>
							<span className={'panel-content__bullseyes panel-content__center'}>{scoreType}</span>
						</li>
					</ul>
					<ul className={'panel-content__table'}>
						{players}
					</ul>
				</div>
			</li>
		);
	}
});
