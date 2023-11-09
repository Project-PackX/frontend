import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomCursor from './components/CustomCursor/CustomCursor';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

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
import { Loyalty } from './views/Loyalty/Loyalty';
import { Contact } from './views/Contact/Contact';
import { About } from './views/About/About';
import { PackageStatus } from './views/PackageStatus/PackageStatus';
import { PageNotFound } from "./views/PageNotFound/PageNotFound";
import { Policy } from "./views/Policy/Policy";

import { AuthProvider } from './context/auth';
import { Dispatch } from "./views/Dispatch/Dispatch";
import { History } from "./views/History/History";
import { SuccessfulResponse } from './components/Slave/SuccessfulResponse/SuccessfulResponse';

import { CourierPackages } from "./views/Courier/CourierPackages/CourierPackages";
import { CourierLockers } from "./views/Courier/CourierLockers/CourierLockers";
import { Packages } from "./views/Courier/CourierLockers/Packages";
import {AdminPackages} from "./views/Admin/Packages/AdminPackages";
import {AdminLockers} from "./views/Admin/Lockers/AdminLockers";
import {AdminUsers} from "./views/Admin/Users/AdminUsers";

function App() {

  return (
    <AuthProvider>
      <CustomCursor />
      <ScrollToTop />
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
          <Route exact path="/loyalty" element={<Loyalty />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/dispatch" element={<Dispatch />} />
          <Route exact path="/successfulresponse" element={<SuccessfulResponse />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/policy" element={<Policy />} />
          <Route exact path="/courier-packages" element={<CourierPackages />} />
          <Route exact path="/courier-lockers" element={<CourierLockers />} />
          <Route exact path="/locker/packages/:id" element={<Packages />} />
          <Route exact path="/admin-packages" element={<AdminPackages />} />
          <Route exact path="/admin-lockers" element={<AdminLockers />} />
          <Route exact path="/admin-users" element={<AdminUsers />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;