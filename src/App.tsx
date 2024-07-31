import React, { useEffect } from "react";

import { ProductList } from "./components/ProductList/ProductList";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./api/productApi";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <ProductList />;
};

export default App;
