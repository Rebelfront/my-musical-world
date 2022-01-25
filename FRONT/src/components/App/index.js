import './style.scss';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';

const App = () => (
  <div className="app">
    <Header />
    <About />
    <Legal />
  </div>
);

export default App;
