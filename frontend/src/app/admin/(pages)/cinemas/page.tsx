'use client'; 

import React, { useState } from 'react';
// custom imports 
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading/Heading';
import AddCinemasModal from '../../modules/cinemas/components/AddCinemasModal';
import ListCinemasTable from '../../modules/cinemas/components/listCinemasTable';



const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Heading heading="All Cinemas" />
      <Button
        type="button"
        title="Add Cinemas"
        label="Add Cinemas"
        icon="/assets/icons/add.png"
        variant={['btn add']}
        onClick={handleOpenModal} // Open modal on button click
      />
      
      {/* Render the modal */}
      <AddCinemasModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <ListCinemasTable/>
    </>
  );
};

export default Page;
