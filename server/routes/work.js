import models from '../models';
import express from 'express';
import child_process from 'child_process';

const work = express.Router();
var exec_inst = child_process.exec;

// Run java process and return results
work.get('/', (req, res) => {
  exec_inst('java -cp ./ext microid.MarkerClassification', (error, stdout, stderr) => {
    if (error) {
      console.log('error occured');
      res.json({succ: true});
    }
    else {
      console.log(stdout, stderr);
      let results = JSON.parse(stdout);
      console.log('got result: ', results);
      let requests = results.map((result) => {
        return new Promise((resolve) => {
          models.Bacteria.update({
            species: result.species
          },{
            where: {
              bac_id: result.bac_id
            }
          });
          resolve();
        });
      });
      Promise.all(requests).then(()=>{
        res.json({succ: true});
      }).catch((e)=>{
        console.log(e);
        res.json({succ: false});
      });
    }
  });
});

export default work;
