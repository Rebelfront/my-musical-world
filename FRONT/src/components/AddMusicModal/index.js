import { useDispatch, useSelector } from 'react-redux';
import { toggleAddMusicModal, submitAddMusic } from 'src/actions/addMusic';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CardResultsMusic from 'src/components/AddMusicModal/CardResultsMusic';

const AddMusicModal = () => {
  const dispatch = useDispatch();
  const { modalOpened, searchMusic, typeMusic } = useSelector((state) => state.addMusic);

  const handleClose = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };
  const handleChangeInput = (event) => {
    const action = changeInput(event.target.value, event.target.name);
    dispatch(action);
  };
  const handleSubmit = () => {
    const action = submitAddMusic();
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
              '& .MuiTextField-root': {
                m: 1, width: '25ch',
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="dense"
              name="searchMusic"
              id="search"
              label="Recherche"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre recherche"
              value={searchMusic}
              onChange={handleChangeInput}
            />
            <FormControl sx={{ m: 1, width: 100 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Type"
                name="typeMusic"
                id="demo-simple-select"
                value={typeMusic}
                onChange={handleChangeInput}
              >
                <MenuItem value={1}>Titre</MenuItem>
                <MenuItem value={2}>Album</MenuItem>
                <MenuItem value={3}>Artiste</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button
                onClick={() => {
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
        {/* <div className="about__cards">
          {
            devs.map((dev) => (
              <CardResultsMusic
                key={dev.lastname}
                dev={dev}
              />
            ))
          }
        </div> */}
      </Dialog>
    </div>
  );
};

export default AddMusicModal;
