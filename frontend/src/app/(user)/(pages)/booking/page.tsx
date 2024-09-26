"use client"

import React, { useState } from 'react';
import BookingInfoCard from '../../modules/booking/components/BookingInfoCard/BookingInfoCard';
import PaymentSection from '../../modules/booking/components/PaymentSection/PaymentSection';
import PaymentStatusMessage from '../../modules/booking/components/PaymentStatus/PaymentStatusMessage';
import styles from './page.module.css';

const Page = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<string>(""); // State to manage payment status
  console.log(paymentStatus)
  return (
    <div className={styles.container}>
      <BookingInfoCard setTotalPrice={setTotalPrice} />
      <div className={styles.payment}>
        <PaymentSection totalPrice={totalPrice} setPaymentStatus={setPaymentStatus} />
        <PaymentStatusMessage status={paymentStatus} /> {/* Conditionally render payment status message */}
      </div>

    </div>
  );
};

export default Page;
