import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu, toggleProfileModal } from 'src/actions/header';
import { openLoginModal } from 'src/actions/login';
import { openSignUpModal } from 'src/actions/signup';
import { userLogout } from 'src/actions/user';

import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  Accordion, AccordionDetails, AccordionSummary, IconButton, Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './style.scss';

const MobileMenu = () => {
  const opened = useSelector((state) => state.header.mobileMenuOpened);
  const { isLogged, pseudo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    const action = toggleMobileMenu();
    dispatch(action);
  };

  const handleOpenLoginModal = () => {
    const action = openLoginModal();
    dispatch(action);
  };

  const handleOpenSignupModal = () => {
    const action = openSignUpModal();
    dispatch(action);
  };

  const handleLogout = () => {
    const action = userLogout();
    dispatch(action);
  };

  const handleOpenProfileModal = () => {
    const action = toggleProfileModal();
    dispatch(action);
  };

  const list = () => (
    <Box
      role="presentation"
    >
      {!isLogged ? (
        <List>
          <ListItem onClick={handleOpenLoginModal}>
            <Button sx={{margin: '0 auto' }} className="button-green">
              <ListItemText primary="Se connecter" />
            </Button>
          </ListItem>
          <ListItem onClick={handleOpenSignupModal}>
            <Button sx={{margin: '0 auto' }} className="button-green">
              <ListItemText primary="S'inscrire" />
            </Button>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <Accordion sx={{ display: 'block', width: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <AccountCircleIcon className="align-middle" sx={{ mr: '10px' }} />
                  <span className="align-middle">
                    {pseudo.toUpperCase()}
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button className="button-green" sx={{ display: 'block', mb: '10px'}} onClick={handleOpenProfileModal}>
                  <ListItemText primary="Mon profil" />
                </Button>
                <NavLink to="/">Ma bibliothèque</NavLink>
                <Button sx={{ display: 'block', mt: '20px'}} className="button-red" onClick={handleLogout}>
                  <ListItemText primary="Se déconnecter" />
                </Button>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>
      )}
      <NavLink className="mobile-menu__link" to="/about">A propos &gt;</NavLink>
      <NavLink className="mobile-menu__link" to="/legal">Mentions légales &gt;</NavLink>
    </Box>
  );

  return (
    <nav className="mobile-menu">
      <Button
        onClick={handleMenuToggle}
        sx={{ color: '#ffffff', padding: 0 }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        sx={{
          width: '70vw',
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: '70vw', maxWidth: '320px', boxSizing: 'border-box' },
        }}
        anchor="right"
        open={opened}
        onClose={handleMenuToggle}
      >
        <IconButton onClick={handleMenuToggle} sx={{ mb: 2 }}>
          <CloseIcon />
        </IconButton>
        {list()}
      </Drawer>
    </nav>
  );
};

export default MobileMenu;
