// Importing all route modules
import adminRoutes from './adminRoutes.js';
import userRoutes from './userRoutes.js'
import cinemasRoutes from './cinemasRoutes.js';
import movieRoutes from './movieRoutes.js';
import showRoutes from './showRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import screenRoutes from './screenRoutes.js'
import promotionRoutes from './promotionRoutes.js'

// Function to initialize all routes
const initializeRoutes = (app) => {
  app.use('/api/admin', adminRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/cinemas/screens', screenRoutes);
  app.use('/api/cinemas', cinemasRoutes);
  app.use('/api/shows', showRoutes);
  app.use('/api/booking', bookingRoutes);
  app.use('/api/promotions', promotionRoutes);
};

export default initializeRoutes;


