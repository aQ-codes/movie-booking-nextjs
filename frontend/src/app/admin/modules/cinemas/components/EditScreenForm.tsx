import React, { useState, useEffect } from "react";
import ScreenForm from "./ScreenForm/ScreenForm";
import { axiosInstance } from "@/config/axiosConfig";


interface EditScreenFormProps {
  screenId: string;
  cinemasId: string;
  onClose: () => void;
}

const EditScreenForm: React.FC<EditScreenFormProps> = ({ screenId, cinemasId, onClose }) => {
  const [screenData, setScreenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenData = async () => {
      try {
        const response = await axiosInstance.get(`/cinemas/screens/${screenId}`);
        setScreenData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching screen data.");
        setLoading(false);
      }
    };

    fetchScreenData();
  }, [screenId]);

  const handleSubmit = async (data: {
    screenNumber: number;
    screenType: string;
    sections: { sectionNumber: number; sectionName: string }[];
    seatArrangement: string;
  }) => {
    try {
      await axiosInstance.put(`/cinemas/screens/edit/${screenId}`, {
        ...data,
        cinemas: cinemasId,
      });
      setSuccessMessage("Screen updated successfully!");
      setError(null);
    } catch (error: any) {
      setError("An error occurred while updating the screen.");
      setSuccessMessage(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ScreenForm
      initialData={screenData}
      onSubmit={handleSubmit}
      successMessage={successMessage}
      errorMessage={error}
    />
  );
};

export default EditScreenForm;
