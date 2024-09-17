import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axiosConfig"; 
import Table from "@/components/ui/Table/Table";
import Button from "@/components/ui/Button";

// Define the Movie interface
interface Movie {
  _id: string;
  title: string;
  status: string;
  runningTime: number;
}

const ListMoviesTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movies/all");
        setMovies(response.data);
      } catch (error) {
        setError("Error fetching movies. Please try again later.");
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleView = (movie: Movie) => {
    console.log("View movie with ID:", movie._id);
    // Implement view logic here
  };

  const handleDelete = async (movie: Movie) => {
    try {
      await axios.delete(`/api/movies/${movie._id}`); // Adjust the endpoint as needed
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
    { header: "Running Time", accessor: "runningTime" as keyof Movie },
    {
      header: "Actions",
      accessor: "actions" as keyof Movie,
      renderCell: (movie: Movie) => (
        <div>
          <Button
                            type='button'
                            title='View Movie'
                            label='View'
                            variant={['btn']}
                            onClick={() => handleView(movie)}  
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Movies List</h1>
      {error && <div className="error">{error}</div>} {/* Display error message if any */}
      <Table columns={columns} data={movies} /> {/* Removed onView and onDelete props */}
    </div>
  );
};

export default ListMoviesTable;
