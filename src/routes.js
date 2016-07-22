import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Bracket from './components/Bracket';

export default (
	<Route component={App}>
		<Route path='/' component={Bracket} />
	</Route>
);