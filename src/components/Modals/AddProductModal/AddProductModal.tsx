import React, { useState } from "react";
import "./AddProductModal.css";
import { useDispatch } from "react-redux";
import { closeAddModal } from "../../../store/slices/modalSlice";

import { Product } from "../../../types/product";
import { AppDispatch } from "../../../store/store";
import { isValidUrl, validateProduct } from "../../../utils/validation";
import { addProductToServer } from "../../../api/productApi";

export const AddProductModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Partial<Product>>({
    imageUrl: "",
    name: "",
    count: 0,
    size: { width: 0, height: 0 },
    weight: "",
  });

  const handleCloseModal = () => {
    dispatch(closeAddModal());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      if (name.includes("size.")) {
        const sizeKey = name.split(".")[1];
        return {
          ...prevProduct,
          size: {
            ...prevProduct.size,
            [sizeKey]: Number(value),
          },
        } as Partial<Product>;
      }
      return {
        ...prevProduct,
        [name]: name === "count" ? Number(value) : value,
      } as Partial<Product>;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProduct(product)) {
      alert("All fields are required");
      return;
    }
    const productWithWeightInGrams = {
      ...product,
      weight: `${product.weight}g`,
      imageUrl: isValidUrl(product.imageUrl)
        ? product.imageUrl
        : "https://via.placeholder.com/150",
    };
    dispatch(addProductToServer(productWithWeightInGrams as Product));
    handleCloseModal();
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="modalCloseButton" onClick={handleCloseModal}>
          X
        </button>
        <h2>Add Product</h2>
        <form className="modalForm" onSubmit={handleSubmit}>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              value={product.imageUrl}
              onChange={handleChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Count:
            <input
              type="number"
              name="count"
              placeholder="Enter count"
              value={product.count}
              onChange={handleChange}
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              name="size.width"
              placeholder="Enter width"
              value={product.size?.width}
              onChange={handleChange}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="size.height"
              placeholder="Enter height"
              value={product.size?.height}
              onChange={handleChange}
            />
          </label>
          <label>
            Weight:
            <input
              type="text"
              name="weight"
              placeholder="Enter weight"
              value={product.weight}
              onChange={handleChange}
            />
          </label>
          <div className="modalButtons">
            <button type="submit">Add Product</button>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
