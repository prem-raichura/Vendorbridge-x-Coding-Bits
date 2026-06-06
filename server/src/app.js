const express = require('express');
const cors = require('cors');

const authRoutes = require('./shared/auth/auth.routes');
const addProcurementRoutes = require('./procurement/features/addprocurement/addprocurement.routes');
const addRfqRoutes = require('./procurement/features/rfqmanagemant/addrfq.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/procurement', addProcurementRoutes);
app.use('/api/procurement/rfq', addRfqRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Vendorbridge API is running...' });
});

module.exports = app;
