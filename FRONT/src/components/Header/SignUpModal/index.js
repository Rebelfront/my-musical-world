import { useDispatch, useSelector } from 'react-redux';
import { closeSignUpModal, submitSignUp } from 'src/actions/signup';
import { changeInput } from 'src/actions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';

const SignUpModal = () => {
  const dispatch = useDispatch();
  const {
    modalOpened,
    lastname,
    firstname,
    mail,
    pseudo,
    password,
    passwordConfirm,
  } = useSelector((state) => state.signup);
  const { error } = useSelector((state) => state.errors);
  const handleClose = () => {
    const action = closeSignUpModal();
    dispatch(action);
  };
  const handleChangeInput = (event) => {
    const action = changeInput(event.target.value, event.target.name);
    dispatch(action);
  };
  const handleSubmit = () => {
    const action = submitSignUp();
    dispatch(action);
  };
  return (
    <div>
      <Dialog open={modalOpened} onClose={handleClose}>
        <DialogTitle>Inscription</DialogTitle>
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
              value={lastname}
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
              value={firstname}
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
              value={mail}
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
              value={pseudo}
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
              value={password}
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
            <DialogActions sx={{display: 'flex', alignContent: 'space-between', flexWrap: 'wrap'}}>
              {error && (
                <Alert className="signupModal__error" severity="error">{error}</Alert>
              )}
              <Button
                sx={{ml:"auto", mt:"10px"}}
                onClick={() => {
                  handleClose();
                  handleSubmit();
                }}
                className="button-green"
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

export default SignUpModal;
