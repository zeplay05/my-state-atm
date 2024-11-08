import React, { useState } from 'react';
import './app.css'; // นำเข้าไฟล์ CSS ที่สร้างขึ้น

function WithdrawalApp() {
  const [balance, setBalance] = useState(10000);  // ยอดเงินเริ่มต้น
  const [withdrawAmount, setWithdrawAmount] = useState('');  // จำนวนเงินที่ผู้ใช้ต้องการถอน
  const [withdrawHistory, setWithdrawHistory] = useState([]);  // ประวัติการถอนเงิน
  const [alertMessage, setAlertMessage] = useState('');  // ข้อความแจ้งเตือน

  // ฟังก์ชันสำหรับการถอนเงิน
  const handleWithdraw = (amount) => {
    if (amount > balance) {
      setAlertMessage('ยอดเงินในบัญชีไม่เพียงพอสำหรับการถอน'); // แจ้งเตือนเมื่อยอดเงินไม่พอ
    } else if (amount < 1) {
      setAlertMessage('จำนวนเงินต้องมากกว่าหรือเท่ากับ 1 บาท'); // แจ้งเตือนเมื่อจำนวนเงินน้อยกว่า 1
    } else {
      setBalance(balance - amount);
      setWithdrawHistory([...withdrawHistory, amount]);
      setAlertMessage(`ถอนเงิน ${amount} บาท สำเร็จ`); // แจ้งเตือนเมื่อถอนเงินสำเร็จ
    }
  };

  // ฟังก์ชันสำหรับการถอนเงินตามจำนวนที่ผู้ใช้กรอกเอง
  const handleCustomWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setAlertMessage('กรุณาใส่จำนวนเงินที่ถูกต้อง'); // แจ้งเตือนเมื่อกรอกจำนวนเงินไม่ถูกต้อง
    } else {
      handleWithdraw(amount);
      setWithdrawAmount(''); // รีเซ็ตช่องกรอกจำนวนเงินหลังจากการถอน
    }
  };

  return (
    <div className="app-container">
      <h2 className="app-header">ระบบถอนเงิน</h2>
      <p className="balance">ยอดเงินคงเหลือ: {balance} บาท</p>

      {/* แสดง Alert หากมีข้อความแจ้งเตือน */}
      {alertMessage && (
        <div className="alert">
          {alertMessage}
        </div>
      )}

      <div className="button-container">
        {[100, 500, 1000, 5000].map((amount) => (
          <button
            key={amount}
            className="withdraw-button"
            onClick={() => handleWithdraw(amount)}
          >
            ถอน {amount} บาท
          </button>
        ))}
      </div>

      <div className="custom-withdraw">
        <input
          type="number"
          placeholder="จำนวนเงินที่ต้องการถอน"
          value={withdrawAmount}
          min="1"
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="input-amount"
        />
        <button
          className="custom-withdraw-button"
          onClick={handleCustomWithdraw}
        >
          ถอนเงิน
        </button>
      </div>

      <h3 className="app-header">ประวัติการถอนเงิน</h3>
      <ul className="withdraw-history">
        {withdrawHistory.length === 0 ? (
          <p className="withdraw-history-empty">ยังไม่มีการทำรายการ</p>
        ) : (
          withdrawHistory.map((amount, index) => (
            <li key={index} className="withdraw-history-item">
              ถอน {amount} บาท
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default WithdrawalApp;
