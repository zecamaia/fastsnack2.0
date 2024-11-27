const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const ProductController = require('../controllers/ProductController');
const router = express.Router();


router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

// router.get("/")
module.exports = router