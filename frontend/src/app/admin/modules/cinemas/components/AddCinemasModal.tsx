import React from "react";
import Modal from "@/layouts/Modal/Modal"; // Import the Modal component
import AddCinemasForm from "./AddCinemasForm/AddCinemasForm";

interface AddCinemasModalProps {
  isOpen: boolean; // Prop to control modal visibility
  onClose: () => void; // Prop for closing the modal
}

const AddCinemasModal: React.FC<AddCinemasModalProps> = ({ isOpen, onClose }) => {
return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['light']}>
      <AddCinemasForm/>
    </Modal>
);
};

export default AddCinemasModal;
