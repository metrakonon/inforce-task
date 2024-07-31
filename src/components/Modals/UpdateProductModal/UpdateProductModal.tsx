import React, { useState, useEffect } from "react";
import "./UpdateProductModal.css";
import { useDispatch, useSelector } from "react-redux";
import { closeUpdateModal } from "../../../store/slices/modalSlice";
import { clearSelectedProduct } from "../../../store/slices/productSlice";
import { Product } from "../../../types/product";
import { AppDispatch, RootState } from "../../../store/store";
import { isValidUrl, validateProduct } from "../../../utils/validation";
import {
  deleteProductFromServer,
  updateProductOnServer,
} from "../../../api/productApi";

export const UpdateProductModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct,
  );
  const [productState, setProductState] = useState<Partial<Product>>({});

  useEffect(() => {
    if (product) {
      setProductState(product);
    }
  }, [product]);

  const handleCloseModal = () => {
    dispatch(closeUpdateModal());
    dispatch(clearSelectedProduct());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductState((prevProduct) => {
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

    if (!validateProduct(productState)) {
      alert("All fields are required");
      return;
    }

    const productWithWeightInGrams = {
      ...productState,
      weight: productState.weight,
      imageUrl: isValidUrl(productState.imageUrl || "")
        ? productState.imageUrl
        : "https://via.placeholder.com/150",
    };

    dispatch(updateProductOnServer(productWithWeightInGrams as Product));
    handleCloseModal();
  };

  const handleDelete = () => {
    if (productState.id) {
      dispatch(deleteProductFromServer(productState.id));
      handleCloseModal();
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="modalCloseButton" onClick={handleCloseModal}>
          X
        </button>
        <h2>Edit Product</h2>
        <form className="modalForm" onSubmit={handleSubmit}>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              value={productState.imageUrl || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productState.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Count:
            <input
              type="number"
              name="count"
              placeholder="Enter count"
              value={productState.count || 0}
              onChange={handleChange}
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              name="size.width"
              placeholder="Enter width"
              value={productState.size?.width || 0}
              onChange={handleChange}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="size.height"
              placeholder="Enter height"
              value={productState.size?.height || 0}
              onChange={handleChange}
            />
          </label>
          <label>
            Weight:
            <input
              type="text"
              name="weight"
              placeholder="Enter weight"
              value={productState.weight || ""}
              onChange={handleChange}
            />
          </label>
          <div className="modalButtons">
            <button type="submit">Update Product</button>
            <button type="button" onClick={handleDelete}>
              Delete Product
            </button>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
