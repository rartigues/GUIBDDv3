module.exports = function(req, res, next){
    const {user_email, user_name, user_password} = req.body;

    function validEmail(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if(req.path === "/register"){
        if(!user_email || !user_name || !user_password){
            return res.status(401).json({
                message: 'Faltan credenciales'
            });
        } else if(!validEmail(user_email)){
            return res.status(403).json({
                message: 'El email no es valido'
            });
        }
    } else if(req.path === "/login"){
        if(!user_email || !user_password){
            return res.status(401).json({
                message: 'Faltan credenciales'
            });
        } else if(!validEmail(user_email)){
            return res.status(403).json({
                message: 'El email no es valido'
            });
        }
    }
    next();
};