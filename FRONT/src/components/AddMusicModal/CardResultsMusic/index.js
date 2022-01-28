import './style.scss';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CardResultsMusic = ({ music }) => {
  const handleSubmit = () => {
    // const action = submitAddMusic();
    // dispatch(action);
  };

  return (
    <div>
      <Card className="result__card">
        <CardMedia
          className="card__image"
          component="img"
          height="50"
          image={music.urlImage}
          alt={`photo de ${music.name}`}
        />
        <div className="card__wrapper">
          <CardContent className="card__content">
            <Typography className="content__title" gutterBottom variant="h5" component="div">
              {music.name}
            </Typography>
            <Typography className="content__infos" component="div" variant="body2" color="text.secondary">
              {music.artist}
              <br />
              {music.album}
              <br />
              {music.year}
              <br />
              {music.genre}
            </Typography>
            <a href={music.urlSample} target="_blank" rel="noreferrer">Ecouter un extrait</a>
          </CardContent>
          <Button
            onClick={handleSubmit}
            className="button-green"
          >
            Ajouter
          </Button>
        </div>
      </Card>
    </div>
  );
};

CardResultsMusic.propTypes = {
  music: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artist: PropTypes.string,
    year: PropTypes.number,
    album: PropTypes.string,
    urlImage: PropTypes.string.isRequired,
    apiId: PropTypes.number.isRequired,
    urlSample: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
};

CardResultsMusic.defaultPropTypes = {
  music: {
    artist: 'Artiste non trouvé',
    year: 'Année non trouvé',
    album: 'Album non trouvé',
    urlSample: 'Extrait non trouvé',
    genre: 'Genre non trouvé',
  },
};

export default CardResultsMusic;
