import React, { useState } from 'react';

function WithdrawalApp() {
  const [balance, setBalance] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawHistory, setWithdrawHistory] = useState([]);

  const handleWithdraw = (amount) => {
    if (amount > balance) {
      alert('ไม่สามารถถอนเงินได้เกินจำนวนเงินที่อยู่ในบัญชี');
    } else if (amount < 1) {
      alert('ไม่สามารถถอนเงินต่ำกว่า 1 บาท');
    } else {
      setBalance(balance - amount);
      setWithdrawHistory([...withdrawHistory, amount]);
    }
  };

  const handleCustomWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (!isNaN(amount)) {
      handleWithdraw(amount);
      setWithdrawAmount('');
    } else {
      alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>ระบบถอนเงิน</h2>
      <div style={styles.balanceContainer}>
        <p style={styles.balance}>ยอดเงินคงเหลือ: {balance} บาท</p>
        <button style={styles.button} onClick={() => handleWithdraw(100)}>ถอน 100 บาท</button>
        <button style={styles.button} onClick={() => handleWithdraw(500)}>ถอน 500 บาท</button>
        <button style={styles.button} onClick={() => handleWithdraw(1000)}>ถอน 1,000 บาท</button>
        <button style={styles.button} onClick={() => handleWithdraw(5000)}>ถอน 5,000 บาท</button>
        <div style={styles.customWithdrawContainer}>
          <input
            style={styles.input}
            type="number"
            placeholder="จำนวนเงินที่ต้องการถอน"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button style={styles.customButton} onClick={handleCustomWithdraw}>ถอนเงิน</button>
        </div>
      </div>

      <h3 style={styles.historyHeader}>ประวัติการถอนเงิน</h3>
      <ul style={styles.historyList}>
        {withdrawHistory.map((amount, index) => (
          <li key={index} style={styles.historyItem}>ถอน {amount} บาท</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  balanceContainer: {
    marginBottom: '20px',
  },
  balance: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#4CAF50',
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  customWithdrawContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  customButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  historyHeader: {
    marginTop: '20px',
    color: '#333',
  },
  historyList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  historyItem: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
  },
};

export default WithdrawalApp;