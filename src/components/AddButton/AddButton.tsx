import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeAddModal, openAddModal } from "../../store/slices/modalSlice";
import "./AddButton.css";

export const AddButton = () => {
  const dispatch = useDispatch();
  const isAddModalOpen = useSelector(
    (state: RootState) => state.modal.isAddModalOpen,
  );

  const handleAddModal = () => {
    if (isAddModalOpen) {
      dispatch(closeAddModal());
    } else {
      dispatch(openAddModal());
    }
  };

  return (
    <div className={"addButtonContainer"}>
      <button onClick={handleAddModal} className={"addButton"}>
        Add Product
      </button>
    </div>
  );
};

export default AddButton;
