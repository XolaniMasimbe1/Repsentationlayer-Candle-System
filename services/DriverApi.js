import API_CONFIG from './config';

class DriverApi {
  // Create a new driver
  async create(driverData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - create:', error);
      throw new Error(error.message || 'Failed to create driver');
    }
  }

  // Read driver by driver ID
  async read(driverId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/read/${driverId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - read:', error);
      throw new Error('Failed to fetch driver');
    }
  }

  // Update driver
  async update(driverData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - update:', error);
      throw new Error('Failed to update driver');
    }
  }

  // Delete driver
  async delete(driverId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/delete/${driverId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Driver API Error - delete:', error);
      throw new Error('Failed to delete driver');
    }
  }

  // Find driver by license number
  async findByLicenseNumber(licenseNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/find/${licenseNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - findByLicenseNumber:', error);
      throw new Error('Failed to find driver by license number');
    }
  }

  // Get all drivers
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - getAll:', error);
      throw new Error('Failed to fetch drivers');
    }
  }

  // Register a new driver
  async register(driverData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - register:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }

  // Login driver
  async login(driverData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/driver/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Driver API Error - login:', error);
      throw new Error(error.message || 'Login failed');
    }
  }
}

export default new DriverApi();
