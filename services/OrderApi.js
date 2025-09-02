/**
 * Order API Service for Candle System
 * 
 * This service handles all order-related API operations including CRUD operations
 * and complete order creation with all related entities.
 * 
 * References:
 * - React Native Fetch API: https://reactnative.dev/docs/network
 * - RESTful API Design: https://restfulapi.net/
 * - Error Handling in React Native: https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - Async/Await Best Practices: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * 
 * YouTube Tutorials Referenced:
 * - "React Native API Calls with Fetch" by Programming with Mosh
 * - "Async/Await in JavaScript" by The Net Ninja
 * - "Error Handling in React Native" by Codevolution
 * - "RESTful API Integration" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * 
 * Baeldung References:
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 * - https://www.baeldung.com/spring-boot-json
 */
import API_CONFIG from './config';

class OrderApi {
  // Create a new order
  async create(orderData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Order API Error - create:', error);
      throw new Error(error.message || 'Failed to create order');
    }
  }

  // Read order by order number
  async read(orderNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/read/${orderNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Order API Error - read:', error);
      throw new Error('Failed to fetch order');
    }
  }

  // Update order
  async update(orderData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Order API Error - update:', error);
      throw new Error('Failed to update order');
    }
  }

  // Find order by order number
  async findByOrderNumber(orderNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/find/${orderNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Order API Error - findByOrderNumber:', error);
      throw new Error('Failed to find order');
    }
  }

  // Get all orders
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Order API Error - getAll:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  // Get orders by store number
  async getOrdersByStoreNumber(storeNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/store/${storeNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Order API Error - getOrdersByStoreNumber:', error);
      throw new Error('Failed to fetch orders by store');
    }
  }

  // Update order status
  async updateOrderStatus(orderNumber, status) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/order/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderNumber, orderStatus: status }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Order API Error - updateOrderStatus:', error);
      throw new Error('Failed to update order status');
    }
  }

  // Create complete order with all related entities (matches backend structure)
  async createCompleteOrder(orderData) {
    try {
      console.log('Creating complete order with data:', orderData);
      
      // Import the specific APIs
      const { DeliveryApi, InvoiceApi, PaymentMethodApi, PaymentApi } = await import('./index.js');
      
      // Create delivery with ONLY the fields the backend accepts
      let delivery;
      try {
        const deliveryData = {
          status: 'Pending'
        };
        
        console.log('Creating delivery with data:', deliveryData);
        delivery = await DeliveryApi.create(deliveryData);
        console.log('Delivery created successfully:', delivery);
      } catch (deliveryError) {
        console.log('Delivery creation failed:', deliveryError.message);
        throw new Error(`Delivery creation failed: ${deliveryError.message}`);
      }

      // Create invoice with ONLY the fields the backend accepts
      const invoiceData = {
        totalAmount: orderData.totalAmount
      };
      
      console.log('Creating invoice with data:', invoiceData);
      const invoice = await InvoiceApi.create(invoiceData);
      console.log('Invoice created successfully:', invoice);

      // Create payment method with ONLY the fields the backend accepts
      const paymentMethodData = {
        type: orderData.paymentType || 'CASH'
      };
      
      console.log('Creating payment method with data:', paymentMethodData);
      const paymentMethod = await PaymentMethodApi.create(paymentMethodData);
      console.log('Payment method created successfully:', paymentMethod);

      // Create payment with ONLY the fields the backend accepts
      const paymentData = {
        totalAmount: orderData.totalAmount,
        paymentMethod: paymentMethod
      };
      
      console.log('Creating payment with data:', paymentData);
      const payment = await PaymentApi.create(paymentData);
      console.log('Payment created successfully:', payment);

      // Create order with all related entities (matches backend Order entity structure)
      const completeOrderData = {
        orderStatus: 'Pending',
        retailStore: orderData.retailStore,
        orderItems: orderData.orderItems,
        delivery: delivery,
        invoice: invoice,
        payment: payment
        // Note: orderNumber and orderDate are auto-generated by backend
      };
      
      console.log('Creating order with complete data:', completeOrderData);
      const order = await this.create(completeOrderData);
      console.log('Order created successfully:', order);
      
      return order;
    } catch (error) {
      console.error('Error creating complete order:', error);
      throw new Error('Failed to create complete order: ' + error.message);
    }
  }
}

export default new OrderApi();
