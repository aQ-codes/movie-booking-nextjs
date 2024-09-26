"use client"
import React, { useEffect, useState } from "react";
import { fetchMovies, deleteMovie } from "@/admin/modules/movies/services/movieService"; 
import Table from "@/components/ui/Table/Table";
import Button from "@/components/ui/Button";
import { Movie, MovieWithId } from "@/models/models";


const ListMoviesTable: React.FC = () => {
  const [movies, setMovies] = useState<MovieWithId[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies(); // Use the service to fetch movies
        setMovies(moviesData);
      } catch (error) {
        setError("Error fetching movies. Please try again later.");
        console.error("Error fetching movies:", error);
      }
    };

    loadMovies();
  }, []);

  const handleView = (movie: Movie) => {
    console.log("View movie with ID:", movie._id);
  };

  const handleDelete = async (movie: MovieWithId) => {
    try {
      await deleteMovie(movie._id); 
      setMovies((prevMovies) => prevMovies.filter((m) => m._id !== movie._id));
    } catch (error) {
      setError("Error deleting movie. Please try again later.");
      console.error("Error deleting movie:", error);
    }
  };

  // Define the columns configuration for the Table
  const columns = [
    { header: "Title", accessor: "title" as keyof Movie },
    { header: "Status", accessor: "status" as keyof Movie },
    { header: "Running Time (mins)", accessor: "runningTime" as keyof Movie },
    {
      header: "Actions",
      accessor: "actions" as keyof Movie,
      renderCell: (movie: MovieWithId) => (
        <div>
          <Button
            type="button"
            title="View Movie"
            label="View"
            variant={["btn dark"]}
            onClick={() => handleView(movie)}
          />
          {/* <Button
            type="button"
            title="Delete Movie"
            label="Delete"
            variant={["btn-danger"]}
            onClick={() => handleDelete(movie)}
          /> */}
        </div>
      ),
    },
  ];

  return (
<div>
  {error && <div className="error">{error}</div>} {/* Display error message if any */}
  <Table columns={columns} data={movies} /> {/* Removed onView and onDelete props */}
</div>
  );
};

export default ListMoviesTable;
