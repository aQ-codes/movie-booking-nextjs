"use client"

import { useParams } from 'next/navigation';
import SeatSection from '../../assets/seatAsset/components/SeatSection/SeatSection';


const Page: React.FC = () => {
  const params = useParams(); 

  // Check if params is not null and extract parameters
  const showId = params ? params.showId : undefined;
  const screenId = params ? params.screenId : undefined;

  return (
    <>
    <SeatSection showId={showId} screenId={screenId} />
    </>
  );
};

export default Page;
