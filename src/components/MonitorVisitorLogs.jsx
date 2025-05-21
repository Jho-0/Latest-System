import { useState } from "react";
import { FaFilter } from "react-icons/fa";

export default function MonitorVisitorLogs() {
    const [searchTerm, setSearchTerm] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [visitors, setVisitors] = useState([]);

    const filteredVisitors = visitors.filter((visitor) =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-grow min-h-screen bg-[#f6fdf4] overflow-hidden">
            {/* Main content without border */}
            <div className="flex-grow w-full bg-[#f6fdf4]">
                <div className="bg-[#f6fdf4] rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 h2 className="text-lg font-bold text-gray-800 p-2">
                            Total Visitors Today: {filteredVisitors.length}
                        </h2>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="flex items-center gap-1 bg-[#bde5b4] text-green-800 border border-green-600 px-3 py-2 rounded-md text-sm hover:bg-[#a4dba4]">
                                <FaFilter />Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-md shadow-sm">
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="bg-[#e3f1db] text-gray-800">
                                <tr>
                                    <th className="px-4 py-3">Visitor Name</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Time In</th>
                                    <th className="px-4 py-3">Time Out</th>
                                    <th className="px-4 py-3">Department Visited</th>
                                    <th className="px-4 py-3">Current Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVisitors.length > 0 ? (
                                    filteredVisitors.map((visitor, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{visitor.name}</td>
                                            <td className="px-4 py-2">{visitor.date}</td>
                                            <td className="px-4 py-2">{visitor.timeIn}</td>
                                            <td className="px-4 py-2">{visitor.timeOut}</td>
                                            <td className="px-4 py-2">{visitor.department}</td>
                                            <td className="px-4 py-2">{visitor.location}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">No visitors found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                            <div className="ml-2">Results: 1-{filteredVisitors.length} of {filteredVisitors.length}</div>
                            <div className="flex gap-1">
                                <button className="px-2 py-1 bg-white border rounded hover:bg-gray-100">&lt;</button>
                                <button className="px-3 py-1 bg-green-200 border rounded font-semibold">1</button>
                                <button className="px-2 py-1 bg-white border rounded hover:bg-gray-100">...</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="fixed bottom-0 left-64 w-[calc(100%-16rem)] text-center py-3 bg-[#a4d4a0] text-sm text-[#2e2e2e] font-medium">
                    Lacsandile Medical Clinic and Diagnostic Center (LMCDDC)
                </footer>
            </div>
        </div>
    );
}
