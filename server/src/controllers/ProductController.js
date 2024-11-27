const { Product } = require("../../models/");

class ProductController {
    async createProduct(req, res) {
        try {
            const newProduct = req.body;
            const { name, price, quantity, image, status, category_id } = newProduct;
            const product = await Product.create({
                name,
                price,
                quantity,
                image,
                status,
                category_id
            });
            res.status(201).json({ product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao criar produto" });
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao listar os produtos" });
        }
    }
    async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }
            res.status(200).json(product);
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao mostar o produto" });
        }
    }
    async updateProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }
            const newData = await product.update(req.body);
            const { name, price, quantity, image, status, category_id } = newData;
            res.status(200).json({ name, price, quantity, image, status, category_id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao editar o produto" });
        }
    }
    async deleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(500).json({ erro: "Produto não encontrado" });
            }
            await product.destroy()
            res.status(200).json({ message: "Produto deletado com sucesso" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao deletar produto" });
        }

    }
}

module.exports = new ProductController();