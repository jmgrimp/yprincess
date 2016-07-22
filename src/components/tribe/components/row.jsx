/**
 *  This is the main file for test
 */

var React = require('react');
var Store = require('../../home/components/store.js');
var Actions = require('../../home/components/actions.js');

var Container = React.createClass({
	handleOpenModal: function(i, event){
		event.preventDefault();
		Actions.toggleModal(i);
	},
	render: function() {

	var scores = this.props.scores,
		showScore = '';

		if(this.props.data){
			return <div className={'names'}>
				<p>{this.props.data.firstName + ' ' + this.props.data.lastName}</p>
				<p>{this.props.data.moniker}</p>
			</div>;
		} else{

			metadatavalue = scores.metadata.length && scores.kind !== 'Time' > 0 ? '(' + scores.metadata[0].value + ')' : '';

			if(scores.value){
				showScore = <div className={'score'}><span>{scores.value}</span><span>{metadatavalue}</span></div>;
			}

			return <div className={'scores'}>
				<h3>{scores.eventId.name}</h3>
				{showScore}
				<a href={'#'} onClick={this.handleOpenModal.bind(this, scores)} className={'button-update'}>{'Edit Score'}</a>
			</div>;
		}
	}
});



module.exports = React.createClass({
	render: function(){
		var self = this;
		var row = <li className={'tribe-content__table__body'}><span className={'empty-event'}>{'No Players for this Event'}</span></li>,
			events = this.props.events;

		var names = <Container className={'names'} data={this.props.data} />;

		var items = events.map(function(event, index){
			var scores = self.props.data.scores,
				id = self.props.data._id;
			for(var i = 0; i < scores.length; i++){
				if(scores[i].eventId._id === event._id){
					return <Container key={index} id={id} className={'scores'} scores={scores[i]} />
				}
			}
		});


		if (!this.props.empty) {
			row = <li className={'tribe-content__table__body'}>
					{names}{items}
				</li>;
		}
		return row;
	}
});

