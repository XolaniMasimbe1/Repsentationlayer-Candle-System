import API_CONFIG from './config';

class DeliveryApi {
  // Create a new delivery
  async create(deliveryData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/delivery/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Delivery API Error - create:', error);
      throw new Error(error.message || 'Failed to create delivery');
    }
  }

  // Read delivery by delivery number
  async read(deliveryNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/delivery/read/${deliveryNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Delivery API Error - read:', error);
      throw new Error('Failed to fetch delivery');
    }
  }

  // Update delivery
  async update(deliveryData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/delivery/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Delivery API Error - update:', error);
      throw new Error('Failed to update delivery');
    }
  }

  // Get all deliveries
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/delivery/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Delivery API Error - getAll:', error);
      throw new Error('Failed to fetch deliveries');
    }
  }
}

export default new DeliveryApi();
