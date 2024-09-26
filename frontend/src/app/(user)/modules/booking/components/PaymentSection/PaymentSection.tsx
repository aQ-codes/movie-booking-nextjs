import React, { useState } from "react";
import styles from "./PaymentSection.module.css";
import { createOrder, initializeRazorpay, verifyPayment, RazorpayResponse } from "@/services/payment/razorpay";
import { createBooking } from "../../services/bookingService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { generateBookingId } from "../../helpers/helpers";
import { useRouter } from "next/navigation"; // Import router for redirection

interface PaymentSectionProps {
  totalPrice: number; // Accept totalPrice as a prop
  setPaymentStatus: (status: string) => void; // Add a prop to handle payment status
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ totalPrice, setPaymentStatus }) => {
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state: RootState) => state.user); // Get the user from Redux
  const router = useRouter(); // Initialize router for redirection

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handlePayment = async () => {
    try {
      // Step 1: Create an order via the service
      const order = await createOrder(totalPrice, "INR");

      // Step 2: Initialize Razorpay with the order and handle the success callback
      initializeRazorpay(order, async (response: RazorpayResponse) => {
        try {
          // Step 3: Verify payment via the service
          const verificationResponse = await verifyPayment(response);

          if (verificationResponse.message === "Payment verified successfully") {

            // Step 4: After successful payment, create a booking in the backend
            const bookingId = generateBookingId(); 

            // Assuming 'bookingInfo' is stored in session storage (same as in BookingInfoCard)
            const storedData = sessionStorage.getItem("booking");
            if (storedData) {
              const bookingInfo = JSON.parse(storedData);

            // Prepare the data to send to the backend
            const bookingDetails = {
              show: bookingInfo.showDetails._id,  // Show ID from booking info
              customer: user.userId,                  // User ID from Redux
              seats: Object.values(bookingInfo.selectedSeats).map((seat: any) => seat.seatName), // Seats from booking info
              amount: totalPrice,                     // Total price
              bookingId,                              // Generated booking ID
            };

              sessionStorage.setItem('bookingInfoconfirmed', JSON.stringify(bookingDetails));



              // Send booking details to the backend
              const bookingResponse = await createBooking(bookingDetails);
              // console.log(bookingResponse.booking.bookingStatus)

              if (bookingResponse.booking.bookingStatus === 'confirmed') {
                setPaymentStatus("success");

                // Redirect to WhatsApp page to enter the number
                setTimeout(() => {
                  router.push("/booking/success"); // Redirect to homepage after 3 seconds
                }, 3000)
              } else {
            console.log("from the razorpay , failed")
                setPaymentStatus("failed");
                alert("Booking creation failed");
              }
            }
          } else {
            console.log("from the razorpay , failed")
            setPaymentStatus("failed"); // Set status as failed
            alert("Payment verification failed");
            router.push("/booking"); // Redirect to the booking page
          }
        } catch (error) {
          console.log("from the razorpay , failed")
          setPaymentStatus("failed");
          const errorMessage = (error as Error).message || "Payment verification error";
          alert(errorMessage);
          router.push("/booking"); // Redirect to the booking page on error
        }
      });
    } catch (error) {
      console.log("from the razorpay , failed")
      const errorMessage = (error as Error).message || "Error during payment process, please try again.";
      console.error("Error during payment process:", error);
      setPaymentStatus("failed");
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.paymentSection}>
      <h3>Choose Your Payment Options</h3>
      <label>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span>Razorpay</span>
      </label>
      <button
        className={styles.continueButton}
        disabled={!isChecked}
        onClick={handlePayment} // Trigger the Razorpay payment process
      >
        Continue
      </button>
    </div>
  );
};

export default PaymentSection;
