import Cinemas from "../../../models/cinemasModel.js";

// Add a new cinema
export const addCinemas = async (cinemasData) => {
  try {
    const newCinemas = new Cinemas(cinemasData);
    return await newCinemas.save(); // Save the cinema to the database
  } catch (error) {
    console.log(error);
    throw new Error('Error adding cinema to the database');
  }
};

// Fetch all cinemas
export const getAllCinemas = async () => {
  return await Cinemas.find();  // Fetches all cinemas from the database
};

// Fetch a cinema by ID
export const getCinemasById = async (id) => {
  return await Cinemas.findById(id);  // Fetches a cinema by its ID
};

// Update a cinema by ID
export const updateCinemas = async (id, cinemaData) => {
  return await Cinemas.findByIdAndUpdate(id, cinemaData, { new: true });  // Updates a cinema by ID
};

// Delete a cinema by ID
export const deleteCinemas = async (id) => {
  return await Cinemas.findByIdAndDelete(id);  // Deletes a cinema by ID
};
