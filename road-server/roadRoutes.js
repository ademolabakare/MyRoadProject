const express = require('express');
const multer = require('multer');
const { processRoadData } = require('../controllers/roadController');

const router = express.Router();

// Set up multer for file uploads (store in 'uploads/' directory)
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), processRoadData);

module.exports = router;
