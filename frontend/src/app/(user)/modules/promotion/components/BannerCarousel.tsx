"use client"

import React, { useEffect, useState } from 'react';
import Carousel from '@/components/ui/Carousel/Carousel';
import { fetchBannerImages } from '../services/bannerService';

const BannerCarousel = () => {
const [images, setImages] = useState<{ src: string; title: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await fetchBannerImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching banner images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="carousel-section">
      <Carousel images={images} />
    </section>
  );
};

export default BannerCarousel;
