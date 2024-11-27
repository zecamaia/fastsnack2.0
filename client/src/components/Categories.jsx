import React from 'react';
import { Link } from 'react-router-dom'
const Categories = ({ categories }) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-6 mt-10'>
            {categories.map((category) => (
                <div key={category.id} className='flex flex-col items-center'>
                    <Link to={`/eventos/categoria/${category.id}`} className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                        <img className="w-16 h-16 rounded-full" src={category.image} alt="imagem-categoria" />
                    </Link>
                    <span className='text-center text-sm font-semibold'>{category.name}</span>
                </div>
            ))
            }
        </div >
    );
}

export default Categories;
