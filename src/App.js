import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navbar } from './components/Navbar/Navbar';

import { Track } from './views/Track/Track';


function App() {

  const getPackages = async () => {
    axios.get('http://localhost:4444/api/packages')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/track" element={<Track />} />
          <Route path="/aboutus" element={<h1>About us</h1>} />
          <Route path="/contactus" element={<h1>Contact us</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
