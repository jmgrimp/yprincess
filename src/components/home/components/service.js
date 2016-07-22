var Store = require('./store.js');
var CONST = require('../../globals/constants.js');

module.exports = {

	addNewScore: function(data, callback){
			var postScore = $.ajax({
				    type: 'PUT',
				    url: CONST.API.PROD.putScoreURI,
				    data: encodeURI(data),
				    beforeSend: function (request)
		            {
		                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		                request.setRequestHeader('charset', 'utf-8');
		            }
				});

			postScore.done(function(d){
				window.localStorage.removeItem('ymca_allScoreData');
				callback('success');
			});

			postScore.fail(function(d){
				callback('fail');
			});

			postScore.always(function(d){
			});

	},
	getLeaderboard: function (id, callback) {

		var ls_data = JSON.parse(window.localStorage.getItem('ymca_allScoreData')) || false,
			tribeMembers = null,
			getdata;

		if(ls_data){
			getdata = ls_data;
			if(id){

				tribeMembers = ls_data.filter(function(member){
					return member.tribe._id === id;
				});

				callback(tribeMembers);

			} else {
				callback(ls_data);
			}

		} else {

			getdata = $.getJSON(CONST.API.PROD.getAllDataURI);

			getdata.done(function(d){
				window.localStorage.setItem('ymca_allScoreData', JSON.stringify(d));

				if(id){

					tribeMembers = d.filter(function(member){
						return member.tribe._id === id;
					});

					callback(tribeMembers);

				} else {
					callback(d);
				}
				
			});

			getdata.fail(function(d){
				console.log(d);
			});

			getdata.always(function(d){
			});
			
		}



		if(id){
			
		} else {

			if(!ls_data){
				
			} else {
				callback(ls_data);
			}

		}
	},
	getEventInformation: function(callback){
		var ls_events = JSON.parse(window.localStorage.getItem('ymca_eventInfo')) || false;

		if(ls_events){
			callback(ls_events);
		} else {

			getdata = $.getJSON(CONST.API.PROD.getEventsURI);
			getdata.done(function(data){
				window.localStorage.setItem('ymca_eventInfo', JSON.stringify(data));
				callback(data);
			});

			getdata.fail(function(d){
			});

			getdata.always(function(d){
			});
		}
	},
	getTribesInformation: function(callback){
		var ls_tribes = JSON.parse(window.localStorage.getItem('ymca_tribeInfo')) || false;

		if(ls_tribes){
			callback(ls_tribes);
		} else {

			getdata = $.getJSON(CONST.API.PROD.getTribesURI);
			getdata.done(function(data){
				window.localStorage.setItem('ymca_tribeInfo', JSON.stringify(data));
				callback(data);
			});

			getdata.fail(function(d){
			});

			getdata.always(function(d){
			});
		}
	}
};