import './style.scss';
// import logo from 'src/assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from 'src/actions/login';
import { openSignUpModal } from 'src/actions/signup';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import MobileMenu from './MobileMenu';
import ProfileModal from './ProfileModal';

const Header = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);

  const handleOpenLoginModal = () => {
    const action = openLoginModal();
    dispatch(action);
  };
  const handleOpenSignUpModal = () => {
    const action = openSignUpModal();
    dispatch(action);
  };

  return (
    <header className="header">
      {/* <h1 className="header__title">My musical w<img src={logo} className="header-logo" alt="Logo My Musical World" />rld</h1> */}
      <h1 className="header__title">My musical world</h1>
      {!isLogged && (
        <>
          <div className="hidden-mobile">
            <button type="button" onClick={handleOpenLoginModal}>Se connecter</button>
            <button type="button" onClick={handleOpenSignUpModal}>S'inscrire</button>
          </div>
          <LoginModal />
          <SignUpModal />
        </>
      )}
      <MobileMenu />
      <ProfileModal 
        open={true}
      />
    </header>
  );
};

export default Header;
