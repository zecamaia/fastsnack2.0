const { Category, Product } = require("../../models");

class CategoryController {
    async createCategory(req, res) {
        try {
            const newCategory = req.body;
            const { name, description, event_id } = newCategory;
            const category = await Category.create({
                name,
                description,
                event_id
            });
            res.status(201).json({ category });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao criar categoria" })
            console.error(error)
        }
    }
    async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar as categorias." });
            console.error(error)
        }
    }
    async getCategoryById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao mostrar a categorias." });
            console.error(error)
        }
    }


    async getAllCategoriesAndProductsByEvent(req, res) {
        const { eventId } = req.params
        try {
            const categories = await Category.findAll({
                where: { event_id: eventId },
                include: [
                    {
                        model: Product,
                        as: 'produto',
                    }
                ]
            })
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar as categorias e produtos." });
            console.error(error)
        }
    }

    async updateCategory(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            const editedCategory = await category.update(req.body);
            const { name, description, event_id } = editedCategory;
            res.status(200).json({ name, description, event_id });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao editar a categorias." });
            console.error(error)
        }
    }
    async deleteCategory(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            await category.destroy();
            res.status(200).json({ message: "Categoria deletada com sucesso." });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao deletar a categorias." });
            console.error(error)
        }
    }
}

module.exports = new CategoryController();