import { deleteDashboardItem } from 'src/actions/dashboard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActions } from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';

import PropTypes from 'prop-types';

import './style.scss';
import style from 'src/styles/_exports.module.scss';

import { useDispatch, useSelector } from 'react-redux';

const DashboardCard = ({
  name,
  genre,
  artist,
  year,
  url_image,
  type,
  album,
  api_id,
  url_sample,
}) => {
  const dispatch = useDispatch();

  const { isLogged } = useSelector((state) => state.user);

  const handleCardDelete = (api_id, type) => {
    const action = deleteDashboardItem(api_id, type);
    dispatch(action);
  };

  return (
    <Card className="dashboard-card" sx={{ mb: '20px' }}>
      <CardMedia
        component="img"
        alt={name}
        height="auto"
        image={url_image}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        {type !== 'artist' && (
          <Typography gutterBottom variant="h5" component="div">
            {artist}
          </Typography>
        )}
        <Typography sx={type !== 'artist' ? { fontStyle: 'italic', fontSize: '20px' } : {}} gutterBottom variant="h5" component="div">
          {type === 'artist' ? name : `"${name}"`} {year && type === 'album' && `(${year})`}
        </Typography>
        {type === 'track' && (
          <Typography variant="body2" color="text.secondary">
            Album: {`"${album}" (${year})`}
          </Typography>
        )}
        {genre && (
          <Typography variant="body2" color="text.secondary">
            Genre: {genre}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isLogged && (
          <Button
            onClick={() => {
              handleCardDelete(api_id, type);
            }}
            size="small"
            sx={{ color: style.blue }}
          >
            <DeleteIcon sx={{ color: style.red }} />
          </Button>
        )}
        { type === 'track' && (
          <Button
            onClick={() => {
              window.open(url_sample, name, `width=300,height=100,left=${(window.innerWidth / 2) - 150},top=${(window.innerHeight / 2)}`);
            }}
          >
            <PlayCircleFilledOutlinedIcon sx={{ color: style['dark-grey'] }} />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string,
  year: PropTypes.number,
  album: PropTypes.string,
  url_image: PropTypes.string.isRequired,
  api_id: PropTypes.number.isRequired,
  url_sample: PropTypes.string,
  genre: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default DashboardCard;
