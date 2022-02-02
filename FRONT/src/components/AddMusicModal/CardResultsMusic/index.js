import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { submitAddMusic } from 'src/actions/addMusic';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CardResultsMusic = ({ music }) => {
  const dispatch = useDispatch();
  const { typeMusic } = useSelector((state) => state.addMusic);
  const handleSubmit = (event) => {
    const action = submitAddMusic(Number(event.target.id));
    dispatch(action);
  };

  return (
    <div>
      <Card className="result__card">
        <div className="card__left">
          <CardMedia
            className="card__image"
            component="img"
            image={music.urlImage}
            alt={`photo de ${music.name}`}
          />
        </div>
        <div className="card__right">
          <CardContent className="card__content">
            <Typography className="content__title" gutterBottom variant="h5" component="div">
              {music.name}
            </Typography>
            {(typeMusic === 1 || typeMusic === 2) && (
              <Typography className="content__infos" component="div" variant="body2" color="text.secondary">
                <p>{music.album}</p>
                {(typeMusic === 1) && (
                  <p>{music.artist}</p>
                )}
                <p>{music.year} / {music.genre}</p>
              </Typography>
            )}
            <div className="card__buttons">
              {/* typeMusic: 1 - Titre, 2 - Album, 3 - Artiste */}
              {(typeMusic === 1) && (
              <Button
                className="content__button"
                onClick={() => {
                  window.open(music.urlSample, music.name, `width=300,height=100,left=${(window.innerWidth / 2) - 150},top=${(window.innerHeight / 2)}`);
                }}
              >Ecouter un extrait
              </Button>
              )}
              <Button
                id={music.apiId}
                onClick={handleSubmit}
                className="button-green"
              >
                Ajouter
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

CardResultsMusic.propTypes = {
  music: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artist: PropTypes.string,
    year: PropTypes.number || PropTypes.string,
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