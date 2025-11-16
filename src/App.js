import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Restaurant from './pages/Restaurant';
import NGO from './pages/NGO';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import RestaurantDashboard from './pages/RestaurantDashboard';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contributors from './pages/Contributors';
import Contribute from './pages/Contribute';
import './App.css';

function App() {
  return (
    <Router>
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
            <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/contribute" element={<Contribute />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
