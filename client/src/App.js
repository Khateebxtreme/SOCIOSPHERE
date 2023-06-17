//not using config file for json 
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from './theme';

function App() {
  /* grabbing the current mode that we are on from our state */
  const mode = useSelector((state) => state.mode);

  /* Creating theme using the configurations for mode we are currently on */
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  /* Determines whether a user is logged in or not. It says if the token exists then we are authorized and this helps to keep our routes protected when defining the route paths */
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="app">
    <BrowserRouter>
      {/* Passing the created theme (based on the mode) to our application */}
      <ThemeProvider theme = {theme}>
      {/* Resets CSS to basic state which is a bit different from the version that material UI provides */}
      <CssBaseline/>
      <Routes>
        {/* Primary routes for our social media app */}
        <Route path = "/" element={<LoginPage/>} />
        <Route path = "/home" element={isAuth ? <HomePage/> : <Navigate to="/" />} />
        <Route path = "/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
