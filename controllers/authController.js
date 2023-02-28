const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {};

authController.register = async(req, res) => {
    try {
        const { name, surname, nif, birth_date, direction, email, phone, password } = req.body;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            name: name,
            surname: surname,
            nif: nif,
            birth_date: birth_date,
            direction: direction,
            email: email,
            phone: phone,
            password: encryptedPassword
        }

        // Guardar la informacion
        const user = await User.create(newUser)

        return res.json(user)
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne(
            {
                where: {
                    email: email
                }
            }
        );

        if (!user) {
            return res.send('Wrong Credentials. No user')
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.send('Wrong Credentials. Wrong PW')
        }

        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                // roleId: user.role_id
                // Buscar forma de recoger role_id desde Array
            }, 
            'secreto',
            { expiresIn: '2h'}
        );

        return res.json(token)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

authController.deleteUser = async(req, res) => {
    const userId = req.params.id;
    
    const deleteUser = await User.destroy({where: { id: userId}})

    return res.json(deleteUser);
};

authController.findAllUsers = async(req, res)=> {
    const users = await User.findAll();

    return res.json(users);
};

authController.getUserRoles = async (req, res) => {
    try {
        const userId = req.params.id;

        const userRole = await User.findByPk(
            userId,
            {
                include: {
                    all: true
                }
            }
        );

        if (!userRole) {
            return res.send('User Not found')
        }

        return res.json(userRole);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = authController;