// AddUserModal.jsx
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddUserModal({ isOpen, onClose, refreshUsers }) {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        status: "",
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setFormData({
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            status: "",
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/10" />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold text-green-800 mb-4">Add New User</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                        <div className="flex gap-2">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-1/2 border rounded px-3 py-2 text-sm"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="receptionist">Receptionist</option>
                            </select>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-1/2 border rounded px-3 py-2 text-sm"
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={() => {
                                const emptyFields = Object.entries(formData).filter(
                                    // eslint-disable-next-line no-unused-vars
                                    ([key, value]) => value.trim() === ""
                                );
                                if (emptyFields.length > 0) {
                                    toast.error("Please fill in all fields");
                                    return;
                                }

                                if (formData.role === "Select Role" || formData.status === "Select Status") {
                                    toast.error("Please select a valid role and status");
                                    return;
                                }

                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(formData.email)) {
                                    toast.error("Please enter a valid email address");
                                    return;
                                }
                                setShowConfirm(true);
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => {
                                handleClear();
                                onClose();
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Cancel

                        </button>
                        <button
                            onClick={() => {
                                handleClear();
                            }}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Clear

                        </button>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
                    <div className="bg-white p-6 rounded-md w-[400px] shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-red-600">Confirm User Addition</h2>
                        <p>Are you sure you want to add this user?</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        const token = localStorage.getItem("access_token");
                                        const res = await fetch("http://localhost:8000/api/create-user/", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify({
                                                username: formData.username,
                                                first_name: formData.firstName,
                                                last_name: formData.lastName,
                                                email: formData.email,
                                                password: formData.password,
                                                role: formData.role.toLowerCase(),
                                                is_active: formData.status === "Active",
                                            }),
                                        });

                                        if (!res.ok) {
                                            const err = await res.json();
                                            throw new Error(JSON.stringify(err));
                                        }

                                        await res.json();
                                        toast.success("User added successfully");
                                        await refreshUsers();
                                        handleClear();
                                        onClose();
                                        setShowConfirm(false);
                                    } catch (error) {
                                        console.error(error);
                                        toast.error("Failed to add user");
                                    }
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}