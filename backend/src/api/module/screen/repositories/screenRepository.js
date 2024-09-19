import Screen from "../../../models/screenModel.js"; // Import the Screen model

// Add a new screen to the database
export const addScreen = async (screenData) => {
    try {
      const newScreen = new Screen(screenData); // Create a new instance of Screen with the provided data
      return await newScreen.save(); // Save the screen to the database
    } catch (error) {
      console.error("Error adding screen to the database:", error);
      throw new Error("Error adding screen to the database");
    }
  };


// Function to get all screens for a particular cinema
export const getScreensByCinemasId = async (cinemasId) => {
  try {
    // Find screens where the 'cinemas' field matches the provided cinemasId
    const screens = await Screen.find({ cinemas: cinemasId });
    return screens;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching screens for the given cinema');
  }
};


// Function to get screen by ID
export const getScreenDetailsById = async (screenId) => {
  try {
      const screen = await Screen.findById(screenId).exec();
      return screen;
  } catch (error) {
      console.error('Error fetching screen:', error);
      throw new Error('Error fetching screen by ID');
  }
};