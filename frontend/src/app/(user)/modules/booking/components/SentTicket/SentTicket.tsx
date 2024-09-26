"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendTicketDetails } from "../../services/sendTicketDetails";
import styles from "./SendTicket.module.css";

interface Seat {
  seatName: string;
  sectionName: string;
}

const SendTicket = () => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State for success message
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate WhatsApp number (basic validation for example purposes)
    if (!/^\+\d{10,15}$/.test(whatsappNumber)) {
      setError("Please enter a valid WhatsApp number with country code.");
      return;
    }

    try {
      // Get booking details from sessionStorage
      const bookingData = sessionStorage.getItem("bookingInfo");
      const confirmedData = sessionStorage.getItem("bookingInfoconfirmed");
      
      if (!bookingData || !confirmedData) {
        setError("No booking details found.");
        return;
      }

      const booking = JSON.parse(bookingData);
      const confirmedBooking = JSON.parse(confirmedData);


      // Extract seats with explicit type
      const selectedSeats: Seat[] = booking.seats.map((seat: any) => ({
        seatName: seat.seatName,
        sectionName: seat.sectionName,
      }));

      // Prepare the message including bookingId
      const bookingDetails = {
        to: whatsappNumber, // WhatsApp number to send the message
        message: `🎉 Hi there! 🎉\n\nYour Viewbliss Ticket\n\n` +
                 `🆔 Booking ID: ${confirmedBooking.bookingId}\n` + // Include Booking ID here
                 `🎬 Movie Title: ${booking.movieTitle}\n` +
                 `🎟️ Screen Number: ${booking.screenNumber}\n` +
                 `📽️ Screen Type: ${booking.screenType}\n` +
                 `🎞️ Cinema: ${booking.cinemaName}\n` +
                 `📍 Location: ${booking.cinemaLocation}\n` +
                 `📅 Date: ${booking.formattedDate}\n` +
                 `🕒 Time: ${booking.formattedTime}\n` +
                 `🌐 Language: ${booking.language}\n` +
                 `💰 Total Price: ₹${booking.totalPrice.toFixed(2)}\n\n` +
                 `🪑 Seats:\n` +
                 selectedSeats.map(seat => `  - ${seat.seatName} (${seat.sectionName})`).join('\n') +
                 `\n\nGrab your popcorn and enjoy the movie! 🍿🎥`
      };

      const response = await sendTicketDetails(bookingDetails);

      if (response.success) { // Check for success response
        setSuccess("Ticket has been sent to your WhatsApp!");
        setError(""); // Clear error message if any
        setTimeout(() => {
          router.push("/"); // Redirect to homepage after 3 seconds
        }, 3000);
      } else {
        setError("Failed to send ticket. Please try again.");
        setSuccess(""); // Clear success message if any
      }
    } catch (error) {
      console.error("Error sending ticket:", error);
      setError("An error occurred. Please try again.");
      setSuccess(""); // Clear success message if any
    }
  };

  return (
    <div className={styles.sendTicket}>
      <h1>Congratulations! Your movie booking was successful!</h1>
      <h2>Ticket Details have been generated. You can receive the ticket through WhatsApp.</h2>
      <div className={styles.container}>
        <h3>Enter Your WhatsApp Phone Number</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone Number with country code (+91)"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>} {/* Display success message */}
          <button type="submit">Send Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default SendTicket;
