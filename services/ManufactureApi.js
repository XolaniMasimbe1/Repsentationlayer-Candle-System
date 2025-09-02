import API_CONFIG from './config';

class ManufactureApi {
  // Create a new manufacture
  async create(manufactureData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/manufacture/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manufactureData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Manufacture API Error - create:', error);
      throw new Error('Failed to create manufacture');
    }
  }

  // Read manufacture by manufacturer number
  async read(manufacturerNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/manufacture/read/${manufacturerNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Manufacture API Error - read:', error);
      throw new Error('Failed to fetch manufacture');
    }
  }

  // Update manufacture
  async update(manufactureData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/manufacture/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manufactureData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Manufacture API Error - update:', error);
      throw new Error('Failed to update manufacture');
    }
  }

  // Get all manufactures
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/manufacture/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Manufacture API Error - getAll:', error);
      throw new Error('Failed to fetch manufactures');
    }
  }
}

export default new ManufactureApi();
