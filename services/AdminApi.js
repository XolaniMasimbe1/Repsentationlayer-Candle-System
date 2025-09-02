import API_CONFIG from './config';

class AdminApi {
  // Create a new admin
  async create(adminData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - create:', error);
      throw new Error(error.message || 'Failed to create admin');
    }
  }

  // Read admin by admin ID
  async read(adminId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/read/${adminId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - read:', error);
      throw new Error('Failed to fetch admin');
    }
  }

  // Update admin
  async update(adminData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - update:', error);
      throw new Error('Failed to update admin');
    }
  }

  // Delete admin
  async delete(adminId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/delete/${adminId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Admin API Error - delete:', error);
      throw new Error('Failed to delete admin');
    }
  }

  // Find admin by username
  async findByUsername(username) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/find/username/${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - findByUsername:', error);
      throw new Error('Failed to find admin by username');
    }
  }

  // Find admin by email
  async findByEmail(email) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/find/email/${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - findByEmail:', error);
      throw new Error('Failed to find admin by email');
    }
  }

  // Get all admins
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - getAll:', error);
      throw new Error('Failed to fetch admins');
    }
  }

  // Register a new admin
  async register(adminData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - register:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }

  // Login admin
  async login(adminData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Admin API Error - login:', error);
      throw new Error(error.message || 'Login failed');
    }
  }
}

export default new AdminApi();
