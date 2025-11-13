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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
