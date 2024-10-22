import { useEffect, useState } from 'react';
import classes from "./home.module.css";
import { addExpense, getAllExpenses } from '../../Firebase/expenseFun';

export default function Home() {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: ''
  });

  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []); // Run fetchExpenses only once on mount

  async function fetchExpenses() {
    setIsLoading(true);
    try {
      const expenses = await getAllExpenses();
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
      const id = await addExpense(formData);
      setExpenseList([...expenseList, { ...formData, id }]);
      setFormData({ amount: '', category: 'Food', description: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

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
          <button type="submit" className={classes.submit}>Submit</button>
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
              </tr>
            </thead>
            <tbody>
              {expenseList.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}
