import { useEffect, useState } from 'react';
import classes from "./home.module.css";
import { addExpense, deleteExpense, getAllExpenses, updateExpense } from '../../Firebase/expenseFun';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses } from '../../Store/expenseSlice';
// import { setExpenses } from './store/expenseSlice';

export default function Home() {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: ''
  });

  const dispatch = useDispatch();
  const { expenses, totalAmount } = useSelector((state) => state.expenses);


  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []); // Run fetchExpenses only once on mount

  async function fetchExpenses() {
    setIsLoading(true);
    try {
      const expenses = await getAllExpenses();
      dispatch(setExpenses(Object.values(expenses)));

      setExpenseList(Object.values(expenses)); // Ensure expenses are set correctly
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateExpense(formData.id, formData);

        const updatedExpenses = expenseList.map(expense => {
          if (expense.id === formData.id) {
            return {...expense,...formData };
          }
          return expense;
        })

        setExpenseList(updatedExpenses);
        setIsEditing(false);
      } else {
        const id = await addExpense(formData);
        setExpenseList([...expenseList, { ...formData, id }]);
      }
      setFormData({ amount: '', category: 'Food', description: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = async (expense) => {
    setIsEditing(true);
    setFormData(expense);
  }

  const handleCancelEditing = async () => {
    setIsEditing(false);
    setFormData({ amount: '', category: 'Food', description: '' });
  }

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);

      const updatedExpenses = expenseList.filter(expense => expense.id!== expenseId);
      setExpenseList(updatedExpenses);
    
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <section className={classes.container}>
      <section>
        <form className={classes.formController} id="expenseForm" onSubmit={handleSubmit}>
          <div className="inputs">
            <div className={classes.row}>
              <div className={classes.inputController}>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.inputController}>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Food">Food</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
            </div>
          </div>
          <div className={classes.inputController}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={classes.buttonGroup}>
            <button type="submit" className={classes.submit}>{isEditing ? "Update" : "Submit"} </button>
            {isEditing && <button type='button' className={classes.cancel} onClick={handleCancelEditing}>Cancel</button>}
          </div>
        </form>
      </section>
      <section>

        {isLoading && <p>Please wait...</p>}

        {expenseList.length > 0 && (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>
                    <div className={classes.buttonGroup}>
                      <button className={classes.edit} onClick={() => handleUpdate(expense)}>Edit</button>
                      <button className={classes.delete} onClick={() => handleDelete(expense.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalAmount}
      </section>
    </section>
  );
}
