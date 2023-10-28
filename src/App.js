import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomCursor from './components/CustomCursor/CustomCursor';
import Scroll from './components/ScrollToTop/ScrollToTop';


import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

import { Home } from './views/Home/Home';
import { Track } from './views/Track/Track';
import { Login } from './views/Login/Login';
import { CodeAuth } from './views/CodeAuth/CodeAuth';
import { ResetPasswd } from './views/ResetPasswd/ResetPasswd';
import { UserData } from './views/UserData/UserData';
import { DeleteUser } from './views/DeleteUser/DeleteUser';
import { Register } from './views/Register/Register';
import { Contact } from './views/Contact/Contact';
import { About } from './views/About/About';
import { PackageStatus } from './views/PackageStatus/PackageStatus';
import { PageNotFound } from "./views/PageNotFound/PageNotFound";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { AdminDashboard } from "./views/AdminDashboard/AdminDashboard";
import { Policy } from "./views/Policy/Policy";

import { AuthProvider } from './context/auth';
import { Dispatch } from "./views/Dispatch/Dispatch";
import { History } from "./views/History/History";
import { SuccessfulSend } from "./components/Slave/SuccessfulSend/SuccessfulSend";

function App() {

  return (
    <AuthProvider>
      <CustomCursor />
      <Scroll />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/track" element={<Track />} />
          <Route exact path="/track/:id" element={<PackageStatus />} />
          <Route exact path="/aboutus" element={<About />} />
          <Route exact path="/contactus" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/codeauth" element={<CodeAuth />} />
          <Route exact path="/resetpasswd" element={<ResetPasswd />} />
          <Route exact path="/userdata" element={<UserData />} />
          <Route exact path="/deleteuser" element={<DeleteUser />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route exact path="/dispatch" element={<Dispatch />} />
          <Route exact path="/successful-send" element={<SuccessfulSend />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/policy" element={<Policy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;