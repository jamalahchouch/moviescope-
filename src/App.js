import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import About from './pages/About';

function App() {
  return (
    <div className="App" style={{ background: '#070a18', minHeight: '100vh' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
