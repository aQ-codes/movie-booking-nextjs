import React, { useState } from 'react';
import BannerForm from './BannerForm/BannerForm';
import { axiosInstance } from '@/config/axiosConfig';

const AddBannerForm: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: { imageUrl: string; title: string; status: string }) => {
    try {
      const response = await axiosInstance.post('/promotions/banner/add', data);

      if (response.status === 201) {
        setSuccessMessage('Banner added successfully!');
        setErrorMessage(null);
      }
    } catch (error: any) {
      setErrorMessage('An error occurred while adding the banner.');
      setSuccessMessage(null);
    }
  };

  return (
    <BannerForm
      onSubmit={handleSubmit}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
};

export default AddBannerForm;
