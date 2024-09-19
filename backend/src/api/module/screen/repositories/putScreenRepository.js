import Screen from "../../../models/screenModel.js";

// Update an existing screen 
export const updateScreen = async (screenId, screenData) => {
    try {
      console.log('entered updatescreen')
      return await Screen.findByIdAndUpdate(screenId, screenData, { new: true });
    } catch (error) {
      console.error("Error updating screen in the database:", error);
      throw new Error("Error updating screen in the database");
    }
  };