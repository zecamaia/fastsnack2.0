const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log('Authorization header:', authorization);
    if (!authorization) {
        return res.status(401).json({
            error: "Login é necessario.",
        });
    }
    const [, token] = authorization.split(" ");
    try {
        const dados = jwt.verify(token, 'secreta');
        const { id, role } = dados;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                error: "Usuario inválido ou nao encontrado."
            });
        }

        req.userId = id;
        req.userRole = role
        console.log("autorizacao sucesso")
        next()
    } catch (error) {
        console.log("Erro de autenticação:", error.message);

        return res.status(401).json({
            error: "Token expirado ou inválido."
        });
    }
};