import DashboardCard from "./DashboardCard";
import Container from '@mui/material/Container';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import './style.scss';

const Dashboard = () => {
  return(
    <div className="dashboard">
      <aside className="dashboard__menu">
        <button className="dashboard__add-btn" type="button">
          <span>+</span>
          <MusicNoteIcon sx={{ color: '#ffffff' }} fontSize="large" />
        </button>
      </aside>
      <main className="dashboard__content">
        <Container maxWidth="md">
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </Container>
      </main>
    </ div>
  );
};

export default Dashboard;