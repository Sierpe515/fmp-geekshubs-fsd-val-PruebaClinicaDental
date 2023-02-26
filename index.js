
const express = require('express');
const db = require('./db.js');
const { User } = require('./models/index');
const { Role } = require('./models/index');
const { User_Role } = require('./models/index');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/welcome', (req, res) => {
    return res.send("Bienvenido a mi app")
})

// app.get('/users', (req, res) => {
//     return res.send("Área de usuarios")
// })

app.post('/users', async(req, res) => {
    // Recuperamos la informacion a traves de la req
    // const name = req.body.name;
    // const description = req.body.description;
    // const price = req.body.price;

    const { name, surname, nif, birth_date, direction, email, phone, password } = req.body;

    const newUser = {
        name: name,
        surname: surname,
        nif: nif,
        birth_date: birth_date,
        direction: direction,
        email: email,
        phone: phone,
        password: password
    }

    // Guardar la informacion
    const user = await User.create(newUser)

    return res.json(user)
})

app.delete('/users/:id', async(req, res) => {
    const userId = req.params.id;
    
    const deleteUser = await User.destroy({where: { id: userId}})

    return res.json(deleteUser);
})

app.get('/users', async(req, res)=> {
    const users = await User.findAll();

    return res.json(users);
})

app.post('/roles', async(req, res) => {

    const { privilege } = req.body;

    const newPrivilege = {
        privilege
    }

    // Guardar la informacion
    const role = await Role.create(newPrivilege)

    return res.json(role)
})

app.post('/user_roles', async(req, res) => {

    const { user_id, role_id } = req.body;

    const newUserRole = {
        user_id,
        role_id
    }

    // Guardar la informacion
    const userRole = await User_Role.create(newUserRole)

    return res.json(userRole)
})

db.then(() => {
    //Starting server
    app.listen(PORT, () => console.log("Server on port " + PORT));
})
    .catch((err) => console.log(err.message)); 