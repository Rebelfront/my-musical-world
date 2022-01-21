import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'src/components/App';
import store from './store';

const rootReactElement = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
const target = document.getElementById('root');

render(rootReactElement, target);
