import React from 'react';
import { User, Mail, Phone, Building, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/user/${user.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(user.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group border border-gray-100 hover:border-blue-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>
        <button
          onClick={handleDeleteClick}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 p-1"
          title="Delete user"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-3 text-blue-500" />
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="h-4 w-4 mr-3 text-green-500" />
          <span className="text-sm">{user.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Building className="h-4 w-4 mr-3 text-purple-500" />
          <span className="text-sm">{user.company}</span>
        </div>
        {user.address && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-red-500" />
            <span className="text-sm">{user.address.city}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-blue-600 font-medium">Click to view details →</span>
      </div>
    </div>
  );
};

export default UserCard;