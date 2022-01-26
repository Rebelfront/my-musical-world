import './style.scss';
// import logo from 'src/assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { openLoginModal } from 'src/actions/login';
import { openSignUpModal } from 'src/actions/signup';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import MobileMenu from './MobileMenu';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import AlbumIcon from '@mui/icons-material/Album';
import { userLogout } from '../../actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const { isLogged, pseudo } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserLogout = () => {
    const action = userLogout();
    dispatch(action);
  }

  const handleOpenLoginModal = () => {
    const action = openLoginModal();
    dispatch(action);
  };

  const handleOpenSignUpModal = () => {
    const action = openSignUpModal();
    dispatch(action);
  };

  return (
    <header className="header">
      {/* <h1 className="header__title">My musical w<img src={logo} className="header-logo" alt="Logo My Musical World" />rld</h1> */}
      <h1 className="header__title">My musical world</h1>
      {!isLogged ? (
        <>
          <div className="hidden-mobile">
            <button type="button" onClick={handleOpenLoginModal}>Se connecter</button>
            <button type="button" onClick={handleOpenSignUpModal}>S'inscrire</button>
          </div>
          <LoginModal />
          <SignUpModal />
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="User menu">
              <IconButton
                onClick={handleUserMenuClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{pseudo.slice(0, 1).toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> Mon profil
            </MenuItem>
            <MenuItem>
            <ListItemIcon>
              <AlbumIcon />
            </ListItemIcon>
               Ma bibliothèque
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleUserLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Déconnexion
            </MenuItem>
          </Menu>
        </>
      )}
      <MobileMenu />
    </header>
  );
};

export default Header;
