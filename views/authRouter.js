const authController = require('../controllers/authController');

const router = require('express').Router();

router.post('/register', authController.register);
router.delete('/users/:id', authController.deleteUser)
router.get('/users', authController.findAllUsers)

module.exports = router;