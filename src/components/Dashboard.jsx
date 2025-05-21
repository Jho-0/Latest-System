import { useState, useEffect } from "react";
import { FaUserPlus, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

export default function Dashboard() {
  const [visitors, setVisitors] = useState([]);
  const [activeVisitors, setActiveVisitors] = useState(0);

  useEffect(() => {
    // Fetch active visitors from backend
    const fetchActiveVisitors = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("http://localhost:8000/api/active-visitors/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setActiveVisitors(data.length);
        } else {
          setActiveVisitors(0);
        }
      } catch {
        setActiveVisitors(0);
      }
    };
    fetchActiveVisitors();
  }, []);

  const ADD_VISITOR = (name, time, purpose) => {
    setVisitors((prev) => [...prev, { name, time, purpose }]);
  };

  return (
    <div className="flex flex-col bg-[#f6fdf4]">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col gap-2 p-6 bg-[#d8eed6] border border-green-800 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800"><FaUsers className="text-green-800" />Total Visitors Today</div>
            <p className="text-3xl font-bold text-green-900">{visitors.length}</p>
          </div>

          <div className="flex flex-col gap-2 p-6 bg-[#f1e9d3] border border-green-800 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800"><FaMapMarkerAlt className="text-green-800" />Current Active Visitors</div>
            <p className="text-3xl font-bold text-green-900">{activeVisitors}</p>
          </div>

          <div className="flex flex-col gap-2 p-6 bg-[#c6e1b8] border border-green-800 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800"><FaUserPlus className="text-green-800" />Pre-Registered Visitor</div>
            <p className="text-3xl font-bold text-green-900">0</p>
          </div>
        </div>

        {/* Recent Visits Table */}
        <div className="bg-white border border-green-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#2e2e2e] mb-4">Recent Visits</h2>
          {visitors.length === 0 ? (
            <p className="text-gray-500 italic">No visitors yet.</p>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#cce5ce] text-[#2e2e2e]">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Time In/Out</th>
                  <th className="px-4 py-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor, index) => (
                  <tr key={index} className="border-b bg-white hover:bg-[#eef5e8]">
                    <td className="px-4 py-2">{visitor.name}</td>
                    <td className="px-4 py-2">{visitor.time}</td>
                    <td className="px-4 py-2">{visitor.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-64 w-[calc(100%-16rem)] text-center py-3 bg-[#a4d4a0] text-sm text-[#2e2e2e] font-medium">
        Lacsandile Medical Clinic and Diagnostic Center (LMCDDC)
      </footer>
    </div>
  );
}
