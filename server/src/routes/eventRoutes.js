const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const EventController = require('../controllers/EventController');
const router = express.Router();

router.post("/", EventController.createEvent);
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", loginRequired, EventController.deleteEvent);
router.get("/:id/categorias", EventController.getEventCategories)
router.get("/:id/produtos", EventController.getEventProducts)
module.exports = router;