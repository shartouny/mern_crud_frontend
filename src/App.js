import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import ManageEmployees from './pages/ManageEmployees';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />}></Route>
					<Route path='/manage-employees' element={<ManageEmployees />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
