'use client'; // Make sure to use 'use client' directive for client-side components

import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading/Heading';
import React, { useState } from 'react';
// custom imports 
import AddMovieModal from '../../modules/movies/components/AddMovieModal';
import ListMoviesTable from '../../modules/movies/components/ListMoviesTable';

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
      <Heading heading="All Movies" />

        <Button
          type="button"
          title="Add movie"
          label="Add Movie"
          icon="/assets/icons/add.png"
          variant={['btn add']}
          onClick={handleOpenModal} // Open modal on button click
        />
      {/* Render the modal */}
      <AddMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <ListMoviesTable/>
    </>
  );
};

export default Page;
