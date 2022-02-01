import { deleteDashboardItem } from 'src/actions/dashboard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';

const DashboardCard = ({
  name,
  genre,
  artist,
  year,
  url_image,
  type,
  album,
  api_id,
}) => {
  const dispatch = useDispatch();

  const handleCardDelete = (api_id, type) => {
    const action = deleteDashboardItem(api_id, type);
    dispatch(action);
  };

  return (
    <Card sx={{ mb: '20px' }}>
      <CardMedia
        component="img"
        alt={name}
        image={url_image}
      />
      <CardContent>
        {type !== 'artist' && (
          <Typography gutterBottom variant="h5" component="div">
            {artist}
          </Typography>
        )}
        <Typography sx={type !== 'artist' ? { fontStyle: 'italic' } : {}} gutterBottom variant="h5" component="div">
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
      <CardActions>
        <Button
          onClick={() => {
            handleCardDelete(api_id, type);
          }}
          size="small"
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default DashboardCard;
