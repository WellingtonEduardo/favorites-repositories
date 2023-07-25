
import { BrowserRouter } from 'react-router-dom';

import RoutesApp from '../../Routes';
import GlobalStyled from '../../assets/styles/global';

export default function App() {

	return (
		<BrowserRouter>
			<GlobalStyled />

			<RoutesApp />

		</BrowserRouter>
	);
}

