import React, { useState } from "react";
import { searchMovies } from "@/app/admin/axiosRequests/searchMovies";
import { Movie } from "@/models/models";
import styles from "./ShowForm.module.css";

interface Section {
  _id: string;
  sectionName: string;
}

interface ShowFormProps {
  screenId: string;
  sections: Section[];
  onSubmit: (data: {
    movieId: string;
    screenId: string;
    date: string;
    time: string;
    status: string;
    language: string;
    prices: { sectionId: string; price: number }[];
  }) => void;
}

const ShowForm: React.FC<ShowFormProps> = ({ screenId, sections, onSubmit }) => {
  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("active");
  const [language, setLanguage] = useState("");
  const [prices, setPrices] = useState<{ sectionId: string; price: number }[]>(
    sections.map((section) => ({ sectionId: section._id, price: 0 }))
  );

  const handleMovieSearch = async () => {
    try {
      const results = await searchMovies(movieSearchTerm);
      setMovieResults(results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  const handlePriceChange = (sectionId: string, value: number) => {
    setPrices((prevPrices) =>
      prevPrices.map((price) =>
        price.sectionId === sectionId ? { ...price, price: value } : price
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovieId) {
      alert("Please select a movie.");
      return;
    }
    onSubmit({
      movieId: selectedMovieId,
      screenId,
      date,
      time,
      status,
      language,
      prices,
    });
  };

  console.log(time);
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add Show</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.movieSearch}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search for a movie"
            value={movieSearchTerm}
            onChange={(e) => setMovieSearchTerm(e.target.value)}
          />
          <button
            className={styles.searchButton}
            type="button"
            onClick={handleMovieSearch}
          >
            Search
          </button>
        </div>

        {movieResults.length > 0 && (
          <select
            className={styles.input}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            required
          >
            <option value="">Select a movie</option>
            {movieResults.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        )}

        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <select
          className={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
          <option value="completed">Completed</option>
        </select>
        <input
          className={styles.input}
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        />

        {sections.map((section) => (
          <div className={styles.sectionRow} key={section._id}>
            <input
              className={styles.sectionInput}
              type="text"
              value={section.sectionName}
              readOnly
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Price"
              value={
                prices.find((price) => price.sectionId === section._id)?.price || 0
              }
              onChange={(e) => handlePriceChange(section._id, Number(e.target.value))}
              required
            />
          </div>
        ))}

        <button className={styles.submitButton} type="submit">
          Add Show
        </button>
      </form>
    </div>
  );
};

export default ShowForm;
