import API_CONFIG from './config';

class InvoiceApi {
  // Create a new invoice
  async create(invoiceData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/invoice/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Invoice API Error - create:', error);
      throw new Error(error.message || 'Failed to create invoice');
    }
  }

  // Read invoice by invoice number
  async read(invoiceNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/invoice/read/${invoiceNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Invoice API Error - read:', error);
      throw new Error('Failed to fetch invoice');
    }
  }

  // Update invoice
  async update(invoiceData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/invoice/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Invoice API Error - update:', error);
      throw new Error('Failed to update invoice');
    }
  }

  // Find invoice by invoice number
  async findByInvoiceNumber(invoiceNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/invoice/find/${invoiceNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Invoice API Error - findByInvoiceNumber:', error);
      throw new Error('Failed to find invoice');
    }
  }

  // Get all invoices
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/invoice/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Invoice API Error - getAll:', error);
      throw new Error('Failed to fetch invoices');
    }
  }
}

export default new InvoiceApi();
