import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import Contact from '../pages/contact/Contact';
import AboutUs from '../pages/aboutUs/AboutUs';
import CategoryPage from '../pages/category/CategoryPage';
import ProductDetail from '../pages/productDetail/ProductDetail';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Wishlist from '../pages/wishlist/Wishlist';
import SearchResults from '../pages/searchResults/SearchResults';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/profile/Profile';
import ThankYou from '../pages/thankYou/ThankYou';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":category" element={<CategoryPage />}/>
        <Route path="contacto" element={<Contact />} />
        <Route path='nosotros' element={<AboutUs />} />
        <Route path='producto/:id' element={<ProductDetail />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="nosotros" element={<AboutUs />} />
        <Route path='carrito' element={<Cart />} />
        {/* <Route path='checkout' element={<Checkout />} /> */}
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='buscar' element={<SearchResults />} />
      </Route>

      {/* rutas de autenticación */}
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route 
        path="checkout" 
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } 
      />
      <Route 
        path="profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />

      <Route path='gracias' element={<ThankYou />} />
    </Routes>
  );
};

export default AppRoutes;