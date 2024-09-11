const express = require('express');
const cors = require('cors');
const roadRoutes = require('./routes/roadRoutes');

const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests from React frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/road', roadRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
