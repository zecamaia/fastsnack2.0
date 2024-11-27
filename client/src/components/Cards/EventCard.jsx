import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ evento }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer">
            <Link to={`/eventos/${evento.id}`} className="flex flex-col h-full">
                <img
                    src={evento.image}
                    alt="imagem_evento"
                    className="w-full h-48 object-cover rounded-t-lg mb-4 sm:h-40 md:h-48 lg:h-56"
                />
                <div className="text-left flex-grow">
                    <h3 className="text-2xl font-semibold text-gray-800 truncate">{evento.name}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">{evento.description}</p>
                    <div className="mt-4 text-sm text-gray-500 space-y-1">
                        <p><span className="font-medium">Início:</span> {format(new Date(evento.start_date), 'dd/MM/yyyy')}</p>
                        <p><span className="font-medium">Fim:</span> {format(new Date(evento.end_date), 'dd/MM/yyyy')}</p>
                        <p><span className="font-medium">Local:</span> {evento.location}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="py-2 bg-red-600 text-white font-semibold rounded-lg text-center">
                        Saiba mais
                    </div>
                </div>
            </Link>
        </div>


    );
}

export default EventCard;
