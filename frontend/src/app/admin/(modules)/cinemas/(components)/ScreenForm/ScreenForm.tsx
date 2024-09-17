import React, { useState, useEffect, useRef } from "react";
import styles from "./ScreenForm.module.css";

interface Section {
  id: number;
  sectionNumber: number;
  sectionName: string;
}

interface ScreenFormProps {
  initialData?: {
    screenNumber?: number;
    screenType?: string;
    sections?: Section[];
    seatArrangement?: string;
  };
  onSubmit: (data: {
    screenNumber: number;
    screenType: string;
    sections: Section[];
    seatArrangement: string;
  }) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
}

const ScreenForm: React.FC<ScreenFormProps> = ({
  initialData = { sections: [] },
  onSubmit,
  successMessage,
  errorMessage,
}) => {
  const [screenNumber, setScreenNumber] = useState<number>(initialData.screenNumber || 0);
  const [screenType, setScreenType] = useState<string>(initialData.screenType || "");
  const [sections, setSections] = useState<Section[]>(initialData.sections || []);
  const [seatArrangement, setSeatArrangement] = useState<string>(initialData.seatArrangement || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current && initialData.sections && initialData.sections.length > 0) {
      setSections(initialData.sections);
      isInitializedRef.current = true;
    }
  }, [initialData.sections]);

  const handleAddSection = () => {
    const newSectionId = sections.length ? sections[sections.length - 1].id + 1 : 1;
    const newSection = { id: newSectionId, sectionNumber: newSectionId, sectionName: "" };
    setSections([...sections, newSection]);
  };

  const handleSectionChange = (id: number, field: keyof Section, value: any) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit({ screenNumber, screenType, sections, seatArrangement });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>
        {initialData.screenNumber ? "Edit Screen" : "Add a New Screen"}
      </h1>
      {isSubmitted && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      {isSubmitted && successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          placeholder="Enter screen number"
          value={screenNumber}
          onChange={(e) => setScreenNumber(Number(e.target.value))}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Screen Type (e.g., 2D, IMAX)"
          value={screenType}
          onChange={(e) => setScreenType(e.target.value)}
          className={styles.input}
          required
        />
        {sections.map((section) => (
          <div key={section.id} className={styles.sectionRow}>
            <input
              type="number"
              placeholder="Section Number"
              value={section.sectionNumber}
              onChange={(e) => handleSectionChange(section.id, "sectionNumber", Number(e.target.value))}
              className={styles.sectionInput}
              required
              disabled
            />
            <input
              type="text"
              placeholder="Section Name"
              value={section.sectionName}
              onChange={(e) => handleSectionChange(section.id, "sectionName", e.target.value)}
              className={styles.sectionInput}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddSection} className={styles.addSectionButton}>
          Add Section
        </button>
        <textarea
          placeholder="Seat Arrangement"
          value={seatArrangement}
          onChange={(e) => setSeatArrangement(e.target.value)}
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.submitButton}>
          {initialData.screenNumber ? "Update Screen" : "Add Screen"}
        </button>
      </form>
    </div>
  );
};

export default ScreenForm;
