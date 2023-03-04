import { ToastContainer } from 'react-toastify';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home, Contact, Login, Register, Reset, Admin } from './pages';

// Components
import { Header, Footer, ProductDetails } from './components';
import { UseAdminRoute } from './components/adminRoute/AdminRoute';

import './theme.css';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <ToastContainer limit={2} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />;
          <Route path='/contact' element={<Contact />} />;
          <Route path='/login' element={<Login />} />;
          <Route path='/register' element={<Register />} />;
          <Route path='/reset-password' element={<Reset />} />;
          <Route
            path='/admin/*'
            element={
              <UseAdminRoute>
                <Admin />
              </UseAdminRoute>
            }
          />
          <Route path='/product-details/:id' element={<ProductDetails />} />;
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
