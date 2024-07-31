import React, { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./ProductList.css";
import AddProductModal from "../Modals/AddProductModal/AddProductModal";
import Dropdown from "../Dropdown/Dropdown";
import { Product } from "../../types/product";
import { openUpdateModal } from "../../store/slices/modalSlice";
import UpdateProductModal from "../Modals/UpdateProductModal/UpdateProductModal";
import { setSelectedProduct } from "../../store/slices/productSlice";

export const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const isAddModalOpen = useSelector(
    (state: RootState) => state.modal.isAddModalOpen,
  );
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortCriteria, setSortCriteria] = useState("alphabet");
  const isUpdateModalOpen = useSelector(
    (state: RootState) => state.modal.isUpdateModalOpen,
  );
  useEffect(() => {
    let sortedArray = [...products];
    if (sortCriteria === "alphabet") {
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "count") {
      sortedArray.sort((a, b) => b.count - a.count); // Sort by count in descending order
    }
    setSortedProducts(sortedArray);
  }, [products, sortCriteria]);

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleProductClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
    dispatch(openUpdateModal());
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="controlsContainer">
        <AddButton />
        <Dropdown onChange={handleSortChange} />
      </div>
      <div className={"productList"}>
        {sortedProducts.map((product: Product) => (
          <div
            key={product.id}
            className="productCard"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="productImage"
            />
            <div className="productDetails">
              <h2 className="productName">{product.name}</h2>
              <p className="productCount">Count: {product.count}</p>
              <p className="productSizeWidth">Width: {product.size.width}</p>
              <p className="productSizeHeight">Height: {product.size.height}</p>
              <p className="productWeight">Weight: {product.weight}</p>
            </div>
          </div>
        ))}
      </div>
      {isAddModalOpen && <AddProductModal />}
      {isUpdateModalOpen && <UpdateProductModal />}
    </div>
  );
};
