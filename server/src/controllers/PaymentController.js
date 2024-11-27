const stripe = require('stripe')('sk_test_51QL2V2E048WBTF5AJrojLfbxYEZyWTM0KZyQumWgDhKRjsYHAHhFMJ0veli0KYZ5xWjbRit4cLcSo3vQWBlKzfAz00wrqgxcJZ');
class PaymentController {

  async createCheckoutSession(req, res) {
    try {
      const { lineItems, orderId } = req.body;
      
      if (!lineItems || lineItems.length === 0) {
        return res.status(400).json({ error: "Nenhum item adicionado" });
      }

      const formattedLineItems = lineItems.map((item) => {
        return {
          price_data: {
            currency: 'brl',
            product_data: {
              name: item.price_data.product_data.name,
            },
            unit_amount: item.price_data?.unit_amount,
          },
          quantity: item.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: formattedLineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/pagamento-sucesso?sessionId={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5173/',
        metadata: {
          orderId,
        },
      })
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: "Erro ao gerar pagamento" });
    }
  }
}

module.exports = new PaymentController();
