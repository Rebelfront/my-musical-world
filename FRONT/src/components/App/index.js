import './style.scss';

import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';
import Homepage from 'src/components/Homepage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from 'src/actions/user';
import Dashboard from '../Dashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = checkUser();
    dispatch(action);
  }, []);

  return (
    <div className="app">
      <div className="app__main">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shared-space/:pseudoSharedSpace" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
