const { OrderTicket, Ticket, User, Event } = require('../../models');

class OrderTicketController {
    async createOrder(req, res) {
        try {
            const { user_id, ticket_id, quantity } = req.body;
            const ticket = await Ticket.findByPk(ticket_id);
            if (!ticket || ticket.available_quantity < quantity) {
                return res.status(400).json({ erro: "Quantidade insuficiente de ingressos disponiveis" });
            }
            const order = await OrderTicket.create({
                user_id,
                ticket_id,
                quantity,
                status: 'pendente',
            })
            ticket.available_quantity -= quantity;
            await ticket.save();
            res.status(201).json({ order });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao criar pedido. Tente novamente.' })

        }
    }
    async updateOrderStatus(req, res) {
        const { order_id } = req.params;
        const { status } = req.body;
        const order = await OrderTicket.findByPk(order_id);
        if (!order) {
            return res.status(400).json({ error: 'Pedido não encontrado' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ order })
    }
    async getUserOrders(req, res) {
        try {
            const { user_id } = req.params;
            const orders = await OrderTicket.findAll({
                where: { user_id },
                include: [
                    {
                        model: Ticket,
                        as: 'ticket',
                        include: [
                            {
                                model: Event,
                                as: 'event'
                            }
                        ]
                    },
                ],
            });
            return res.status(200).json(orders)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao listar pedidos. Tente novamente" });
        }
    }

}

module.exports = new OrderTicketController();