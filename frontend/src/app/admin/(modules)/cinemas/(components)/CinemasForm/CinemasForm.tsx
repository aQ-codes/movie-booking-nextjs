import React, { useState, useEffect } from "react";
import styles from "./CinemasForm.module.css"; // Import the CSS module

interface CinemaFormProps {
  initialData?: {
    name?: string;
    location?: string;
  };
  onSubmit: (data: { name: string; location: string }) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
}

const CinemaForm: React.FC<CinemaFormProps> = ({
  initialData = { name: "", location: "" },
  onSubmit,
  successMessage,
  errorMessage
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitted(true); // Set form as submitted
    onSubmit({ name, location });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>
        {initialData.name ? "Edit Cinema" : "Add a New Cinema"}
      </h1>
      {/* Only show error message if form has been submitted */}
      {isSubmitted && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      {isSubmitted && successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Cinema Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submitButton}>
          {initialData.name ? "Update Cinema" : "Add Cinema"}
        </button>
      </form>
    </div>
  );
};

export default CinemaForm;
