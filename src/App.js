import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home, Contact } from './pages';

// Components
import { Header, Footer } from './components'

import './App.scss';

function App() {
  return <>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>;
          <Route path='/contact' element={<Contact/>}/>;
        </Routes>
      <Footer/>
    </BrowserRouter>
  </>;
}

export default App;
