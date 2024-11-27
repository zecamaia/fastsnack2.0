const express = require('express');
const EventCategoryController = require('../controllers/EventCategoryController');
const router = express.Router();

router.post('/', EventCategoryController.createEventCategory);
router.get('/', EventCategoryController.getAllEventCategories);
router.get('/:id', EventCategoryController.getEventCategoryById);
router.put('/:id', EventCategoryController.updateEventCategory);
router.delete('/:id', EventCategoryController.deleteEventCategory);

module.exports = router;