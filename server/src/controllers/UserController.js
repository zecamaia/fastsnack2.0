const bcrypt = require('bcryptjs');
const { User } = require('../../models');

class UserController {
    async createUser(req, res) {
        try {
            const { username, email, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const novoUsuario = await User.create({
                username,
                email,
                password: hashedPassword,
                role
            });
            return res.json({ username, email, role });

        } catch (error) {
            console.error("Erro ao tentar criar usuario", error)
            return res.status(500).json({ erro: "Erro ao criar usuario" });
        }
    }

    async getAllUsers(req, res) {
        try {
            const usuarios = await User.findAll({
                attributes: ["id", "username", "email", "role"],
            });
            return res.json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar usuarios" })
        }
    }

    async getUserById(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuario nao encontrado." });
            }
            const { id, username, email, role } = usuario;
            return res.json({ id, username, email, role });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar usuario" })
        }
    }

    async updateUser(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuario nao encontrado." });
            }
            const novosDados = await usuario.update(req.body)
            const { username, email, role } = novosDados;
            return res.json({ username, email, role });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao editar usuario" })
        }
    }

    async deleteUser(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuario nao encontrado." });
            }
            await usuario.destroy();
            return res.json({
                status: 200,
                msg: "Deletado com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao deletar usuario" });
        }
    }
}

module.exports = new UserController();