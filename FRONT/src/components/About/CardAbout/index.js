import './style.scss';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const CardAbout = ({ dev }) => (
  <div className="cardAbout">
    <Card className="about__card" sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        height="200"
        image={dev.url_picture}
        alt={`photo de ${dev.firstname} ${dev.lastname}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dev.firstname}
          {' '}
          {dev.lastname}
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary">
          {
            dev.roles.map((role) => (
              <p key={role}>{role}</p>
            ))
          }
        </Typography>
      </CardContent>
      <CardActions>
        <a aria-label="github-link" href={dev.githubLink} target="_blank" rel="noreferrer"><GitHubIcon fontSize="large" /></a>
        <a aria-label="linkedin-link" href={dev.linkedinLink} target="_blank" rel="noreferrer"><LinkedInIcon fontSize="large" /></a>
      </CardActions>
    </Card>
  </div>
);

CardAbout.propTypes = {
  dev: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    url_picture: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    githubLink: PropTypes.string,
    linkedinLink: PropTypes.string,
  }).isRequired,
};

CardAbout.defaultPropTypes = {
  githubLink: '',
  linkedinLink: '',
};

export default CardAbout;
