/**
 *  This is the main file for weather
 */

var React   = require( 'react' );
var ReactDOM = require('react-dom');

var weatherBox   = document.getElementById('weather-box');


var Weather = React.createClass({
	getInitialState: function() {
    	return {
    		widgetActive: false,
    		currentTemp: null,
    		currentConditions: null,
    		selectedName: null,
    		selectedId: 4752255
    	};
	},
	showSelectLocation: function(e){
		var target = e.target.parentElement.previousSibling;
		target.classList.toggle('weather-active');
	},
	getCurrentWeather: function(e) {
		var self	= this,
			id 		= e ? e.target.value : this.state.selectedId;

		$.ajax({
			url:'http://api.openweathermap.org/data/2.5/weather', 
			data:{
				id:id,
				units: 'imperial',
				APPID: '30cc14261f2ffc1c3ddc662fb7ed1e5f'},
			dataType: 'jsonp',
		})
		.success(function(data){

			var weatherType = data.weather[0].id.toString(),
				range 		= weatherType === 800 ? 1 : weatherType.charAt(0),
				weather		= null,
				name 		= data.name.replace('City of ','').replace(' County', '');

			switch (parseInt(range)) {
				case 1 : weather = 'sun';
				break;
				case 2 : weather = 'storm';
				break;
				case 3 : weather = 'rainy';
				break;	
				case 5 : weather = 'rainy2';
				break;
				case 6 : weather = 'snow';
				break;	
				case 7 : weather = 'fog';
				break;	
				case 8 : weather = 'cloud';
				break;		
				case 9 : weather = 'wind';
				break;
			};

			self.setState({
				widgetActive: true,
				currentTemp: Math.round(data.main.temp),
				currentConditions: weather,
				selectedName: name,
				selectedId: id
			});
		})
		.fail(function(){
			console.log('fail');
		})
		.done(function(){
			var elem = document.querySelector('.weather-active');
			if(elem) {
				elem.classList.remove('weather-active');
			}
			
		});

		return;

	},
	componentDidMount: function() {
		var self = this,
			checkforweather = setInterval(function(){
				self.getCurrentWeather();
			}, 60000);
		this.getCurrentWeather();		
	},

	render: function() {

		// TODO: move logic into store/controllers


		var tempClassName = !this.state.widgetActive ? 'weather-box__temp' : 'weather-box__temp active',
			cities = 
				[
					{ 'id': 4752046, 'name': 'Charlottesville' },
					{ 'id': 4752215, 'name': 'Chesapeake' },
					{ 'id': 4752255, 'name': 'Chesterfield County' },
					{ 'id': 4753684, 'name': 'Colonial Heights' },
					{ 'id': 4755298, 'name': 'Danville' },
					{ 'id': 4755976, 'name': 'Dinwiddie County' },
					{ 'id': 4758109, 'name': 'Fairfax' },
					{ 'id': 4760084, 'name': 'Fredericksburg' },
					{ 'id': 4763237, 'name': 'Harrisonburg' },
					{ 'id': 4763688, 'name': 'Henrico County' },
					{ 'id': 4764849, 'name': 'Hopewell' },
					{ 'id': 4770766, 'name': 'Louisa' },
					{ 'id': 4771099, 'name': 'Lynchburg' },
					{ 'id': 4771426, 'name': 'Manassas' },
					{ 'id': 4776037, 'name': 'Newport News' },
					{ 'id': 4776242, 'name': 'Norfolk' },
					{ 'id': 4778642, 'name': 'Petersburg' },
					{ 'id': 4780019, 'name': 'Portsmouth' },
					{ 'id': 4780220, 'name': 'Powhatan' },
					{ 'id': 4780851, 'name': 'Radford' },
					{ 'id': 4781756, 'name': 'Richmond' },
					{ 'id': 4782241, 'name': 'Roanoke' },
					{ 'id': 4784205, 'name': 'Salem' },
					{ 'id': 4788160, 'name': 'Suffolk' },
					{ 'id': 4787467, 'name': 'Staunton' },
					{ 'id': 4792534, 'name': 'Waynesboro' },
					{ 'id': 4794134, 'name': 'Winchester' }
				];


		var options = cities.map(function(city){
			return (<option key={city.id} value={city.id}>{city.name}</option>);
		});


		return (
			<span className='weather-box'>
				<p className='weather-box__title'>{this.state.selectedName}</p>
				<p className={tempClassName}>{this.state.currentTemp + String.fromCharCode(176)}{' / '}<span className={'icon-'+ this.state.currentConditions} /></p>
			</span>
		);
	}
});


ReactDOM.render(<Weather />, weatherBox);

