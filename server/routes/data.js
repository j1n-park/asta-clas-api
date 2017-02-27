import models from '../models';
import express from 'express';
import fs from 'fs';

const data = express.Router();

// Add new data
data.post('/', (req, res) => {
  console.log('Requested to add data');
  let newData = req.body;

  //write file and update into db
  fs.open(
    './ext/set3/test_file/'+newData.bac_id+'.csv',
    'w',
    (err, fd) => {
      if(err) {
        console.log(err);
        res.json({
          succ: false
        });
      }
      let buf = new Buffer(newData.data_file);
      fs.write(fd,buf,0,buf.length,null,
        (err, written, buffer) => {
          if(err) {
            res.json({
              succ: false
            });
          }
          console.log(err, written, buffer);
          fs.close(fd, () => {
            console.log('File write completed');
            models.Bacteria.create({
                bac_id: newData.bac_id,
                genus : 'Mycobacterium',
                strain: newData.strain,
                exp_desc: newData.exp_desc
            }).then(() => {
              res.json({
                succ: true
              });
            }).catch((e) => {
              console.log(e);
              res.json({
                succ: false
              });
            });
          });
        }
      );
    }
  );
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
