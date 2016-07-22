var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;


var nav   = document.getElementById('navigation-menu');

var Navigation = React.createClass({
  getInitialState: function() {
      return {
      };
  },
  handleButtonClick: function(type, event){
    var button = event.currentTarget.nextSibling,
        activeMenus = document.querySelectorAll('.active-nav');

    if( type === 'close' ) {
      
      for(var i = 0; i < activeMenus.length; i++){
        activeMenus[i].classList.remove('active-nav');
      } 

    } else if( type === 'open') {

      button.classList.add('active-nav');

    } else {

      button.classList.toggle('active-nav');

    }

    return;
  },
	render: function(){

    // TODO: build json object for navigation and move to store

		return (
      <div>

        <a className={'primary-header__navigation__mobile'} onClick={this.handleButtonClick.bind(this,'open')}>
          <div>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>              
        </a>

        <div id={'main-nav'} className={'primary-header__navigation__menu nav-menu'}>
          <ul>
            <li>
              <a onClick={this.handleButtonClick.bind(this,'close')}>X</a>
            </li>             
            <li>
              <a className={'nav-toggle'} onClick={this.handleButtonClick.bind(this,'toggle')}>O</a>
            </li>
            <li>
              <a className={'nav-item'} href={'#'}>{'Item 2'}</a>
              <a className={'nav-toggle'} onClick={this.handleButtonClick.bind(this,'toggle')}>O</a>          
            </li>
            <li>
              <a className={'nav-item'} href={'#'}>{'Item 3'}</a>
            </li>
            <li>
              <a className={'nav-item'} href={'#'}>{'Item 4'}</a>
            </li>
          </ul>
        </div>
      </div>
		);
	}
});

ReactDOM.render(<Navigation />, nav);

