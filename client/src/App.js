import {BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './pages/homePage/index.jsx';
import LoginPage from './pages/loginPage/index.jsx';
import ProfilePage from './pages/profilePage/index.jsx';



function App() {

  return (
    <div className="App">
     <Router>
      <Routes >
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile/:userId' element={<ProfilePage/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
