// components/AddMovieModal.tsx
import React from "react";
import Modal from "@/layouts/Modal/Modal"; 
import AddMovie from "./AddMovieForm/AddMovieForm";

interface AddMovieModalProps {
  isOpen: boolean; // Prop to control modal visibility
  onClose: () => void; // Prop for closing the modal
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['light']}>
      <AddMovie/>
    </Modal>
  );
};

export default AddMovieModal;
  