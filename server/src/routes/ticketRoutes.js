const express = require('express');
const TicketController = require('../controllers/TicketController');
const loginRequired = require('../middlewares/loginRequired');
const router = express.Router();

router.post('/', TicketController.createTicket);
router.get('/', TicketController.getAllTickets);
router.get('/:id', loginRequired, TicketController.getTicketById);
router.put('/:id', TicketController.updateTicket);
router.delete('/:id', loginRequired, TicketController.deleteTicket);

router.get('/event/:event_id', TicketController.getTicketsByEvent);

module.exports = router;