'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import AddScreenModal from '../../(assets)/addScreenAsset/components/addScreenModal';
import ListScreensTable from '../../(assets)/listScreensAsset/components/ListScreensTable/ListScreensTable';
import AddShowModal from '../../(assets)/addShowAsset/components/AddShowModal';

const Page: React.FC = () => {
  const params = useParams<{ cinemas_id: string }>();
  const cinemasId = params?.cinemas_id;

  const [isAddScreenModalOpen, setIsAddScreenModalOpen] = useState(false);
  const [isAddShowModalOpen, setIsAddShowModalOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<{
    screenId: string;
    sections: { _id: string; sectionNumber: number; sectionName: string }[];
  } | null>(null);

  if (!cinemasId) {
    return <div>Loading...</div>;
  }

  const handleOpenAddScreenModal = () => setIsAddScreenModalOpen(true);
  const handleCloseAddScreenModal = () => setIsAddScreenModalOpen(false);

  const handleOpenAddShowModal = (
    screenId: string,
    sections: { _id: string; sectionNumber: number; sectionName: string }[]
  ) => {
    setSelectedScreen({ screenId, sections });
    setIsAddShowModalOpen(true);
  };
  const handleCloseAddShowModal = () => setIsAddShowModalOpen(false);

  return (
    <>
      <Button
        type="button"
        title="Add Screen"
        label="Add Screen"
        icon="/assets/icons/add.png"
        variant={['btn add']}
        onClick={handleOpenAddScreenModal}
      />
      
      <AddScreenModal
        isOpen={isAddScreenModalOpen}
        onClose={handleCloseAddScreenModal}
        cinemasId={cinemasId}
      />

      <ListScreensTable
        cinemasId={cinemasId}
        onAddShow={handleOpenAddShowModal}
      />

      {selectedScreen && (
        <AddShowModal
          isOpen={isAddShowModalOpen}
          onClose={handleCloseAddShowModal}
          screenId={selectedScreen.screenId}
          sections={selectedScreen.sections}
        />
      )}
    </>
  );
};

export default Page;
