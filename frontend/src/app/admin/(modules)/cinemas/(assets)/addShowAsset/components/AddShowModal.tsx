import React, { useState } from "react";
import Modal from "@/layouts/Modal/Modal"; // Reuse the modal component
import ShowForm from "./AddShowForm/AddShowForm"; // Updated import path
import axiosInstance from "@/utils/axiosConfig";

interface AddShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenId: string;
  sections: { _id: string; sectionName: string }[];
}

const AddShowModal: React.FC<AddShowModalProps> = ({ isOpen, onClose, screenId, sections }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (showData: any) => {
    try {
      console.log(showData)
      const response = await axiosInstance.post("/shows/add", showData);
      if (response.status === 201) {
        setSuccessMessage("Show added successfully!");
        setErrorMessage(null); // Clear any previous error messages
      }
    } catch (error: any) {
      setErrorMessage("An error occurred while adding the show.");
      setSuccessMessage(null); // Clear any previous success messages
      console.error("Error adding show:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['light']}>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <ShowForm screenId={screenId} sections={sections} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default AddShowModal;
