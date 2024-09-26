import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
// custom imports 
import { axiosInstance } from "@/config/axiosConfig";
import Table from "@/components/ui/Table/Table";
import Button from "@/components/ui/Button";

// Define the Cinema interface
interface Cinema {
    _id: string;
    name: string;
    location: string;
}

const ListCinemasTable: React.FC = () => {
  const router = useRouter();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axiosInstance.get<Cinema[]>("/cinemas/all"); 
        setCinemas(response.data);
      } catch (error) {
        setError("Error fetching cinemas. Please try again later.");
        console.error("Error fetching cinemas:", error);
      }
    };

    fetchCinemas();
  }, []);

  const handleView = (cinema: Cinema) => {
    console.log("View cinema with ID:", cinema._id);
    router.push(`/admin/cinemas/${cinema._id}`);
    
  };

  // Define the columns configuration for the Table
  const columns = [
    { header: "Name", accessor: "name" as keyof Cinema },
    { header: "Location", accessor: "location" as keyof Cinema },
    {
      header: "Actions",
      accessor: "actions" as keyof Cinema,
      renderCell: (cinema: Cinema) => (
        <div>
          <Button
                            type='button'
                            title='View Movie'
                            label='View'
                            variant={['btn']}
                            onClick={() => handleView(cinema)}  
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Display error message if any */}
      <Table columns={columns} data={cinemas} />
    </div>
  );
};

export default ListCinemasTable;
