import express from "express";
import cors from 'cors';
import { connect } from "./config/dbConfig.js";
import initializeRoutes from './api/routes/index.js'; 
import seedAdmin from "./api/seeders/seedAdmin.js";


const app = express();
const PORT = 8080;

app.use(cors());

// Middleware
app.use(express.json()); //for parsing

// Connect to MongoDB
connect();

// Seed admin user
await seedAdmin();

// Initialize all routes
initializeRoutes(app);

// Start the server
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
})








