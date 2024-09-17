import React, { useState } from "react";
// custom import
import CinemaForm from "@/admin/modules/cinemas/(components)/CinemasForm/CinemasForm";
import axiosInstance from "@/utils/axiosConfig";

const AddCinemasForm: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: { name: string; location: string }) => {
    try {
      const response = await axiosInstance.post("/cinemas/add", data);

      if (response.status === 201) {
        setSuccessMessage("Cinema added successfully!");
        setErrorMessage(null); // Clear any previous error messages
      }
    } catch (error: any) {
      setErrorMessage("An error occurred while adding the cinema.");
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <CinemaForm
      onSubmit={handleSubmit}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
};

export default AddCinemasForm;
