import express from "express";
import cors from 'cors';
import { connect } from "./config/dbConfig.js";
import initializeRoutes from './api/routes/index.js'; 

const app = express();
const PORT = 8080;

app.use(cors());

// Middleware
app.use(express.json()); //for parsing

// Connect to MongoDB
connect();

app.get("/api/home", (req, res) =>{
    res.json({message: "Hello World!"});
})

// Initialize all routes
initializeRoutes(app);

// Start the server
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
})








