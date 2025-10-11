import React from 'react';
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import usePublicAxios from '../../Hooks/usePubliceAxios';
import { Link } from 'react-router-dom';
import useItems from '../../Hooks/useItems';
import { toast } from 'react-toastify';

const ManageItems = () => {
    const axiosinstance = usePublicAxios();
    const [items, refetch] = useItems(); 

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosinstance.delete(`allitems/${item._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success(`${item.name} has been deleted.`)
                    }
                });
            }
        });
    }

    return (
        <div className='space-y-12 max-w-5xl mx-auto mt-10'>
            <h2 className="text-2xl font-bold text-fuchsia-700 mb-6 text-center">
                MANAGE ALL GLASSES
            </h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
                <table className="table-auto w-full text-left border-collapse">
                    <thead className='bg-gradient-to-r from-fuchsia-600 via-pink-500 to-indigo-600 text-white'>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Images</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Update</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="avatar"> <div className="mask mask-squircle w-20"> <img src={item.images?.[0]} alt={item.name} /> </div> </td>
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.price}tk</td>
                                <td className="px-4 py-2">
                                    <Link to={`/dashboard/updateglass/${item._id}`}>
                                        <button className='btn bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg flex items-center gap-1'>
                                            <RiEdit2Line /> Edit
                                        </button>
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <button onClick={() => handleDelete(item)} className='btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1'>
                                        <RiDeleteBin5Line /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
