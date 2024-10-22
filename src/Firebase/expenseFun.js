import { child, get, getDatabase, ref, set } from "firebase/database";
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
        console.log("No expenses found");
        return [];
      }
    } catch (err) {
      console.error("Error getting expenses: ", err);
      throw err.message;
    }
  };