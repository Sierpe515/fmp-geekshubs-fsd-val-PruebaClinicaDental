const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

const router = require('express').Router();

router.post('/register', authController.register);
router.delete('/users/:id', authController.deleteUser);
router.get('/users', verifyToken, authController.findAllUsers);
router.get('/users_role/:id', authController.getUserRoles);
router.post('/login', authController.login);

module.exports = router;