const express = require('express');
const router = express.Router();

//@route GET api/post
// desc test route
// @access
router.get('/', (req, res) => res.send('post route'));

module.exports = router;
