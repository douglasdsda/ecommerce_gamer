import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import "./styles/global.scss";
import Routes from "./routes";

import { CartProvider } from "./hooks/useCart";

const App: React.FC = () => (
  <BrowserRouter>
    <CartProvider>
  
      <Routes />
      <ToastContainer autoClose={3000} />
    </CartProvider>
  </BrowserRouter>
);

export default App;
