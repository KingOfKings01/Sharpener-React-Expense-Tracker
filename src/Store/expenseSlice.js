import { createSlice } from "@reduxjs/toolkit";

// Helper function to calculate total amount
const calculateTotalAmount = (expenses) => {
  return Object.values(expenses).reduce((total, expense) => total + +(expense.amount), 0);
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { expenses: {}, totalAmount: 0, loading: false, error: null },
  reducers: {
    // Action to manually set the expenses
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      // Calculate and store the total amount based on the expenses
      state.totalAmount = calculateTotalAmount(state.expenses);
    },
  },
});

// Export action to use in components
export const { setExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
