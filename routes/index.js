const express = require('express');
const router = express.Router();

router.use('/api/users', require('./api'));

module.exports = router;