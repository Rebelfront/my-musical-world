import './style.scss';

import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from 'src/actions/user';
import SharingModal from '../SharingModal';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = checkUser();
    dispatch(action);
  }, []);

  return (
    <div className="app">
      <Header />
      <SharingModal />
      <Routes>
        <Route
          path="/"
          element={(
            <div className="app__main">
              <p>Lorem</p>
            </div>
          )}
        />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
