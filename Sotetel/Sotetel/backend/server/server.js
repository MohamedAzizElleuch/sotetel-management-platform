const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // ✅ For serving static files
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend port
  credentials: true,               // Allow cookies, headers, etc.
};
app.use(cors(corsOptions));

// ✅ Serve uploaded actualite images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const messageRoutes = require('./routes/messageRoutes');
const actualiteRoutes = require('./routes/actualiteRoutes');

// Route usage
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/actualites', actualiteRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}/`)
);
