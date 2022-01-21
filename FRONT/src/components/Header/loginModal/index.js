import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal } from 'src/actions/login';
import { changeInput } from 'src/actions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = () => {
  const dispatch = useDispatch();
  const { modalOpened, email, password } = useSelector((state) => state.login);
  const handleClose = () => {
    const action = closeLoginModal();
    dispatch(action);
  };
  const handleChangeInput = (event) => {
    const action = changeInput(event.target.value, event.target.name);
    dispatch(action);
  };

  return (
    <div>
      <Dialog open={modalOpened} onClose={handleClose}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            placeholder="Entrez votre email"
            value={email}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Se connecter</Button>
        </DialogActions>
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

export default FormDialog;
