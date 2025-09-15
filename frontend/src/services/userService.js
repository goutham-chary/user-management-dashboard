const API_BASE_URL =
  "https://user-management-dashboard-eh6v.onrender.com/api/users";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const userService = {
  getAllUsers: async () => {
    const response = await fetch(API_BASE_URL);
    return handleResponse(response);
  },

  getUserById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse(response);
  },

  createUser: async (userData) => {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
