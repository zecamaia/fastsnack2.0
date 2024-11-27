const { where } = require('sequelize');
const { Product, Order, Ticket, OrderItem, Event } = require('../../models');
const QRCode = require('qrcode');

const stripe = require('stripe')('sk_test_51QL2V2E048WBTF5AJrojLfbxYEZyWTM0KZyQumWgDhKRjsYHAHhFMJ0veli0KYZ5xWjbRit4cLcSo3vQWBlKzfAz00wrqgxcJZ');

class OrderController {
    async createOrder(req, res) {
        try {
            const { user_id, products, tickets } = req.body;
            let total = 0;

            // Criar o pedido inicialmente sem o total
            const order = await Order.create({ user_id, total: 0 });

            // Adicionar os itens de produtos
            for (const product of products) {
                const foundProduct = await Product.findByPk(product.product_id);
                if (foundProduct) {
                    const itemTotalPrice = foundProduct.price * product.quantity;
                    total += itemTotalPrice;

                    // Criar o OrderItem para o produto
                    await OrderItem.create({
                        order_id: order.id,
                        product_id: foundProduct.id,
                        quantity: product.quantity,
                        unit_price: foundProduct.price
                    });
                }
            }

            for (const ticket of tickets) {
                const foundTicket = await Ticket.findByPk(ticket.ticket_id);
                if (foundTicket && foundTicket.available_quantity >= ticket.quantity) {
                    const itemTotalPrice = foundTicket.price * ticket.quantity;
                    total += itemTotalPrice;

                    foundTicket.available_quantity -= ticket.quantity;
                    await foundTicket.save();

                    // Criar o OrderItem para o ingresso
                    await OrderItem.create({
                        order_id: order.id,
                        ticket_id: foundTicket.id,
                        quantity: ticket.quantity,
                        unit_price: foundTicket.price
                    });
                } else {
                    return res.status(400).json({ erro: "Quantidade insuficiente de ingressos" });
                }
            }

            // Atualizar o total do pedido na tabela Orders
            await order.update({ total });

            const orderUrl = `http://localhost:3000/pedidos/${order.id}`;
            await order.update({ qr_code_url: orderUrl });
            QRCode.toDataURL(orderUrl, async (err, qrCodeUrl) => {
                if (err) {
                    console.error("Erro ao gerar QR Code", err);
                    return res.status(500).json({ erro: "Erro ao gerar o QR cODE" });
                }

                return res.status(201).json({
                    status: 201,
                    message: "Pedido criado com sucesso.",
                    order: {
                        id: order.id,
                        user_id,
                        total,
                        products,
                        tickets,
                        qrCodeUrl
                    },
                });

            });

        } catch (error) {
            console.error("Erro ao processar o pedido", error);
            return res.status(500).json({ erro: "Erro ao criar o pedido" });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            res.status(200).json({ orders });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar os pedidos" });
        }
    }

    async getUserOrders(req, res) {
        try {
            const { user_id } = req.params;
            const orders = await Order.findAll({
                where: { user_id },
                include: [
                    {
                        model: OrderItem,
                        as: 'orderItems',
                        include: [
                            {
                                model: Product,
                                as: 'product'
                            },
                            {
                                model: Ticket,
                                as: 'ticket',
                                include: [
                                    {
                                        model: Event,
                                        as: 'event'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            });

            // Gerar o QR Code em base64 para cada pedido
            for (const order of orders) {
                const orderUrl = `http://localhost:3000/pedidos/${order.id}`;

                await new Promise((resolve, reject) => {
                    QRCode.toDataURL(orderUrl, (err, qrCodeUrlBase64) => {
                        if (err) {
                            console.error("Erro ao gerar QR Code", err);
                            reject("Erro ao gerar o QR Code");
                        } else {
                            // Adicionar o QR Code em base64 ao pedido
                            order.qrCodeUrlBase64 = qrCodeUrlBase64;
                            resolve();
                        }
                    });
                });
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar os pedidos, Tente novamente" });
        }
    }


    async getOrderById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);


            if (!order) {
                return res.status(404).json({ erro: "Pedido não encontrado" });
            }
            const orderUrl = `http://localhost:3000/pedidos/${order.id}`
            QRCode.toDataURL(orderUrl, (err, qrCodeUrlBase64) => {
                if (err) {
                    console.error("Erro ao gerar o QR Code", err);
                    return res.status(500).json({ erro: "Erro ao gerar QR Code" });
                }

                return res.status(200).json({
                    status: 200,
                    order,
                    qrCodeUrlBase64
                });
            });
        } catch (error) {
            console.error("Erro ao obter pedido", error);
            return res.status(500).json({ erro: "Erro ao obter pedido" });
        }
    }
    async updateOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ erro: "Pedido não encontrado" });
            }
            const updatedOrder = await order.update(req.body);
            res.status(200).json({
                status: 200,
                message: "Pedido atualizado com sucesso",
                order: updatedOrder
            });
        } catch (error) {
            console.error("Erro ao editar pedido", error);
            return res.status(500).json({ erro: "Erro ao editar pedido" });
        }
    }
    async confirmOrderPayment(req, res) {
        try {
            const { sessionId } = req.body;
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const orderId = session.metadata?.orderId;
            console.log("orderId: ", orderId)
            if (!orderId) {
                return res.status(400).json({ message: "Order ID não encontrado na metadata" });
            }

            if (session.payment_status === 'paid') {
                await Order.update({ status: 'pago' }, { where: { id: orderId } });
                return res.status(200).json({ message: "Pagamento confirmado com sucesso" });
            } else {
                return res.status(400).json({ message: "Pagamento não efetuado" });
            }
        } catch (error) {
            console.error("Erro ao confirmar pagamento:", error);
            return res.status(500).json({ erro: "Erro ao confirmar pagamento" });
        }
    }
    async deleteOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ erro: "Pedido não encontrado" });
            }
            await order.destroy();
            res.status(200).json({ message: "Pedido deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar pedido", error);
            return res.status(500).json({ erro: "Erro ao deletar pedido" });
        }
    }
}


module.exports = new OrderController();