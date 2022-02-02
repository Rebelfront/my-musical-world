import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';

import { toggleAddMusicModal } from 'src/actions/addMusic';
import { toggleSharingModal, getDashboardData } from 'src/actions/dashboard';
import { unsetActionLogged } from 'src/actions/user';

import DashboardCard from 'src/components/Dashboard/DashboardCard';
import AddMusicModal from 'src/components/AddMusicModal';
import SharingModal from 'src/components/Dashboard/SharingModal';

import './style.scss';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { pseudoSharedSpace } = useParams();

  const { isLogged } = useSelector((state) => state.user);
  const {
    pseudo, artists, albums, tracks, dashboardChanged, pseudoNotExist,
  } = useSelector((state) => state.dashboard);

  const handleOpenAddMusicModal = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };

  const handleToggleSharingModal = () => {
    const action = toggleSharingModal();
    dispatch(action);
  };

  useEffect(() => {
    const action = unsetActionLogged();
    dispatch(action);
  }, []);

  useEffect(() => {
    const action = getDashboardData(pseudoSharedSpace);
    dispatch(action);
  }, [dashboardChanged, pseudoSharedSpace]);

  if (pseudoNotExist) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="dashboard">
      <aside className="dashboard__menu">
        <h2 className="dashboard__title">{isLogged ? 'Mon dashboard' : `Dashboard de ${pseudo}`}</h2>
        {isLogged && (
          <>
            <button className="dashboard__add-btn" type="button" onClick={handleOpenAddMusicModal}>
              <span>+</span>
              <MusicNoteIcon sx={{ color: '#ffffff' }} fontSize="large" />
            </button>
            <button className="dashboard__share" type="button" onClick={handleToggleSharingModal}>
              <ShareIcon />
            </button>
          </>
        )}
      </aside>
      <main className="dashboard__content">
        <Container maxWidth="md">
          { artists || albums || tracks ? (
            <>
              {artists[0] && (
                <Box sx={{ mb: '10px' }}>
                  <h3 className="txt-underlined txt-uppercase">Artistes</h3>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {artists.map((artist) => <DashboardCard type="artist" key={artist.api_id} {...artist} />)}
                  </Box>
                </Box>
              )}
              {albums[0] && (
                <Box sx={{ mb: '10px' }}>
                  <h3 className="txt-underlined txt-uppercase">Albums</h3>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {albums.map((album) => <DashboardCard type="album" key={album.api_id} {...album} />)}
                  </Box>
                </Box>
              )}
              {tracks[0] && (
                <Box>
                  <h3 className="txt-underlined txt-uppercase">Titres</h3>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {tracks.map((track) => <DashboardCard type="track" key={track.api_id} {...track} />)}
                  </Box>
                </Box>
              )}
              <button onClick={handleToggleSharingModal} className="hidden-desktop" type="button">Partager</button>
            </>
          ) : (
            <p>Pas encore de musique ajoutée</p>
          )}
          <button onClick={handleOpenAddMusicModal} className="hidden-desktop" type="button">Ajouter</button>
        </Container>
      </main>
      <AddMusicModal />
      <SharingModal />
    </div>
  );
};

export default Dashboard;
