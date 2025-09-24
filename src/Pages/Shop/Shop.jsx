import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa6";
import Itemcard from '../Itemcard/Itemcard';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Shop = () => {
    const [items, setItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const allCategories = ['eyeglasses', 'sunglasses', 'powerglass', 'kidsglass'];
    const allShapes = ['Round', 'Rectangle', 'Square', 'Cat-Eye', 'Geometric'];

    useEffect(() => {
        let url = `http://localhost:5000/allitems?${new URLSearchParams(searchParams).toString()}`;
        
        axios.get(url)
            .then(res => {
                setItems(res.data);
            })
            .catch(error => {
                console.error("Error fetching the items:", error);
            });
    }, [searchParams]);

    const handleFilterClick = (type, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (type === 'sort') {
            newParams.set('sort', value);
        } else if (type === 'category') {
            if (newParams.get('category') === value) {
                newParams.delete('category');
            } else {
                newParams.set('category', value);
                newParams.delete('shape');
            }
        } else if (type === 'shape') {
            if (newParams.get('shape') === value) {
                newParams.delete('shape');
            } else {
                newParams.set('shape', value);
                newParams.delete('category');
            }
        }
        setSearchParams(newParams);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (query) {
            newParams.set('search', query);
        } else {
            newParams.delete('search');
        }
        setSearchParams(newParams);
    };

    // Get the currently selected category and shape from the URL
    const selectedCategory = searchParams.get('category');
    const selectedShape = searchParams.get('shape');

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content space-y-12">
                    <div className='flex justify-between'>
                        <div><label htmlFor="my-drawer" className="btn btn-primary drawer-button">Filter <FaFilter /></label></div>
                        <div>
                            <input
                                type="text"
                                placeholder="What Are U Looking For?"
                                className="input input-md w-80"
                                onChange={handleSearch}
                                defaultValue={searchParams.get('search') || ''}
                            />
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {items.length > 0 ? (
                            items.map(item => <Itemcard key={item._id} item={item} />)
                        ) : (
                            <p className="text-center col-span-full text-xl font-semibold">No items found matching your criteria. 😟</p>
                        )}
                    </div>
                    
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <h1 className="font-bold mb-2">Frame Shape</h1>
                        {allShapes.map(shape => (
                            <li key={shape}>
                                <button
                                    className={`w-full text-left ${selectedShape === shape ? "font-bold text-[#329c92]" : ""}`}
                                    onClick={() => handleFilterClick('shape', shape)}
                                >
                                    {shape}
                                </button>
                            </li>
                        ))}
                        <div className="divider"></div>
                        <h1 className="font-bold mt-4 mb-2">Category</h1>
                        {allCategories.map(cat => (
                            <li key={cat}>
                                <button
                                    className={`w-full text-left ${selectedCategory === cat ? "font-bold text-[#329c92]" : ""}`}
                                    onClick={() => handleFilterClick('category', cat)}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            </li>
                        ))}
                        <div className="divider"></div>
                        <li className="menu-title">Sort by Price</li>
                        <li>
                            <button onClick={() => handleFilterClick('sort', 'low_to_high')} className={`w-full text-left ${searchParams.get('sort') === 'low_to_high' ? 'font-bold text-[#329c92]' : ''}`}>
                                Price: Low to High
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleFilterClick('sort', 'high_to_low')} className={`w-full text-left ${searchParams.get('sort') === 'high_to_low' ? 'font-bold text-[#329c92]' : ''}`}>
                                Price: High to Low
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Shop;