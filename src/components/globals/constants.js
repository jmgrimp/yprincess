
module.exports = {
	API: {
			'PROD': {
				'getAllDataURI': 'http://shrouded-sierra-65122.herokuapp.com/api/scores',
				'getEventsURI': 'http://shrouded-sierra-65122.herokuapp.com/api/events',
				'getTribesURI': 'http://shrouded-sierra-65122.herokuapp.com/api/tribe',
				'putScoreURI': 'http://shrouded-sierra-65122.herokuapp.com/api/score'
			},
			'TEST': {
				'getAllDataURI': 'testAllData.json',
				'getEventsURI': 'testEventInfo.json',
				'getTribesURI': 'testTribes.json',
				'putScoreURI': ''
			}
	},
	AGE_GROUPS: [
			{
				'name':'13+',
				'ages': [13,16]
			},
			{
				'name': '11-12',
				'ages': [11,12]
			},
			{
				'name': '9-10',
				'ages': [9,10]
			},
			{
				'name': '7-8',
				'ages': [7,8]
			},
			{
				'name': '5-6',
				'ages': [5,6]
			},
			{
				'name': 'no age',
				'ages': [0,4]
			}
	]
};
