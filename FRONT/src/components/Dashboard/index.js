import DashboardCard from "./DashboardCard";
import Grid from '@mui/material/Grid';
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
        <Grid maxWidth="md" container spacing={2}>
          <Grid item md={6} lg={3}>
            <DashboardCard />
          </Grid>
          <Grid item md={6} lg={3}>
            <DashboardCard />
          </Grid>
          <Grid item md={6} lg={3}>
            <DashboardCard />
          </Grid>
          <Grid item md={6} lg={3}>
            <DashboardCard />
          </Grid>
        </Grid>
      </main>
    </ div>
  );
};

export default Dashboard;