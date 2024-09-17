import React, { useState } from "react";
import styles from "./AddMovieForm.module.css"; 
// custom import 
import axiosInstance from "@/utils/axiosConfig"; 

const AddMovieForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [cast, setCast] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [poster, setPoster] = useState("");
  const [status, setStatus] = useState("active");
  const [genres, setGenres] = useState(""); // New state for genres input
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post("/movies/add", {
        title,
        cast: cast.split(",").map((member) => member.trim()), // Split and trim cast members
        synopsis,
        runningTime: parseInt(runningTime), // Convert running time to integer
        poster,
        status,
        genres: genres.split(",").map((genre) => genre.trim()), // Split and trim genres
      });

      if (response.status === 201) {
        setSuccessMessage("Movie added successfully!"); // Show success message
        // Reset the form fields after successful submission
        setTitle("");
        setCast("");
        setSynopsis("");
        setRunningTime("");
        setPoster("");
        setStatus("active");
        setGenres(""); // Reset genres field
      }
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors.map((err: any) => err.msg).join(", ")); // Show validation errors
      } else {
        setError("An error occurred while adding the movie. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Add a New Movie</h1>
      {error && <div className={styles.errorMessage}>{error}</div>} {/* Display errors */}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>} {/* Display success message */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Cast (comma-separated)"
          value={cast}
          onChange={(e) => setCast(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          className={styles.textarea}
          required
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Running Time (in minutes)"
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          className={styles.input}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
