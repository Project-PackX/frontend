import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { CookieButton } from './components/CookieButton/CookieButton';

import { Home } from './views/Home/Home';
import { Track } from './views/Track/Track';
import { Login } from './views/Login/Login';
import { ResetPasswd } from './views/ResetPasswd/ResetPasswd';
import { Register } from './views/Register/Register';
import  Contact from './views/Contact/Contact';
import { About } from './views/About/About';
import { PackageStatus } from './views/PackageStatus/PackageStatus';
import { PageNotFound } from "./views/PageNotFound/PageNotFound";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { Policy } from "./views/Policy/Policy";

import { AuthProvider } from './context/auth';
import Dispatch from "./views/Dispatch/Dispatch";
import {History} from "./views/History/History";
import {SuccessfulSend} from "./components/Slave/SuccessfulSend/SuccessfulSend";

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
              <Route exact path="/resetpasswd" element={<ResetPasswd />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/dispatch" element={<Dispatch />} />
              <Route exact path="/successful-send" element={<SuccessfulSend />} />
              <Route exact path="/history" element={<History />} />
              <Route exact path="/policy" element={<Policy />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <CookieButton />
            <Footer />
          </Router>
        </div>
      </AuthProvider>
  );
}

export default App;
