import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function User({ users, positions }) {
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    
    const { data, setData, post, put, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        position_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingUser) {
            // Update existing user
            put(route('users.update', editingUser.id), {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                    setEditingUser(null);
                }
            });
        } else {
            // Create new user
            post(route('users.store'), {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                }
            });
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            position_id: user.position_id || '',
        });
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingUser(null);
        reset();
        setShowForm(true);
    };

    const handleCancel = () => {
        setEditingUser(null);
        reset();
        setShowForm(false);
    };

    const handleDelete = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', userId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        User Management
                    </h2>
                    <button 
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 mb-4 mt-2"
                        onClick={handleAdd}
                    >
                        Add User
                    </button>
                </>
            }
        >
            <Head title="User" />

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
                                    {editingUser ? `Edit User: ${editingUser.name}` : 'Add New User'}
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
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password {editingUser && '(leave blank to keep current password)'}
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required={!editingUser}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                                            Position
                                        </label>
                                        <select
                                            id="position"
                                            name="position_id"
                                            value={data.position_id}
                                            onChange={(e) => setData('position_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Select a position</option>
                                            {positions && positions.length > 0 &&
                                                positions.map((position) => (
                                                    <option key={position.id} value={position.id}>
                                                        {position.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                        >
                                            Save User
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
                            <p>You're logged in!</p>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">#</th>
                                        <th className="text-left p-2">Name</th>
                                        <th className="text-left p-2">Email</th>
                                        <th className="text-left p-2">Position</th>
                                        <th className="text-left p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">{user.name}</td>
                                                <td className="p-2">{user.email}</td>
                                                <td className="p-2">{user.position?.name}</td>
                                                <td className="p-2 space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(user.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-2 text-center text-gray-500">
                                                No users found
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
