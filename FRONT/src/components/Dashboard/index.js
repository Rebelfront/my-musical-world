import { useDispatch } from 'react-redux';

import datas from 'src/datas/dashboard.json';

import Container from '@mui/material/Container';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';

import { toggleAddMusicModal } from 'src/actions/addMusic';

import DashboardCard from 'src/components/Dashboard/DashboardCard';
import AddMusicModal from 'src/components/AddMusicModal';

import './style.scss';

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleOpenAddMusicModal = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };

  return (
    <div className="dashboard">
      <aside className="dashboard__menu">
        <h2 className="dashboard__title">Mon dashboard</h2>
        <button className="dashboard__add-btn" type="button" onClick={handleOpenAddMusicModal}>
          <span>+</span>
          <MusicNoteIcon sx={{ color: '#ffffff' }} fontSize="large" />
        </button>
        <button className="dashboard__share" type="button">
          <ShareIcon />
        </button>
      </aside>
      <main className="dashboard__content">
        <Container maxWidth="md">
          <Box sx={{ mb: '10px' }}>
            <h3 className="txt-underlined txt-uppercase">Artistes</h3>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {datas.artists.map((artist) => <DashboardCard type="artist" key={artist.apiId} {...artist} />)}
            </Box>
          </Box>
          <Box sx={{ mb: '10px' }}>
            <h3 className="txt-underlined txt-uppercase">Albums</h3>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {datas.albums.map((album) => <DashboardCard type="album" key={album.apiId} {...album} />)}
            </Box>
          </Box>
          <Box>
            <h3 className="txt-underlined txt-uppercase">Titres</h3>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {datas.tracks.map((track) => <DashboardCard type="track" key={track.apiId} {...track} />)}
            </Box>
          </Box>
          <button className="hidden-desktop" type="button">Partager</button>
          <button className="hidden-desktop" type="button">Ajouter</button>
        </Container>
      </main>
      <AddMusicModal />
    </div>
  );
};

export default Dashboard;
