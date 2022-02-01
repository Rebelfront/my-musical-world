import './style.scss';
import homepageLogo from 'src/assets/homepageLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import { openSignUpModal } from 'src/actions/signup';

const Homepage = () => {
  const dispatch = useDispatch();  
  const { isLogged } = useSelector((state) => state.user);
  const handleSignupOpen = () => {
    const action = openSignUpModal();
    dispatch(action);
  }
  return (
    <div className="homepage">
        <h2 className="homepage__title">My Musical World</h2>
        <img className="homepage__logo"
        src= {homepageLogo}
        alt="Disque"></img>
        <p className='homepage__text'> Lorem ipsum dolor sit amet. Eos amet consequatur et nihil consectetur est aliquam iure. Aut nostrum iusto et exercitationem odio qui rerum velit et voluptas corrupti a consequatur consequatur? Id harum veritatis est repellendus galisum cum quidem expedita et quia asperiores sit autem rerum.

            Et deleniti fugit eos repudiandae saepe ut aliquid sint ea voluptatem dolor. Sed esse voluptatibus ea quia omnis et quis nemo est cupiditate enim. Hic doloribus velit et facere ipsum qui modi laboriosam ab itaque repellat ut earum voluptatem sed mollitia dolores. Sed vero error qui rerum iure sed quas iste qui omnis asperiores repellendus similique et ipsam facilis qui dolor aliquid.

            Rem cupiditate consequuntur et iste commodi ut eveniet vitae. Et libero velit ut minima temporibus sit Quis Quis? Et magnam minima aut perspiciatis esse non veritatis laboriosam. Eum earum voluptate et ipsam voluptas eum deserunt fugiat ab facere excepturi ea autem cupiditate.
        </p>
        {!isLogged && (
        <DialogActions>
            <Button
                sx={{ mb: '60px' }}
                onClick={() => {
                handleSignupOpen();
                }}
                className="button-green"
            >
                S'inscrire
            </Button>
        </DialogActions>
        ) }
    </div>
  );
}
export default Homepage;
