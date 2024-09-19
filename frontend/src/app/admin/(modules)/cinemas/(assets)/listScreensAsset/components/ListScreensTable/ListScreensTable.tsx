import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import Table from "@/components/ui/Table/Table";
import Button from "@/components/ui/Button";
import EditScreenModal from "../../../editScreenAsset/components/EditScreenModal";
import styles from './ListScreensTable.module.css';

interface Section {
  _id: string;
  sectionNumber: number;
  sectionName: string;
}

interface Screen {
  _id: string;
  screenNumber: number;
  screenType: string;
  sections: Section[];
}

interface ListScreensTableProps {
  cinemasId: string;
  onAddShow: (screenId: string, sections: { _id: string; sectionNumber: number; sectionName: string }[]) => void;
}

const ListScreensTable: React.FC<ListScreensTableProps> = ({ cinemasId, onAddShow }) => {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editScreenId, setEditScreenId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await axiosInstance.get<Screen[]>(`/cinemas/screens/all/${cinemasId}`);
        setScreens(response.data);
      } catch (error) {
        setError("Error fetching screens. Please try again later.");
        console.error("Error fetching screens:", error);
      }
    };

    fetchScreens();
  }, [cinemasId]);

  const handleEdit = (screen: Screen) => {
    setEditScreenId(screen._id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditScreenId(null);
  };

  const columns = [
    { header: "Screen Number", accessor: "screenNumber" as keyof Screen },
    { header: "Screen Type", accessor: "screenType" as keyof Screen },
    {
      header: "Section Names",
      accessor: "sections" as keyof Screen,
      renderCell: (screen: Screen) => screen.sections.map((section) => section.sectionName).join(", "),
    },
    {
      header: "Actions",
      accessor: "actions" as keyof Screen,
      renderCell: (screen: Screen) => (
        <div className={styles.buttons}>
          <Button
            type="button"
            title="Edit Screen"
            label="Edit"
            variant={["btn"]}
            onClick={() => handleEdit(screen)}
          />
          <Button
            type="button"
            title="Add Show"
            label="Add Show"
            variant={["btn green"]}
            onClick={() => onAddShow(screen._id, screen.sections)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <Table columns={columns} data={screens} />
      {isEditModalOpen && editScreenId && (
        <EditScreenModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          screenId={editScreenId}
          cinemasId={cinemasId}
        />
      )}
    </div>
  );
};

export default ListScreensTable;
