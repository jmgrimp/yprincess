/**
 *  This is the main file for modal
 */

var React   = require( 'react' );
var _ = require('lodash');

var Store = require('../home/components/store.js');
var Actions = require('../home/components/actions.js');


var InputGroup = React.createClass({
	render: function() {
		var data = this.props.data;
		if(this.props.kind === 'Time'){
			return <fieldset>
					<legend>{'Time'}</legend>
					<div className={'fieldset'}>
						<div className={'input-group'}>
							<label htmlFor={'min-' + data._id}>{'Mins:'}</label>
							<input id={'min-' + data.id} className={'input-score'} name={'time-min'} type={'number'} min={'0'} defaultValue={data.score} />
						</div>
						<div className={'input-group'}>
							<label htmlFor={'secs-' + data._id}>{'Secs:'}</label>
							<input id={'secs-' + data.id} className={'input-score'} name={'time-sec'} type={'number'} min={'0'} defaultValue={data.mscore} />
						</div>
						<div className={'input-group'}>
							<label htmlFor={'milli-' + data._id}>{'Millis:'}</label>
							<input id={'milli-' + data.id} className={'input-score'} name={'time-milli'} type={'number'} min={'0'} defaultValue={data.initial} />
						</div>
					</div>
				</fieldset>;
		} else {
			return <fieldset>
					<legend>{'Points'}</legend>
					<div className={'fieldset'}>
						<div className={'input-group'}>
							<label htmlFor={'score-' + data._id}>{'Score'}</label>
							<input id={'score-' + data.id} className={'input-score'} name={'points-score'} type={'number'} min={'0'} defaultValue={data.initial} />
						</div>
						<div className={'input-group'}>
							<label htmlFor={'bulls-' + data._id}>{'Bulls Eyes'}</label>
							<input id={'bulls-' + data.id} name={'metavalue'} type={'number'} min={'0'} defaultValue={data.initial} />
						</div>
					</div>
				</fieldset>;
		}
	}
});


var modal = React.createClass({
	handleCloseModal: function(i, e){
		e.preventDefault();
		Actions.toggleModal(false);
	},
	addScore: function(e, i){
		e.preventDefault();
		var $inputs = e.target.parentElement.querySelectorAll('input:not(.input-score)'),
			$scores = e.target.parentElement.querySelectorAll('.input-score');
			score='', data = [];
			_.forEach($scores, function(s, i){
				score += i == $scores.length-1 ? s.value : s.value + ':';
			});

			data.push({'score':score});

			_.forEach($inputs, function(input, i){
				var obj = {};
				obj[input.getAttribute('name')] = input.value;
				data.push(obj);
			});

			Actions.addScore(data);
	},
	render: function() {
		var data = this.props.data,
			kind = data ? data.kind : false,
			metakey = kind === 'Points' ? 'bullseyes' : null;

		if(this.props.isOpen){
			return (
					<div className={'score-modal'}>
						<div className={'score-modal__content'}>
							<a href={'#'} onClick={this.handleCloseModal.bind(this, null)}>X</a>
							<form>
								<InputGroup kind={kind} data={data} />
								<input name={'metakey'} type={'hidden'} value={metakey} />
								<input name={'kind'} type={'hidden'} value={kind} />
								<input name={'scoreId'} type={'hidden'} value={data._id} />
								<button className={'submit'} onClick={this.addScore}>{'Post Score'}</button>
							</form>
						</div>
					</div>
			);
		} else {
			return <div></div>;
		}
	}
});


module.exports = modal;
