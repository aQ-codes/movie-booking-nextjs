import React from 'react';
import Modal from '@/layouts/Modal/Modal'; // Import the Modal component
import AddBannerForm from './AddBannerForm';

interface AddBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBannerModal: React.FC<AddBannerModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['light']}>
      <AddBannerForm />
    </Modal>
  );
};

export default AddBannerModal;
