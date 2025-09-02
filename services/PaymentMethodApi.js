import API_CONFIG from './config';

class PaymentMethodApi {
  // Create a new payment method
  async create(paymentMethodData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment-method/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethodData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('PaymentMethod API Error - create:', error);
      throw new Error(error.message || 'Failed to create payment method');
    }
  }

  // Read payment method by ID
  async read(paymentMethodId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment-method/read/${paymentMethodId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('PaymentMethod API Error - read:', error);
      throw new Error('Failed to fetch payment method');
    }
  }

  // Update payment method
  async update(paymentMethodData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment-method/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethodData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('PaymentMethod API Error - update:', error);
      throw new Error('Failed to update payment method');
    }
  }

  // Get all payment methods
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/payment-method/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('PaymentMethod API Error - getAll:', error);
      throw new Error('Failed to fetch payment methods');
    }
  }
}

export default new PaymentMethodApi();
