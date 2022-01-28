import './style.scss';

import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import AddMusicModal from 'src/components/AddMusicModal';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from 'src/actions/user';

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

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <div className="app__main">
              <p>Lorem</p>
              <button type="button" onClick={handleOpenAddMusicModal}>+ music</button>
              <AddMusicModal />
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
