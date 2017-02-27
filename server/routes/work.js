import models from '../models';
import express from 'express';
import child_process from 'child_process';

const work = express.Router();
var exec_inst = child_process.exec;

// Run java process and return results
work.get('/', (req, res) => {
  exec_inst('pwd', (error, stdout, stderr) => {
    res.json({data: stdout});
  });
});

export default work;
