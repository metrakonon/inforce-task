import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isAddModalOpen: boolean;
  isUpdateModalOpen: boolean;
}

const initialState: ModalState = {
  isAddModalOpen: false,
  isUpdateModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddModal(state) {
      state.isAddModalOpen = false;
    },
    openUpdateModal(state) {
      state.isUpdateModalOpen = true;
    },
    closeUpdateModal(state) {
      state.isUpdateModalOpen = false;
    },
  },
});

export const {
  openAddModal,
  closeAddModal,
  openUpdateModal,
  closeUpdateModal,
} = modalSlice.actions;
export default modalSlice.reducer;
