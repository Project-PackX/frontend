import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navbar } from './components/Navbar/Navbar';

import { Home } from './views/Home/Home';
import { Track } from './views/Track/Track';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/aboutus" element={<h1>About us</h1>} />
          <Route path="/contactus" element={<h1>Contact us</h1>} />
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
