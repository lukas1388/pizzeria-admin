import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Table from './components/pages/Table/Table';
import NotFound from './components/pages/NotFound/NotFound';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';

const App = () => {
  return (
    <div>
      <h1 className='mb-4 text-center'>Pizzeria-Admin</h1>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table/:id' element={<Table />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
};

export default App;