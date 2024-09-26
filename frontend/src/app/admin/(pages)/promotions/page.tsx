'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading/Heading';
import AddBannerModal from '../../modules/promotions/components/AddBannerModal';

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Heading heading="All Banners" />
      <Button
        type="button"
        title="Add Banner"
        label="Add Banner"
        icon="/assets/icons/add.png"
        variant={['btn add']}
        onClick={handleOpenModal}
      />
      <AddBannerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Page;
