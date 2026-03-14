import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import Contact from '../pages/contact/Contact';
import AboutUs from '../pages/aboutUs/AboutUs';
import CategoryPage from '../pages/category/CategoryPage';
import ProductDetail from '../pages/productDetail/ProductDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":category" element={<CategoryPage />}/>
        <Route path='producto/:id' element={<ProductDetail />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="nosotros" element={<AboutUs />} />
        
      </Route>
    </Routes>
  );
};

export default AppRoutes;