"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './Carousel.module.css'; // Import the CSS module

type CarouselProps = {
  images: { src: string; title: string }[];
  variant?: string;
  showIndicators?: boolean;
};

const Carousel = ({ images, variant, showIndicators }: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut: any = null;

  useEffect(() => {
    timeOut =
      // eslint-disable-next-line react-hooks/exhaustive-deps
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 2500);
    return () => clearTimeout(timeOut);
  }, [autoPlay, current]);

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className={styles.carouselSection}>

<div
      className={styles.carousel}
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className={styles.carouselContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === current
                ? `${styles.carouselCard} ${styles.carouselCardActive}`
                : styles.carouselCard
            }
          >
            <Image
              className={styles.cardImage}
              src={image.src}
              alt={image.title}
              width={1312}
              height={405}
            />
          </div>
        ))}
        <div className={styles.carouselPagination}>
          {images.map((_, index) => (
            <div
              key={index}
              className={
                index === current
                  ? `${styles.paginationDot} ${styles.paginationDotActive}`
                  : styles.paginationDot
              }
              onClick={() => setCurrent(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>

    </div>

  );
};

export default Carousel;
