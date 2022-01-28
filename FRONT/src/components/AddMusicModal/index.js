import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleAddMusicModal, submitAddMusic } from 'src/actions/addMusic';
// import { changeInput } from 'src/actions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

const AddMusicModal = () => {
  const dispatch = useDispatch();
  const { modalOpened } = useSelector((state) => state.addMusic);
  const [search, setSearch] = useState('');

  const handleClose = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };
  const handleChangeInput = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = () => {
    const action = submitAddMusic(search);
    dispatch(action);
  };

  return (
    <div>
      <Dialog open={modalOpened} onClose={handleClose}>
        <DialogTitle>Ajouter un titre / album / artiste</DialogTitle>
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
              name="search"
              id="search"
              label="Recherche"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre recherche"
              value={search}
              onChange={handleChangeInput}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  handleSubmit();
                }}
                className="button-green"
              >
                Rechercher
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

export default AddMusicModal;
