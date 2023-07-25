// import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Repository from './pages/Repository';


export default function RoutesApp() {
	return (

		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/repository/:repositoryName'
				element={<Repository />}
			/>

		</Routes>

	);

}