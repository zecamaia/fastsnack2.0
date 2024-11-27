import { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import ListEvents from "../../components/ListEvents";
import Slider from "../../components/Slider";
import api from "../../../services/axios";
import { showErrorAlert } from "../../components/Dialog";


const Evento = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('api/eventos')
                setEvents(response.data);
            } catch (error) {
                showErrorAlert(error.message)
            }
        }
        const fetchCategories = async () => {
            try {
                const response = await api.get('api/categoria-eventos')
                setCategories(response.data);
            } catch (error) {
                showErrorAlert(error.message)
            }
        }
        fetchEvents();
        fetchCategories();
    }, []);
    return (
        <div>
            <div className="max-w-screen-lg mx-auto p-4 mt-36">
                <h2 className="text-3xl text-primary font-bold text-center sm:text-3xl md:text-3xl">Os melhores eventos você encontra aqui!</h2>
                <Categories categories={categories} />
            </div>

            <div className="w-full">
                <Slider />
            </div>

            <div className="max-w-screen-lg mx-auto p-4">
                <ListEvents events={events} />
            </div>
        </div>
    )

}

export default Evento;