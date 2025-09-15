import React, { useEffect, useState } from 'react';
import { Plus, Users, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const { users, loading, error, fetchUsers, createUser, deleteUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (userData) => {
    await createUser(userData);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      alert('Error deleting user. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-600">Manage your users and their information</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
          />
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New User
          </button>
        </div>

        {/* Details */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {searchTerm ? filteredUsers.length : users.length}
                  {searchTerm && <span className="text-sm font-normal text-gray-500 ml-2">
                    (filtered from {users.length})
                  </span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Users Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No users found' : 'No users yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? `No users match "${searchTerm}". Try a different search term.`
                : 'Get started by creating your first user.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create First User
              </button>
            )}
          </div>
        )}

        {/* User Modal */}
        {showForm && (
          <UserForm
            onClose={() => setShowForm(false)}
            onSubmit={handleCreateUser}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;