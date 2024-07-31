import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import commentsReducer from "./slices/commentSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
    modal: modalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
