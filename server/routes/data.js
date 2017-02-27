import models from '../models';
import express from 'express';

const data = express.Router();

// Add new data
data.post('/', (req, res) => {
  console.log('Requested to add data');
  let newData = req.body;
  res.json({
    succ: true
  })
});

// Get data
data.get('/', (req, res) => {
  console.log('Requested to find all');
  models.Bacteria.findAll({
    include: [{model: models.Peaks, as: 'peaks'}]
  }).then((bacteria) => {
    res.json({
      succ: true,
      data: bacteria
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      succ: false
    });
  });
});

// Get data data
data.get('/:id', (req, res) => {
  console.log('Requested to find: ' + req.params.id);
  models.Bacteria.find({
    where: {bac_id: req.params.id},
    include: [{model: models.Peaks, as: 'peaks'}]
  }).then((bacteria) => {
    res.json({
      succ: true,
      data: bacteria
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      succ: false
    });
  });
});

// Del data data
data.delete('/:id', (req, res) => {
  console.log('Requested to delete: ' + req.params.id);
  res.json({
    succ: true
  })
});

export default data;
