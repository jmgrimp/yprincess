/**
 *  This is the main file for tribe
 */

var React   = require( 'react' );
var Store = require('../home/components/store.js');
var Actions = require('../home/components/actions.js');
var mixins = require('../globals/mixins.js');
var _ = require('lodash');

var Modal = require('./../modal/modal.js');
var Player = require('./components/row.jsx');


var tribe = React.createClass({
	getInitialState: function() {
		return {
            thisTribe: null,
            isModalOpen: false,
            scoreData: null
        };
	},
	mixins: [mixins.routerMixin],
	componentWillMount: function(){
		Store.on('setAllScores.loaded', this.updateState);
		Store.on('setTribeScores.loaded', this.updateState);
		Store.on('setUserTribe.loaded', this.initialize);
		Store.on('toggleModalState.loaded', this.toggleModal);
		Store.on('addScore.loaded', this.handleAddScoreSuccess);
	},
	componentDidMount: function(){
		Actions.setEventInfo();
		Actions.setUserTribe();
	},
	componentWillUnmount: function(){
		Store.off('setAllScores.loaded', function(){});
		Store.off('setTribeScores.loaded', function(){});
		Store.off('toggleModalState.loaded', function(){});
		Store.off('addScore.loaded', function(){});
	},
	initialize: function(){
		var id = null;
		try {
			id = this.loadUserTribe()._id;
		} catch(e) {
			this.bail();
		}
		Actions.setAllData(id);
	},
	bail: function(){
		this.getRouter().push('/');
	},
	getEventData: function(){
		return Store.loadEventInfo();
	},
	getMemberData: function(){
		return Store.loadTribeData();
	},
	loadUserTribe: function(){
		return Store.loadUserTribe();
	},
	updateState: function(){
		if( this.isMounted() ){
			this.setState({
				thisTribe: this.loadUserTribe()
	        });
       }
	},
	handleCloseModal: function(i, s){
		Actions.toggleModal(false);
	},
	handleAddScoreSuccess: function(){
		this.handleCloseModal();
		this.initialize();
	},
	toggleModal: function(){
		var state = Store.toggleModalStatus(),
			open = state ? true : false;
		if(open){
			this.modalData = state;
		}
		if( this.isMounted() ){
			this.setState({ isModalOpen: open});
		}
	},
	render: function() {
		var self = this,
			tribeName = this.state.thisTribe !== null ? this.state.thisTribe.name : '';
			members = this.getMemberData(),
			list = members ? members.map(function(member, index){
				return <Player key={index} data={member} events={self.getEventData()} />;
			}) : 'nada';
		return (
			<div className={'tribe-wrapper'}>
				<h2>
					<span>{tribeName + ' Roster'}</span>
					<div className={'home-button'}><a href='/#/'>Home</a></div>
				</h2>
				<ul className={'tribe-content__table'}>
					{list}
				</ul>
				<Modal isOpen={this.state.isModalOpen} data={this.modalData} />
			</div>

			);
		}
	});


module.exports = tribe;
