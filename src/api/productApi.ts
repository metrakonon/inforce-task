import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types/product";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "http://localhost:5000/products",
    );
    return response.data;
  },
);

export const addProductToServer = createAsyncThunk(
  "products/addProductToServer",
  async (product: Product) => {
    const response = await axios.post<Product>(
      "http://localhost:5000/products",
      product,
    );
    return response.data;
  },
);

export const deleteProductFromServer = createAsyncThunk(
  "products/deleteProductFromServer",
  async (productId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      return productId; // Return the productId to remove it from the state
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

export const updateProductOnServer = createAsyncThunk(
  "products/updateProductOnServer",
  async (product: Product) => {
    const response = await axios.put<Product>(
      `http://localhost:5000/products/${product.id}`,
      product,
    );
    return response.data;
  },
);
