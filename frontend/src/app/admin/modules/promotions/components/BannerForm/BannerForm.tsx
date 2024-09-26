import React, { useState } from 'react';
import styles from './BannerForm.module.css'; // CSS Module

interface BannerFormProps {
  initialData?: {
    imageUrl?: string;
    title?: string;
    status?: string;
  };
  onSubmit: (data: { imageUrl: string; title: string; status: string }) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
}

const BannerForm: React.FC<BannerFormProps> = ({
  initialData = { imageUrl: '', title: '', status: 'active' },
  onSubmit,
  successMessage,
  errorMessage,
}) => {
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  const [title, setTitle] = useState(initialData.title || '');
  const [status, setStatus] = useState(initialData.status || 'active');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit({ imageUrl, title, status });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>
        {initialData.title ? 'Edit Banner' : 'Add New Banner'}
      </h1>
      {isSubmitted && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      {isSubmitted && successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Banner Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.input}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          {initialData.title ? 'Update Banner' : 'Add Banner'}
        </button>
      </form>
    </div>
  );
};

export default BannerForm;
