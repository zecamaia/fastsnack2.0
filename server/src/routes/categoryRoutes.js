const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();


router.post('/', CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/evento/:eventId/", CategoryController.getAllCategoriesAndProductsByEvent);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;