"use client"

import MovieDetail from '@/components/shared/MovieDetailCard/MovieDetailCard';
import { useParams } from 'next/navigation';
import React, { useState, useRef } from 'react';
import ShowDates from '@/app/(user)/modules/shows/components/ShowDates/ShowDates'; 
import ShowCinemas from '@/app/(user)/modules/shows/components/ShowCinemas/ShowCinemas'; 

const Page = () => {
  const params = useParams<{ movieId: string }>();
  const movieId = params?.movieId;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const cinemaRef = useRef<HTMLDivElement | null>(null); // Create a ref for the cinema section

  const handleDateSelect = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const handleBookNowClick = () => {
    if (cinemaRef.current) {
      cinemaRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to cinema section
    }
  };

  return (
    <>
      {movieId && <MovieDetail movieId={movieId} onBookNowClick={handleBookNowClick} />} {/* Pass the click handler */}
      {movieId && <ShowDates movieId={movieId} onDateSelect={handleDateSelect} />}
      {selectedDate && <ShowCinemas ref={cinemaRef} movieId={movieId!} selectedDate={selectedDate} />} {/* Pass the ref */}
    </>
  );
}

export default Page;
