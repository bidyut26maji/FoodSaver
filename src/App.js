import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import CursorGlow from "./components/CursorGlow/CursorGlow";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Works from './pages/Works/Works';
import Restaurant from './pages/Restaurant/Restaurant';
import NGO from './pages/NGO/NGO';
import Registration from './pages/Registration/Registration';
import Contact from './pages/Contact/Contact';
import RestaurantSubmission from './pages/Restaurant/RestaurantSubmission';
import RestaurantDashboard from './pages/Restaurant/RestaurantDashboard';
import NGODashboard from './pages/NGO/NGODashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Contributors from './pages/Contributors/Contributors';
import Contribute from './pages/Contribute/Contribute';
import Support from './pages/Support/Support';
import Team from './pages/Team/Team';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import './App.css';

function App() {
  return (
    <Router>
      <CursorGlow />
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/ngo" element={<NGO />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/restaurant-submission" element={<RestaurantSubmission />} />
            <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/support" element={<Support />} />
            <Route path="/team" element={<Team />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
