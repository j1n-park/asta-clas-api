import models from '../models';
import express from 'express';

const marker = express.Router();

// Add new marker
marker.post('/', (req, res) => {
  res.json({succ: false});
});

// Get marker list
marker.get('/', (req, res) => {
  res.json({succ: false});
});

// Get marker data
marker.get('/:id', (req, res) => {
  res.json({succ: false});
});

// Del marker data
marker.delete('/:id', (req, res) => {
  res.json({succ: false});
});

// Modify marker data
marker.put('/:id', (req, res) => {
  res.json({succ: false});
});

export default marker;
