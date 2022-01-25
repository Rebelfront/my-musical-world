import './style.scss';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';

const App = () => (
  <div className="app">
    <Header />
    {/* <About />
    <Legal /> */}
    <Footer />
  </div>
);

export default App;
