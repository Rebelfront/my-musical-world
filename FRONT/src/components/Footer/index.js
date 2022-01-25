import './style.scss';

import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <Link to="/about" className="footer-link">A propos</Link>
    <p>2022 | My Musical World</p>
    <Link to="/legal" className="footer-link">Mentions légales</Link>
  </div>
);

export default Footer;
