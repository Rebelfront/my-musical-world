import './style.scss';

import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from 'src/actions/user';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
   const action = checkUser();
   dispatch(action);
  }, []);

  return(
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
};

export default App;
