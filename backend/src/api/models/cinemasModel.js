import mongoose from 'mongoose';

const cinemasSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
  });
  


const Cinemas = mongoose.model('Cinemas', cinemasSchema);

export default Cinemas;
