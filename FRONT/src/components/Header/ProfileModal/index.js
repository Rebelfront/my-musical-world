import { useDispatch, useSelector } from 'react-redux';
import { submitModifiedProfile } from 'src/actions/profile';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

const ProfileModal = ({open}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [modifiedUser, setModifiedUser] = useState(user);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [modalOpened, setModalOpened] = useState(open);
  const handleClose = () => {
    setModalOpened(false);
  };
  const handleChangeInput = (event) => {
    if (event.target.name === 'passwordConfirm') return setPasswordConfirm(event.target.value);
    const tempModifiedUser = {
      ...modifiedUser,
      [event.target.name]: event.target.value,
    };
    delete tempModifiedUser.isLogged;
    setModifiedUser(tempModifiedUser);
  };
  const handleSubmit = () => {
    const action = submitModifiedProfile(modifiedUser);
    dispatch(action);
  };

  return (
    <div>
      <Dialog open={modalOpened} onClose={handleClose}>
        <DialogTitle>Mon profil</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="dense"
              name="lastname"
              id="lastname"
              label="Nom"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre nom"
              value={modifiedUser.lastname}
              onChange={handleChangeInput}
            />
            <TextField
              margin="dense"
              name="firstname"
              id="firstname"
              label="Prénom"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre prénom"
              value={modifiedUser.firstname}
              onChange={handleChangeInput}
            />
            <TextField
              margin="dense"
              name="mail"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              placeholder="Entrez votre email"
              value={modifiedUser.mail}
              onChange={handleChangeInput}
            />
            <TextField
              margin="dense"
              name="pseudo"
              id="pseudo"
              label="Pseudo"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre pseudo"
              value={modifiedUser.pseudo}
              onChange={handleChangeInput}
            />
            <TextField
              margin="dense"
              name="password"
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              variant="standard"
              placeholder="Entrez votre mot de passe"
              value={modifiedUser.password}
              onChange={handleChangeInput}
            />
            <TextField
              margin="dense"
              name="passwordConfirm"
              id="passwordConfirm"
              label="Confirmation de mot de passe"
              type="password"
              fullWidth
              variant="standard"
              placeholder="Confirmez votre mot de passe"
              value={passwordConfirm}
              onChange={handleChangeInput}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  handleSubmit();
                }}
              >
                S'inscrire
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
};

ProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ProfileModal;
