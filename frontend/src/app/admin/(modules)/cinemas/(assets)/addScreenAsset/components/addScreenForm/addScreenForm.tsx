import React, { useState } from "react";
import ScreenForm from "../../../../(components)/ScreenForm/ScreenForm";
import axiosInstance from "@/utils/axiosConfig";

interface AddScreenFormProps {
  cinemasId: string; // Receive cinemas ID as a prop
}

const AddScreenForm: React.FC<AddScreenFormProps> = ({ cinemasId }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: {
    screenNumber: number;
    screenType: string;
    sections: { sectionNumber: number; sectionName: string }[];
    seatArrangement: string;
  }) => {
    try {
      // Include cinemasId in the submission data
      const response = await axiosInstance.post("/cinemas/screens/add", {
        ...data,
        cinemas: cinemasId,
      });
      if (response.status === 201) {
        setSuccessMessage("Screen added successfully!");
        setErrorMessage(null); // Clear any previous error messages
      }
    } catch (error: any) {
      setErrorMessage("An error occurred while adding the screen.");
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <ScreenForm
      onSubmit={handleSubmit}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
};

export default AddScreenForm;
