import express from 'express';
import marker from './marker';
import data from './data';
import work from './work';

const router = express.Router();

router.use('/marker', marker);
router.use('/data', data);
router.use('/run', work);

export default router;
