import './App.css';
import { Routes, Route } from 'react-router-dom'

import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import Home from './components/pages/home/Home';
import Error from './components/Error/Error';


function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/home" element={<Home />} />
       <Route path="*" element={<Error />} />
       
     </Routes>
    </div>
  );
}

export default App;
