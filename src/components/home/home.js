/**
 *  This is the main file for test
 */

var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;
var Hash = require('react-router').hashHistory;
var Store = require('./components/store.js');
var Actions = require('./components/actions.js');

var CONST = require('../globals/constants.js');
var mixins = require('../globals/mixins.js');
var Board = require('./components/board.jsx');


var Selecttribe = React.createClass({
  render: function() {
  	var options = this.props.opts.map(function(t, index){
  		return <option key={index} value={t._id}>{t.name}</option>;
  	});
	if(this.props.opts.length){
	    return (
	      <select className={'selectTribe'} onChange={this.props.onchange}>
	      	<option value={this.props.initialValue} checked={true}>{this.props.defaultOption}</option>
	      	{options}
	      </select>
	    );
	} else {
		return <div></div>;
	}

  }
});


module.exports = React.createClass({
	getInitialState: function() {
		return {
            tribeId: null,
            tribeName: null,
            leaderboard: null
        };
	},
	mixins: [mixins.routerMixin],
	componentWillMount: function(){
		Store.on('setTribeInfo.loaded', function(){
			Actions.setEventInfo();
		});
		Store.on('setEventInfo.loaded', function(){
			Actions.setAllData(false);
		});
		Store.on('setAllScores.loaded', this.updateState);
	},
	componentDidMount: function() {
		Actions.setTribeInfo(false);
	},
	componentWillUnmount: function(){
		Store.off('setTribeInfo.loaded', function(){});
		Store.off('setAllScores.loaded', function(){});
		Store.off('setEventInfo.loaded', function(){});
	},
	setUserTribe: function(e) {
		var id = e ? e.target.value : null;
		Actions.setUserTribe(id);
		this.navigate();
	},
	navigate: function(){
		var path = this.getUserTribe().name.toLowerCase();
        this.getRouter().push('/' + path);
	},
	getUserTribe: function(){
		return Store.loadUserTribe();
	},
	getTribesInfo: function(){
		return Store.loadTribeInfo();
	},
	getEventsInfo: function(){
		return Store.loadEventInfo();
	},
	getScoresData: function(){
		return Store.loadAllData();
	},
	updateState: function() {
		if( this.isMounted() ){
			this.setState({
	            leaderboard: this.getScoresData()
	        }); 
		}
    },
    reloadScores: function(){
		window.localStorage.removeItem('ymca_allScoreData');
		Actions.setAllData(false);
    },
	render: function(){
		var self = this,
			scoreData = this.state.leaderboard,
			eventData = this.getEventsInfo(),
			tribes = this.getTribesInfo() || [],
			boardData = 'No Data',
			scoreType = 'Score';

		if(scoreData){
			boardData = eventData.map(function(evnt, index){
				var board = {
						'event': evnt,
						'players': null,
						'scoreType': null
					};
				board.players = scoreData.map(function(player){
					var playerData = {
						'firstName': player.firstName,
						'lastName': player.lastName,
						'moniker': player.moniker,
						'tribeID': player.tribe._id,
						'tribe': player.tribe.name,
						'age': player.age,
						'kind': null,
						'score': null,
						'bulls': null,
						'time': null
					};
					for(var j = 0; j < player.scores.length; j++){
						if(player.scores[j].eventId._id === board.event._id){
							kind = player.scores[j].kind.toLowerCase();
							score = !_.isEmpty(player.scores[j].value) ? 
								kind === 'time' ? 
									player.scores[j].value 
									: _.toInteger(player.scores[j].value)
								: null;
							bulls = !_.isEmpty(player.scores[j].metadata) ? player.scores[j].metadata[0].value : -1;
							time = player.scores[j].timeInMillis === null ? null : _.toInteger(player.scores[j].timeInMillis);
							_.assign(playerData, {'score':score , 'bulls':bulls, 'time':time, 'kind':kind});
						}
					}
					return playerData;
				}).filter(function(bp){
					return bp.score!==null;
				});
				return <Board key={index} title={board.event.name} scoreType={board.event.scoring} data={board} />;
			});
		}
		


		return (
			<div className={'yp-leaderboard'}>
				<h2>Leader Board 
				<div className={'reset-button'}><a href='/#/' onClick={self.reloadScores}>Reload Scores</a></div>
				<div className={'select-tribe'}>
					<Selecttribe opts={tribes} 
						defaultOption={'Please Select a Tribe'} 
						initialValue={'null'} 
						onchange={self.setUserTribe} />
				</div>
				</h2>

					{boardData}
			</div>
		);
	}
});
