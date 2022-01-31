import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const DashboardCard = ({
  name,
  genre,
  artist,
  year,
  urlImage,
  type,
  album
}) => {
  return (
    <Card sx={{ mb: '20px' }}>
      <CardMedia
        component="img"
        alt={name}
        image={urlImage}
      />
      <CardContent>
        {type !== "artist" && (
          <Typography gutterBottom variant="h5" component="div">
            {artist}
          </Typography>
        )}
        <Typography sx={type !== "artist" ? { fontStyle: 'italic' } : {}} gutterBottom variant="h5" component="div">
          {type === "artist" ? name :`"${name}"`} {year && type === "album" && `(${year})`}
        </Typography>
        {type === "track" && (
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
    </Card>
  );
};

export default DashboardCard;