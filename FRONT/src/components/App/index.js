import './style.scss';

import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import AddMusicModal from 'src/components/AddMusicModal';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';
import Homepage from 'src/components/Homepage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from 'src/actions/user';
import SharingModal from '../SharingModal';
import Dashboard from '../Dashboard';

import { toggleAddMusicModal } from 'src/actions/addMusic';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = checkUser();
    dispatch(action);
  }, []);

  const handleOpenAddMusicModal = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };
  
  // <button type="button" onClick={handleOpenAddMusicModal}>+ music</button>
  // <AddMusicModal />

  return (
    <div className="app">
      <div className="app__main">
      <Header />
      <SharingModal />
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
