const checkTicketOwner = async (req, res, next) => {
  const { userId, eventId } = req.params;
  const ticket = await Ticket.findOne({ where: { userId, eventId, status: 'confirmado' } });
  if (ticket) {
    return next();
  }
  return res.status(403).json({ error: "Acesso negado. Ingresso não confirmado ou não encontrado." });

}

module.exports = checkTicketOwner;
