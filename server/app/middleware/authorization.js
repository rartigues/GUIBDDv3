const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        // Conseguir token del header
        const jwtToken = req.header("token");
        // Verificar token
        const decoded = jwt.verify(jwtToken, process.env.jwtSecret);
        // Añadir el usuario al req para usarlo en las rutas
        const user_id = decoded.userId;
        req.user = decoded;
        req.user.user_id = user_id;
        // Pasar al siguiente middleware
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(403).json("No estas autorizado");
    }
}