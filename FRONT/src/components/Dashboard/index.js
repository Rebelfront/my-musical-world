import { useDispatch, useSelector } from 'react-redux';

import datas from 'src/datas/dashboard.json';

import Container from '@mui/material/Container';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';

import { toggleAddMusicModal } from 'src/actions/addMusic';

import DashboardCard from 'src/components/Dashboard/DashboardCard';
import AddMusicModal from 'src/components/AddMusicModal';
import SharingModal from 'src/components/Dashboard/SharingModal';

import { toggleSharingModal } from 'src/actions/dashboard';

import './style.scss';
import { useEffect } from 'react';
import { getDashboardData } from 'src/actions/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { artists, albums, tracks } = useSelector((state) => state.dashboard);

  const handleOpenAddMusicModal = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };

  const handleToggleSharingModal = () => {
    const action = toggleSharingModal();
    dispatch(action);
  };

  useEffect(() => {
    const action = getDashboardData();
    dispatch(action);
  }, []);

  return (
    <div className="dashboard">
      <aside className="dashboard__menu">
        <h2 className="dashboard__title">Mon dashboard</h2>
        <button className="dashboard__add-btn" type="button" onClick={handleOpenAddMusicModal}>
          <span>+</span>
          <MusicNoteIcon sx={{ color: '#ffffff' }} fontSize="large" />
        </button>
        <button className="dashboard__share" type="button" onClick={handleToggleSharingModal}>
          <ShareIcon />
        </button>
      </aside>
      <main className="dashboard__content">
        <Container maxWidth="md">
          { artists || albums || tracks ? (
            <>
              {artists && (
                <Box sx={{ mb: '10px' }}>
                  <h3 className="txt-underlined txt-uppercase">Artistes</h3>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {artists.map((artist) => <DashboardCard type="artist" key={artist.apiId} {...artist} />)}
                  </Box>
                </Box>
              )}
              {albums && (
                <Box sx={{ mb: '10px' }}>
                  <h3 className="txt-underlined txt-uppercase">Albums</h3>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {albums.map((album) => <DashboardCard type="album" key={album.apiId} {...album} />)}
                  </Box>
                </Box>
              )}
              {tracks && (
                <Box>
                  <h3 className="txt-underlined txt-uppercase">Titres</h3>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {tracks.map((track) => <DashboardCard type="track" key={track.apiId} {...track} />)}
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <p>Pas encore de musique ajoutée</p>
          )}
          <button onClick={handleToggleSharingModal} className="hidden-desktop" type="button">Partager</button>
          <button onClick={handleOpenAddMusicModal} className="hidden-desktop" type="button">Ajouter</button>
        </Container>
      </main>
      <AddMusicModal />
      <SharingModal />
    </div>
  );
};

export default Dashboard;
