import API_CONFIG from './config';

class OrderItemApi {
  // Create a new order item
  async create(orderItemData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/orderItem/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItemData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('OrderItem API Error - create:', error);
      throw new Error('Failed to create order item');
    }
  }

  // Read order item by ID
  async read(id) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/orderItem/read/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('OrderItem API Error - read:', error);
      throw new Error('Failed to fetch order item');
    }
  }

  // Update order item
  async update(orderItemData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/orderItem/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItemData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('OrderItem API Error - update:', error);
      throw new Error('Failed to update order item');
    }
  }

  // Get all order items
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/orderItem/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('OrderItem API Error - getAll:', error);
      throw new Error('Failed to fetch order items');
    }
  }
}

export default new OrderItemApi();
