import React from 'react';
import { format } from 'date-fns';
import { SlLocationPin, SlCalender } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';



const ListEvents = ({ events }) => {
    if (!events || events.length === 0) {
        return <p className="text-center text-gray-500">Nenhum evento encontrado.</p>; // Mensagem se não houver eventos
    }
    return (
        <div className='grid gap-6 mt-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 cursor-pointer'>
            {events.map((event) => (
                <div key={event.id} className='bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-lg'>
                    <Link to={`/eventos/${event.id}`} >
                        <img
                            src={event.image}
                            alt="imagem_evento"
                            className='w-full h-40 object-cover rounded-lg mb-4'
                        />
                        <div className="text-left">
                            <h3 className="text-2xl font-semibold text-gray-800 truncate">{event.name}</h3>
                            <div className="mt-4 text-md text-gray-500 space-y-1 ">
                                <p className="flex items-center">
                                    <FaRegCalendarAlt className='text-primary' />
                                    <span className='ml-1'>
                                        <span className="font-medium">Dia:</span> {new Intl.DateTimeFormat('pt-BR', { month: 'short', day: '2-digit' }).format(new Date(event.start_date))}
                                    </span>
                                </p>
                                <p className="flex items-center">
                                    <SlLocationPin className='text-primary' />
                                    <span className="ml-1 font-medium">{event.location}</span>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
            }

        </div >
    );
}

export default ListEvents;
