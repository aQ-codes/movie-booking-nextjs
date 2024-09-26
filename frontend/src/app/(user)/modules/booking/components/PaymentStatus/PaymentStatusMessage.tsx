import React from 'react';
import styles from './PaymentStatusMessage.module.css';

interface PaymentStatusMessageProps {
  status: string;
}

const PaymentStatusMessage: React.FC<PaymentStatusMessageProps> = ({ status }) => {
  return (
    <div className={styles.paymentStatus}>
      {status === "failed" && 
          <div>
            <h3>Payment failed. Please try again.</h3>
            <p>Transaction could not be completed in session time.If any money has been debited it will be refunded shortly to the original payment mode </p>
          </div>}
        {status === "success" && 
        <div className={styles.success}>
          <h3>Payment success</h3>
          <p>Transaction has been successfully completed.You will be redirected shortly to next page </p>
        </div>}
    </div>
  );
};

export default PaymentStatusMessage;
