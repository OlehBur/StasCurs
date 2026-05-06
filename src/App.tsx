import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Loader from './components/Loader';
import './global.css';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
        setPrevPath(location.pathname);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [location.pathname, prevPath]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/StasCurs/">
      <Header />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
};

export default App;
