import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/index.jsx';
import LoginPage from './pages/loginPage/index.jsx';
import ProfilePage from './pages/profilePage/index.jsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme.js';



function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.token));
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes >
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to={'/'}/>} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to={'/'}/>} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
