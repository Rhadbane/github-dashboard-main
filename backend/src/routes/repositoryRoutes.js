const express = require('express');
const router = express.Router();
const repositoryController = require('../controllers/repositoryController');

router.get('/', repositoryController.getRepositories);
router.post('/update', repositoryController.updateRepositories);

module.exports = router;