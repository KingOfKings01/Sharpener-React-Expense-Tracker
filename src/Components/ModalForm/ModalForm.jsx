import PropTypes from 'prop-types'
import styles from './modalForm.module.css';

export default function ModalForm({ expense, setIsModalOpen }) {

  const handleSubmit = (e) => {
    e.preventDefault();


    setIsModalOpen(false);
  };

  return (
    <div className={styles.background}>
      <form onSubmit={handleSubmit} className={styles.modal}>

        <h2>Update Expense</h2>

        <label htmlFor="studentName">
          Amount:
          &nbsp;&nbsp;
          <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                />
        </label>

        <label htmlFor="mentorId">
          Choose Mentor:
          &nbsp;&nbsp;
          <select id="mentorId" name="mentorId" required>
            {monitors.map((monitor) => (
              <option key={monitor.id} value={monitor.id}>
                {monitor.name}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.actions}>
          <button className={styles.submit} type="submit">Submit</button>
          <button className={styles.cancel} type="button" onClick={()=>setIsModalOpen(false)}>Cancel</button>
        </div>

      </form>

    </div>
  );
}

ModalForm.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired
}