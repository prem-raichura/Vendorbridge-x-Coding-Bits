const express = require('express');
const cors = require('cors');

const authRoutes = require('./shared/auth/auth.routes');
const managerRoutes = require('./admin/features/manager/manager.routes');
const vendorRoutes = require('./admin/features/managevendor/managevendor.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/manager', managerRoutes);
app.use('/api/admin/vendor', vendorRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Vendorbridge API is running...' });
});

module.exports = app;
