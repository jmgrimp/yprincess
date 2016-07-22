import React from 'react'; 
import { Router } from 'react-router'; 
import ReactDOM from 'react-dom'; 
import { browserHistory } from 'react-router'; 
import routes from './routes'; 
//import Navbar from './components/Navbar'; 

ReactDOM.render((<Router history={browserHistory}>{routes}</Router>), document.getElementById('app')); 
