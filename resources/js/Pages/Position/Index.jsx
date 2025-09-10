import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Position({ positions }) {
    const [showForm, setShowForm] = useState(false);
    const [editingPosition, setEditingPosition] = useState(null);
    
    const { data, setData, post, put, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingPosition) {
            // Update existing position
            put(route('positions.update', editingPosition.id), {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                    setEditingPosition(null);
                }
            });
        } else {
            // Create new position
            post(route('positions.store'), {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                }
            });
        }
    };

    const handleEdit = (position) => {
        setEditingPosition(position);
        setData({
            name: position.name,
            description: position.description || '',
        });
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingPosition(null);
        reset();
        setShowForm(true);
    };

    const handleCancel = () => {
        setEditingPosition(null);
        reset();
        setShowForm(false);
    };

    const handleDelete = (positionId) => {
        if (confirm('Are you sure you want to delete this position?')) {
            router.delete(route('positions.destroy', positionId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Position Management
                    </h2>
                    <button 
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 mb-4 mt-2" 
                        onClick={handleAdd}
                    >
                        Add Position
                    </button>
                </>
            }
        >
            <Head title="Position" />

            {errors && Object.keys(errors).length > 0 && (
                <div className="pt-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            {Object.keys(errors).length > 0 && (
                                <div className="flex items-center bg-red-300 text-red-900 text-sm font-bold px-4 py-3" role="alert">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                                    <div>
                                        <p className="font-bold">Please fix the following errors:</p>
                                        <ul className="mt-1 list-disc list-inside">
                                            {Object.entries(errors).map(([field, message]) => (
                                                <li key={field}>{message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            

            {showForm && (
                <div className="pt-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-medium mb-4">
                                    {editingPosition ? `Edit Position: ${editingPosition.name}` : 'Add New Position'}
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="3"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                        >
                                            Save
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Position List</h3>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">#</th>
                                        <th className="text-left p-2">Name</th>
                                        <th className="text-left p-2">Description</th>
                                        <th className="text-left p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {positions && positions.length > 0 ? (
                                        positions.map((position, index) => (
                                            <tr key={position.id} className="border-b hover:bg-gray-50">
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">{position.name}</td>
                                                <td className="p-2">{position.description || 'No description'}</td>
                                                <td className="p-2 space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(position)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(position.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-2 text-center text-gray-500">
                                                No positions found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
