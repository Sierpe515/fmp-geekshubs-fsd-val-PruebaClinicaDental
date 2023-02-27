const router = require('express').Router();
const authRoutes = require('./views/authRouter');
const roleRoutes =  require('./views/roleRouter');
const user_roleRoutes =  require('./views/user_roleRouter');

router.use('/', authRoutes);
router.use('/', roleRoutes);
router.use('/', user_roleRoutes);

module.exports = router;