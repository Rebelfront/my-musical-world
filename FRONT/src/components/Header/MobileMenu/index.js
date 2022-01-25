import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from 'src/actions/header';
import { openLoginModal } from 'src/actions/login';
import { openSignUpModal } from 'src/actions/signup';
import { userLogout } from 'src/actions/user';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import CloseIcon from '@mui/icons-material/Close';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@mui/material';
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
  };

  const list = () => (
    <Box
      role="presentation"
    >
      {!isLogged ? (
        <List>
          <ListItem onClick={handleOpenLoginModal}>
            <Button>
              <ListItemText primary="Se connecter" />
            </Button>
          </ListItem>
          <ListItem onClick={handleOpenSignupModal}>
            <Button>
              <ListItemText primary="S'inscrire" />
            </Button>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  {pseudo}
                  <AccountCircleIcon />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Button>
                <ListItemText primary="Mon profil" />
              </Button>
              <a href="#">Ma bibliothèque</a>
              <Button onClick={handleLogout}>
                <ListItemText primary="Se déconnecter" />
              </Button>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>
      )}
      <Divider />
      <a href="#">A propos</a>
      <br />
      <br />
      <a href="#">Mentions légales</a>
    </Box>
  );

  return (
    <div className="mobile-menu">
        <Button onClick={handleMenuToggle}>
          <GiHamburgerMenu />
        </Button>
        <Drawer
          anchor="right"
          open={opened}
          onClose={handleMenuToggle}
        >
          <IconButton onClick={handleMenuToggle} sx={{mb: 2}}>
            <CloseIcon />
          </IconButton>
          {list()}
        </Drawer>
    </div>
  );
}

export default MobileMenu;