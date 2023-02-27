
const express = require('express');
const authController = require('./controllers/authController.js');
const roleController = require('./controllers/roleController.js');
const user_roleController = require('./controllers/user_roleController')

const db = require('./db.js');
const { User, Role, User_Role } = require('./models/index');
require('dotenv').config();

const router = require('./router')
// const authRoutes = require('./views/authRouter');
// const roleRoutes = require('./views/roleRouter');
// const user_roleRoutes = require('./views/user_roleRouter')

const app = express();

app.use(express.json());

app.use(router)
// app.use(authRoutes);
// app.use(roleRoutes);
// app.use(user_roleRoutes);

const PORT = 3000;

app.get('/welcome', (req, res) => {
    return res.send("Bienvenido a mi app")
})

// app.get('/users', (req, res) => {
//     return res.send("Área de usuarios")
// })

// app.post('/users', authController.register)

// app.delete('/users/:id', authController.deleteUser)

// app.get('/users', authController.findAllUsers)

// app.post('/roles', roleController.newPrivilege)

// app.post('/user_roles', user_roleController.newUserRoler)

db.then(() => {
    //Starting server
    app.listen(PORT, () => console.log("Server on port " + PORT));
})
    .catch((err) => console.log(err.message)); 