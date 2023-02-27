const { User } = require('../models');

const authController = {};

authController.register = async(req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

authController.deleteUser = async(req, res) => {
    const userId = req.params.id;
    
    const deleteUser = await User.destroy({where: { id: userId}})

    return res.json(deleteUser);
};

authController.findAllUsers = async(req, res)=> {
    const users = await User.findAll();

    return res.json(users);
};

module.exports = authController;