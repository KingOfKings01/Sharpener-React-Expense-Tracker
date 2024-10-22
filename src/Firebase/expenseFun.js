import { child, get, getDatabase, ref, remove, set, update } from "firebase/database";
import firebaseApp from "./initialize";

const database = getDatabase(firebaseApp);

export const addExpense = async (expense) => {

    const expenseId = Date.now();
    
    try {
        await set(ref(database, 'expenses/' + expenseId), {
          ...expense,
          id: expenseId
        });
        return expenseId;
    } catch (err) {
        console.error("Error adding expense: ", err);
        throw err.message;
    }
  };

  export const getAllExpenses = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'expenses'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error getting expenses: ", err);
      throw err.message;
    }
  };

  export const updateExpense = async (expenseId, updatedExpense) => {
    try {
      const updates = {};
      updates['/expenses/' + expenseId] = updatedExpense;
      await update(ref(database), updates);
      return updatedExpense;
    } catch (err) {
      console.error("Error updating expense: ", err);
      throw err.message;
    }
  };

  export const deleteExpense = async (expenseId) => {
    try {
      await remove(ref(database, 'expenses/' + expenseId));  
    } catch (err) {
      console.error("Error deleting expense: ", err);
      throw err.message;
    }
  };