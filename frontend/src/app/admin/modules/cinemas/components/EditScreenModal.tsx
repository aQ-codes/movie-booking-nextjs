import React from "react";
import Modal from "@/layouts/Modal/Modal";
import EditScreenForm from "./EditScreenForm";

interface EditScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenId: string;
  cinemasId: string;
}

const EditScreenModal: React.FC<EditScreenModalProps> = ({ isOpen, onClose, screenId, cinemasId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['light']}>
      <EditScreenForm screenId={screenId} cinemasId={cinemasId} onClose={onClose} />
    </Modal>
  );
};

export default EditScreenModal;
