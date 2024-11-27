const { EventCategory, Event } = require('../../models/');

class EventCategoryController {

    async createEventCategory(req, res) {
        try {
            const newEventCategory = req.body;
            const { name, image } = newEventCategory;
            const eventCategory = await EventCategory.create({
                name,
                image
            });
            res.status(201).json({ status: 200, eventCategory });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao criar categoria de evento." })
        }
    }
    async getAllEventCategories(req, res) {
        try {
            const eventsCategories = await EventCategory.findAll();
            res.status(200).json(eventsCategories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar categoria de evento." })
        }
    }
    async getEventCategoryById(req, res) {
        try {
            const eventCategory = await EventCategory.findByPk(req.params.id, {
                include: [{
                    model: Event,
                    as: 'categoriaEvento'
                }]
            });

            if (!eventCategory) {
                return res.status(404).json({ erro: "Categoria de evento não encontrada" });
            }
            res.status(200).json(eventCategory)
        } catch (error) {
            console.log(error);

            return res.status(500).json({ erro: "Erro ao mostrar categoria de evento." })
        }
    }
    async updateEventCategory(req, res) {
        try {

        } catch (error) {

        }
    }
    async deleteEventCategory(req, res) {
        try {

        } catch (error) {

        }
    }
}

module.exports = new EventCategoryController(); 