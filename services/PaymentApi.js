import API_CONFIG from './config';

class PaymentApi {
  // Create a new payment
  async create(paymentData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Payment API Error - create:', error);
      throw new Error(error.message || 'Failed to create payment');
    }
  }

  // Read payment by payment number
  async read(paymentNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment/read/${paymentNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Payment API Error - read:', error);
      throw new Error('Failed to fetch payment');
    }
  }

  // Update payment
  async update(paymentData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Payment API Error - update:', error);
      throw new Error('Failed to update payment');
    }
  }

  // Get all payments
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Payment API Error - getAll:', error);
      throw new Error('Failed to fetch payments');
    }
  }
}

export default new PaymentApi();
