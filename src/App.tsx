import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useLocation, 
} from "react-router-dom"; 
 
import Header from "./components/Header"; 
import Footer from "./components/footer"; 
 
import Home from "./Pages/Home"; 
import About from "./Pages/Aboutus"; 
import Enquiry from "./Pages/Enquery"; 
 
import Sparepartservices from "./Pages/Services/Sparepartservices"; 
import Technicaldoc from "./Pages/Services/Technicaldoc"; 
import Technicalsupport from "./Pages/Services/Technicalsupport"; 
import Scanner from "./Pages/Services/Scanneravailable"; 
 
import NewProtoDevelopment from "./Pages/Capabilities/NewProtodev"; 
import PreHomologation from "./Pages/Capabilities/PreHomologation"; 
import PostProduction from "./Pages/Capabilities/Postprod"; 
import Capabilities from "./Pages/Capabilities"; 
 
import Careers from "./Pages/Careers/Careers"; 
 
import ScannerAdminDashboard from "./Pages/admin/adminDashboard"; 
import Login from "./Pages/admin/adminLogin"; 
 
 
function AppContent() { 
  const location = useLocation(); 
 
  // Hide Header/Footer ONLY on admin dashboard 
  const isAdminDashboard = 
    location.pathname === "/scanner-admin/dashboard"; 
 
  return ( 
    <> 
      {!isAdminDashboard && <Header />} 
 
      <Routes> 
        <Route path="/" element={<Home />} /> 
 
        <Route path="/about" element={<About />} /> 
 
        <Route 
          path="/services/spare-parts" 
          element={<Sparepartservices />} 
        /> 
 
        <Route 
          path="/services/technical-support" 
          element={<Technicaldoc />} 
        /> 
 
        <Route 
          path="/services/technical-documentation" 
          element={<Technicalsupport />} 
        /> 
 
        <Route 
          path="/services/scanner-availability" 
          element={<Scanner />} 
        /> 
 
        <Route 
          path="/capabilities" 
          element={<Capabilities />} 
        /> 
 
        <Route 
          path="/capabilities/new-proto-development" 
          element={<NewProtoDevelopment />} 
        /> 
 
        <Route 
          path="/capabilities/pre-homologation" 
          element={<PreHomologation />} 
        /> 
 
        <Route 
          path="/capabilities/post-production" 
          element={<PostProduction />} 
        /> 
 
        <Route 
          path="/careers" 
          element={<Careers />} 
        /> 
 
        <Route 
          path="/enquiry" 
          element={<Enquiry />} 
        /> 
 
        {/* Admin Login - Header/Footer WILL show */} 
        <Route 
          path="/scanner-admin/login" 
          element={<Login />} 
        /> 
 
        {/* Admin Dashboard - Header/Footer WILL NOT show */} 
        <Route 
          path="/scanner-admin/dashboard" 
          element={<ScannerAdminDashboard />} 
        /> 
      </Routes> 
 
      {!isAdminDashboard && <Footer />} 
    </> 
  ); 
} 
 
 
function App() { 
  return ( 
    <BrowserRouter> 
      <AppContent /> 
    </BrowserRouter> 
  ); 
} 
 
export default App; 