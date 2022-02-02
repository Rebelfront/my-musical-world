import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

import { toggleAddMusicModal } from 'src/actions/addMusic';
import { toggleSharingModal, getDashboardData } from 'src/actions/dashboard';

import DashboardCard from 'src/components/Dashboard/DashboardCard';
import AddMusicModal from 'src/components/AddMusicModal';
import SharingModal from 'src/components/Dashboard/SharingModal';

import './style.scss';
import style from 'src/styles/_exports.module.scss';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { pseudoSharedSpace } = useParams();

  const { isLogged } = useSelector((state) => state.user);
  const {
    pseudo, artists, albums, tracks, dashboardChanged,
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
    const action = getDashboardData(pseudoSharedSpace);
    dispatch(action);
  }, [dashboardChanged, pseudoSharedSpace]);

  return (
    <div className="dashboard">
      <main className="dashboard__content">
        <Container maxWidth="lg">
          <>
            <h2 className="dashboard__title">{isLogged ? 'Ma bibliothèque' : `Bibliothèque de ${pseudo}`}</h2>
            { artists || albums || tracks ? (
              <>
                {artists[0] && (
                <Box sx={{ mb: '10px' }}>
                  <h3 className="dashboard__cat-title">
                    <PersonIcon sx={{ mr: '10px' }} fontSize="large" />
                    <span>Artistes</span>
                  </h3>
                  <Box sx={artists.length > 2 ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } : { display: 'flex', flexWrap: 'wrap' }}>
                    {artists.map((artist) => <DashboardCard type="artist" key={artist.api_id} {...artist} />)}
                  </Box>
                </Box>
                )}
                {albums[0] && (
                <Box sx={{ mb: '10px' }}>
                  <h3 className="dashboard__cat-title">
                    <AlbumIcon sx={{ mr: '10px' }} fontSize="large" />
                    <span>Albums</span>
                  </h3>
                  <Box sx={albums.length > 2 ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } : { display: 'flex', flexWrap: 'wrap' }}>
                    {albums.map((album) => <DashboardCard type="album" key={album.api_id} {...album} />)}
                  </Box>
                </Box>
                )}
                {tracks[0] && (
                <Box>
                  <h3 className="dashboard__cat-title">
                    <AudiotrackIcon sx={{ mr: '10px' }} fontSize="large" />
                    Titres
                  </h3>
                  <Box sx={tracks.length > 2 ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } : { display: 'flex', flexWrap: 'wrap' }}>
                    {tracks.map((track) => <DashboardCard type="track" key={track.api_id} {...track} />)}
                  </Box>
                </Box>
                )}
                {isLogged && (
                  <Fab size="medium" onClick={handleToggleSharingModal} className="dashboard__share-mobile" aria-label="share dashboard">
                    <ShareIcon sx={{ width: '35px', height: '35px' }} />
                  </Fab>
                )}
              </>
            ) : (
              <p>Pas encore de musique ajoutée</p>
            )}
            {isLogged && (
              <Fab size="medium" onClick={handleOpenAddMusicModal} sx={{ backgroundColor: style.blue }} className="dashboard__add-mobile" aria-label="add music">
                <AddIcon sx={{ fontSize: '30px' }} />
              </Fab>
            )}
          </>
        </Container>
      </main>
      <AddMusicModal />
      <SharingModal />
    </div>
  );
};

export default Dashboard;
