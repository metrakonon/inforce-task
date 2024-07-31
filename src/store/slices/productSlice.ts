import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import {
  fetchProducts,
  addProductToServer,
  deleteProductFromServer,
  updateProductOnServer,
} from "../../api/productApi";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Partial<Product> | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Partial<Product> | null>) {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(
        addProductToServer.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        },
      )
      .addCase(
        deleteProductFromServer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload,
          );
          window.location.reload(); // Refresh the page after deletion
        },
      )
      .addCase(
        updateProductOnServer.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id,
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        },
      );
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
