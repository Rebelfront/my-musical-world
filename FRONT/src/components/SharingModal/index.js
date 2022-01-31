import { useSelector } from 'react-redux';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

const SharingModal = () => {
  const location = window.location.href;
  const { pseudo } = useSelector((state) => state.user);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const url = `${location}shared-space/${pseudo}`;
  const handleClose = () => {
    setIsOpened(false);
  };
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    }
    return document.execCommand('copy', true, text);
  }
  const handleCopyClick = () => {
    copyTextToClipboard(url)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog open={isOpened} onClose={handleClose}>
        <DialogTitle sx={{ padding: '30px' }}>Partager ma bibliothèque musicale</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="dense"
              name="url"
              id="url"
              label="Lien de partage"
              type="url"
              fullWidth
              variant="standard"
              value={url}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  handleCopyClick();
                }}
                className="button-green"
              >
                {isCopied ? 'Copié!' : 'Copier'}
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

export default SharingModal;
