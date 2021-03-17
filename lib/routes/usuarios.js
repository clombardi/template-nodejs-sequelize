const express = require('express');
const {
  index,
  show,
  changeAvatarUrl,
} = require('../controllers/usuario_controller');
const { withErrorHandling } = require('./utils');

const router = express.Router();

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));
router.patch('/:id/changeAvatar', withErrorHandling(changeAvatarUrl));

module.exports = router;
