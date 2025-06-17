import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBugs } from '../services/bugService';
import BugFilter from '../components/BugFilter';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    project: ''
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const { data } = await getBugs();
        setBugs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredBugs = bugs.filter(bug => {
    return (
      (filters.status === '' || bug.status === filters.status) &&
      (filters.priority === '' || bug.priority === filters.priority) &&
      (filters.project === '' || bug.project._id === filters.project)
    );
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bug List</h1>
        {currentUser && (
          <Link 
            to="/bugs/new" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Report New Bug
          </Link>
        )}
      </div>

      <BugFilter filters={filters} onChange={handleFilterChange} />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBugs.length > 0 ? (
              filteredBugs.map(bug => (
                <tr key={bug._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/bugs/${bug._id}`} className="text-blue-500 hover:underline">
                      {bug.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{bug.project?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${bug.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 
                        bug.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        bug.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {bug.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${bug.priority === 'Low' ? 'bg-green-100 text-green-800' : 
                        bug.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        bug.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {bug.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{bug.assignedTo?.name || 'Unassigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/bugs/${bug._id}/edit`} 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No bugs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugList;