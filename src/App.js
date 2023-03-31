// import './App.css';
import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import Container from 'react-bootstrap/Container';
import HomePage from './components/pages/HomePage';

// -------------------------------------------------------------------------------------

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
       <HomePage />
      </Container>

      <Footer />
      <button className='btn btn-primary'>ccc</button>
    </div>
  );
}

export default App;
