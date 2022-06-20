import './App.css';
import Navbar from './components/Navbar';
import {
  // BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';
import Main from './components/Main';
import Login from './components/Login'
import Signup from './components/Signup';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Home from './components/Home';
import UsersState from './context/users/UsersState';
import {Themecontext} from './context/theme/ThemeState';
import { useContext } from 'react';
import Test from './components/Test';

function App() {
  const theme = useContext(Themecontext)
  const {isdark} = theme
  const darklocal = localStorage.getItem('dark')
  
  return (
    
      <UsersState>
        <NoteState>
          {/* <Router> */}
          <div className={`App min-h-screen max-h-full  ${isdark || darklocal==='true'?'bg-neutral-900 text-white':'bg-gradient-to-tr from-red-400 to-blue-400'}`}>

            <Navbar />

            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/test" element={<Test />} />
            </Routes>

            <Footer />

          </div>
          {/* </Router> */}
        </NoteState>
      </UsersState>
   
  );
}

export default App;
