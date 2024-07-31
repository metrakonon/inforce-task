import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../types/product";

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    removeComment(state, action: PayloadAction<number>) {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
});

export const { addComment, removeComment } = commentSlice.actions;
export default commentSlice.reducer;
