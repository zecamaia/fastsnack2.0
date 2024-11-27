const { Ticket, Event } = require("../../models");

class TicketController {
    async createTicket(req, res) {
        try {
            const newTicket = req.body;
            const { user_id, event_id, ticket_type, price, status, quantity } = newTicket;
            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ erro: "Evento não encontrado" });
            }
            const ticket = await Ticket.create({
                user_id,
                event_id,
                ticket_type,
                price,
                status,
                quantity,
                available_quantity: quantity
            });
            res.status(201).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao criar ingresso" });
        }
    }
    async getAllTickets(req, res) {
        try {
            const ticket = await Ticket.findAll();
            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao listar os ingressos" });
        }
    }
    async getTicketById(req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            if (!ticket) {
                return res.status(404).json({ erro: "Ingresso nao encontrado." });
            }
            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao mostrar o ingresso" });
        }
    }

    async getTicketsByEvent(req, res) {
        try {
            const { event_id } = req.params;
            const tickets = await Ticket.findAll({ where: { event_id } });
            res.status(200).json(tickets)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao listar ingressos. Tente novamente.' })
        }
    }

    async updateTicket(req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            if (!ticket) {
                return res.status(404).json({ erro: "Ingresso não encontrado" });
            }
            const editedTicket = await ticket.update(req.body);
            const { user_id, event_id, ticket_type, price, status, available_quantity, quantity } = editedTicket;
            res.status(200).json({
                user_id,
                event_id,
                ticket_type,
                price,
                status,
                available_quantity,
                quantity
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao editar ingresso" });
        }

    }
    async deleteTicket(req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            if (!ticket) {
                return res.status(404).json({ erro: "Ingresso não encontrado" });
            }
            await ticket.destroy();
            res.status(200).json({ message: "Ingresso Deletado com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao deletar ingresso" });
        }
    }
}

module.exports = new TicketController();