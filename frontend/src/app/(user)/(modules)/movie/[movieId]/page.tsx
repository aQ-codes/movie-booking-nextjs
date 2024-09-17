"use client"

import MovieDetail from '@/components/shared/MovieDetailCard/MovieDetailCard';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import ShowDates from '../assets/showDatesAsset/components/ShowDates/ShowDates'; 
import ShowCinemas from '../assets/showCinemasAsset/components/ShowCinemas/ShowCinemas';

const Page = () => {
  const params = useParams<{ movieId: string }>();
  const movieId = params?.movieId;
  console.log(movieId)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateSelect = (selectedDate: string) => {
    setSelectedDate(selectedDate); // Set the selected date
  };

  return (
    <>
    {movieId && <MovieDetail movieId={movieId}/>}
    {movieId && <ShowDates movieId={movieId} onDateSelect={handleDateSelect} />}
    {selectedDate && <ShowCinemas movieId={movieId!} selectedDate={selectedDate} />}
    </> 
  );
}

export default Page;
