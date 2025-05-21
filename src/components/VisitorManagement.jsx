import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaQrcode } from "react-icons/fa";
import AddAppointmentModal from "./AddAppointmentModal";

export default function VisitorManagement() {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showQRPrompt, setShowQRPrompt] = useState(false);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/visitor-list/");
                if (!res.ok) throw new Error("Failed to fetch visitors");
                const data = await res.json();
                setVisitors(data);
            } catch {
                /* ignore error */
            } finally {
                setLoading(false);
            }
        };
        fetchVisitors();
    }, []);

    const filteredVisitors = visitors.filter((v) => {
        const name = `${v.last_name} ${v.first_name} ${v.middle_initial}`.toLowerCase();
        const purpose = (v.purpose === 'Other' ? v.purpose_other : v.purpose).toLowerCase();
        const department = (v.department === 'Other' ? v.department_other : v.department).toLowerCase();
        return (
            name.includes(searchTerm.toLowerCase()) ||
            purpose.includes(searchTerm.toLowerCase()) ||
            department.includes(searchTerm.toLowerCase())
        );
    });

    // Handler for AddAppointmentModal success
    const handleAddVisitorSuccess = async () => {
        setShowAddModal(false);
        setShowQRPrompt(true);
        // Immediately fetch updated visitors after registration
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/visitor-list/");
            if (res.ok) {
                const data = await res.json();
                setVisitors(data);
            }
        } catch {
            /* ignore error */
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <AddAppointmentModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddVisitorSuccess}
            />
            {/* QR Prompt Modal */}
            {showQRPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                        <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">Visitor Registered!</h3>
                        <p className="mb-6 text-center">Do you want to generate a QR code for this visitor?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowQRPrompt(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                No, Thanks
                            </button>
                            <button
                                onClick={() => setShowQRPrompt(false)}
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                            >
                                Yes, Generate QR (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800 p-2">
                        Total Visitors: {filteredVisitors.length}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        <input
                            type="text"
                            placeholder="Search by name, purpose, or department"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={() => setSearchTerm("")}
                            className="px-3 py-2 rounded-md bg-[#f0f0f0] text-gray-700 text-sm border hover:bg-gray-200"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-1 bg-green-800 text-white px-3 py-2 rounded-md text-sm hover:bg-green-900"
                        >
                            + Add Visitor
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-md overflow-x-auto">
                    <table className="w-full min-w-[700px] text-sm text-left text-gray-700 table-fixed">
                        <thead className="bg-[#e3f1db] text-green-900">
                            <tr>
                                <th className="px-4 py-3 w-1/4">Name</th>
                                <th className="px-4 py-3 w-1/4">Purpose</th>
                                <th className="px-4 py-3 w-1/4">Department</th>
                                <th className="px-4 py-3 w-1/5">Date</th>
                                <th className="px-4 py-3 w-1/5">Time</th>
                                <th className="px-4 py-3 w-1/10 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-6 text-gray-500">Loading...</td></tr>
                            ) : visitors.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-6 text-gray-500">No pre-registered visitors found.</td></tr>
                            ) : (
                                filteredVisitors.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 truncate max-w-[180px]">{v.last_name}, {v.first_name} {v.middle_initial}</td>
                                        <td className="px-4 py-3">{v.purpose === 'Other' ? v.purpose_other : v.purpose}</td>
                                        <td className="px-4 py-3">{v.department === 'Other' ? v.department_other : v.department}</td>
                                        <td className="px-4 py-3">{v.date}</td>
                                        <td className="px-4 py-3">{v.time}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <FaUserEdit
                                                    className="text-2xl text-gray-800 hover:text-blue-700 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
                                                    title="Edit visitor"
                                                // onClick={() => { /* functionality for later */ }}
                                                />
                                                <FaQrcode
                                                    className="text-2xl text-gray-800 hover:text-blue-700 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
                                                    title="Generate QR Code"
                                                // onClick={() => { /* functionality for later */ }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
