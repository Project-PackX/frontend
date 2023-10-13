import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navbar } from './components/Navbar/Navbar';

import { Home } from './views/Home/Home';
import { Track } from './views/Track/Track';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register';
import { Contact } from './views/Contact/Contact';
import { About } from './views/About/About';
import { PackageStatus } from './views/PackageStatus/PackageStatus';
import { PageNotFound } from "./views/PageNotFound/PageNotFound";
import { Dashboard } from "./views/Dashboard/Dashboard";

import { AuthProvider } from './context/auth';

function App() {

  return (
      <AuthProvider>
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/track" element={<Track />} />
              <Route exact path="/track/:id" element={<PackageStatus />} />
              <Route exact path="/aboutus" element={<About />} />
              <Route exact path="/contactus" element={<Contact />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
  );
}

export default App;
