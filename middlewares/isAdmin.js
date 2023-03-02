const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        
        if (req.roleId === "admin"){

        const [strategy, token] = authorization.split(" ");

        const decoded = jwt.verify(token, 'secreto');

        req.userId = decoded.userId;
        req.roleId = decoded.roleId;

        console.log("es admin")
        next()
      } else if (req.roleId != "admin"){
        return res.send('no es admin')
      }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = isAdmin;