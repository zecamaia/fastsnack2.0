import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrorAlert } from '../../components/Dialog';
import api from '../../../services/axios';
import EventCard from '../../components/Cards/EventCard';
import Spinner from '../../components/Spinner';

const EventCategory = () => {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [categoryName, setCategoryName] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEventsByCategory = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`api/categoria-eventos/${id}`);
                setEvents(response.data.categoriaEvento);
                setCategoryName(response.data.name)
            } catch (error) {
                showErrorAlert("Erro ao buscar eventos da categoria")
            } finally {
                setIsLoading(false)
            }
        }
        fetchEventsByCategory();
    }, [id])

    if (isLoading) return <Spinner />
    return (
        <div className='max-w-screen-xl mx-auto p-4 mt-36'>
            <h1 className='text-gray-900 font-bold text-4xl px-4'>{categoryName}</h1>
            <div className="grid gap-6 mt-10 mx-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {events.length > 0 ? (
                    events.map((event) => (
                        <EventCard key={event.id} evento={event} />
                    ))
                ) : (
                    <div className=''>
                        <p className='font-medium text-xl text-slate-600'>Nenhum evento encontrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventCategory;
