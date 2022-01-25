import './style.scss';

import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';

const App = () => (
  <div className="app">
    <Header />
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/about" element={<About />} />
      <Route path="/legal" element={<Legal />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
