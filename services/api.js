const BASE_URL = 'http://192.168.240.224:8080/CandleSystem';

class ApiService {
  // Authentication endpoints
  async login(username, password) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }
      
      return await response.text();
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Network error');
    }
  }

  async registerStore(storeData) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }

  // Product management
  async getAllProducts() {
    try {
      const response = await fetch(`${BASE_URL}/product/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      
      // Transform products to include default image and rating
      return products.map(product => ({
        ...product,
        image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5,
        inCart: false
      }));
    } catch (error) {
      console.error('API Error - getAllProducts:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductByNumber(productNumber) {
    try {
      const response = await fetch(`${BASE_URL}/product/read/${productNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return {
        ...product,
        image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5
      };
    } catch (error) {
      console.error('API Error - getProductByNumber:', error);
      throw new Error('Failed to fetch product');
    }
  }

  async createProduct(productData) {
    try {
      const response = await fetch(`${BASE_URL}/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - createProduct:', error);
      throw new Error('Failed to create product');
    }
  }

  async updateProduct(productData) {
    try {
      const response = await fetch(`${BASE_URL}/product/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - updateProduct:', error);
      throw new Error('Failed to update product');
    }
  }

  // Order management
  async createOrder(orderData) {
    try {
      const response = await fetch(`${BASE_URL}/order/create`, {
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
      console.error('API Error - createOrder:', error);
      throw new Error(error.message || 'Failed to create order');
    }
  }

  async getOrderByNumber(orderNumber) {
    try {
      const response = await fetch(`${BASE_URL}/order/read/${orderNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getOrderByNumber:', error);
      throw new Error('Failed to fetch order');
    }
  }

  async updateOrderStatus(orderNumber, status) {
    try {
      const response = await fetch(`${BASE_URL}/order/update`, {
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
      console.error('API Error - updateOrderStatus:', error);
      throw new Error('Failed to update order status');
    }
  }

  async getOrdersByStore(storeNumber) {
    try {
      const response = await fetch(`${BASE_URL}/order/store/${storeNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getOrdersByStore:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  async getAllOrders() {
    try {
      const response = await fetch(`${BASE_URL}/order/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllOrders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  // Payment management
  async createPayment(paymentData) {
    try {
      const response = await fetch(`${BASE_URL}/payment/create`, {
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
      console.error('API Error - createPayment:', error);
      throw new Error(error.message || 'Failed to create payment');
    }
  }

  async getPaymentByNumber(paymentNumber) {
    try {
      const response = await fetch(`${BASE_URL}/payment/read/${paymentNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getPaymentByNumber:', error);
      throw new Error('Failed to fetch payment');
    }
  }

  async getAllPayments() {
    try {
      const response = await fetch(`${BASE_URL}/payment/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllPayments:', error);
      throw new Error('Failed to fetch payments');
    }
  }

  // Invoice management
  async createInvoice(invoiceData) {
    try {
      const response = await fetch(`${BASE_URL}/invoice/create`, {
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
      console.error('API Error - createInvoice:', error);
      throw new Error(error.message || 'Failed to create invoice');
    }
  }

  async getInvoiceByNumber(invoiceNumber) {
    try {
      const response = await fetch(`${BASE_URL}/invoice/read/${invoiceNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getInvoiceByNumber:', error);
      throw new Error('Failed to fetch invoice');
    }
  }

  async getAllInvoices() {
    try {
      const response = await fetch(`${BASE_URL}/invoice/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllInvoices:', error);
      throw new Error('Failed to fetch invoices');
    }
  }

  // Delivery management
  async createDelivery(deliveryData) {
    try {
      const response = await fetch(`${BASE_URL}/delivery/create`, {
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
      console.error('API Error - createDelivery:', error);
      throw new Error(error.message || 'Failed to create delivery');
    }
  }

  async getDeliveryByNumber(deliveryNumber) {
    try {
      const response = await fetch(`${BASE_URL}/delivery/read/${deliveryNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getDeliveryByNumber:', error);
      throw new Error('Failed to fetch delivery');
    }
  }

  async getAllDeliveries() {
    try {
      const response = await fetch(`${BASE_URL}/delivery/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllDeliveries:', error);
      throw new Error('Failed to fetch deliveries');
    }
  }

  // Manufacturer management
  async getAllManufactures() {
    try {
      const response = await fetch(`${BASE_URL}/manufacture/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllManufactures:', error);
      throw new Error('Failed to fetch manufacturers');
    }
  }

  async getManufactureById(manufacturerNumber) {
    try {
      const response = await fetch(`${BASE_URL}/manufacture/read/${manufacturerNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getManufactureById:', error);
      throw new Error('Failed to fetch manufacturer');
    }
  }

  async createManufacture(manufactureData) {
    try {
      const response = await fetch(`${BASE_URL}/manufacture/create`, {
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
      console.error('API Error - createManufacture:', error);
      throw new Error('Failed to create manufacturer');
    }
  }

  // Payment method management
  async createPaymentMethod(paymentMethodData) {
    try {
      const response = await fetch(`${BASE_URL}/payment-method/create`, {
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
      console.error('API Error - createPaymentMethod:', error);
      throw new Error(error.message || 'Failed to create payment method');
    }
  }

  async getPaymentMethodById(paymentMethodId) {
    try {
      const response = await fetch(`${BASE_URL}/payment-method/read/${paymentMethodId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getPaymentMethodById:', error);
      throw new Error('Failed to fetch payment method');
    }
  }

  async getAllPaymentMethods() {
    try {
      const response = await fetch(`${BASE_URL}/payment-method/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllPaymentMethods:', error);
      throw new Error('Failed to fetch payment methods');
    }
  }

  // Store management
  async getStoreByNumber(storeNumber) {
    try {
      const response = await fetch(`${BASE_URL}/store/read/${storeNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getStoreByNumber:', error);
      throw new Error('Failed to fetch store');
    }
  }

  async getAllStores() {
    try {
      const response = await fetch(`${BASE_URL}/store/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllStores:', error);
      throw new Error('Failed to fetch stores');
    }
  }

  // User management
  async getUserById(userId) {
    try {
      const response = await fetch(`${BASE_URL}/user/read/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getUserById:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async getUserByUsername(username) {
    try {
      const response = await fetch(`${BASE_URL}/user/find/${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getUserByUsername:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async getAllUsers() {
    try {
      const response = await fetch(`${BASE_URL}/user/getAll`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error - getAllUsers:', error);
      throw new Error('Failed to fetch users');
    }
  }

  // Utility methods
  async checkConnection() {
    try {
      const response = await fetch(`${BASE_URL}/product/all`, { 
        method: 'HEAD',
        timeout: 5000 
      });
      return response.ok;
    } catch (error) {
      console.error('Connection check failed:', error);
      return false;
    }
  }

  // Helper method to create complete order with all related entities
  async createCompleteOrder(orderData) {
    try {
      console.log('Creating complete order with data:', orderData);
      
      // Create delivery with ONLY the fields the backend accepts
      let delivery;
      try {
        const deliveryData = {
          status: 'Pending'
          // Only send status - deliveryNumber is auto-generated by backend
          // Remove deliveryDate and retailStore - they don't exist in backend entity
        };
        
        console.log('Creating delivery with data:', deliveryData);
        delivery = await this.createDelivery(deliveryData);
        console.log('Delivery created successfully:', delivery);
      } catch (deliveryError) {
        console.log('Delivery creation failed:', deliveryError.message);
        throw new Error(`Delivery creation failed: ${deliveryError.message}`);
      }

      // Create invoice with ONLY the fields the backend accepts
      const invoiceData = {
        totalAmount: orderData.totalAmount
        // Only send totalAmount - invoiceNumber is auto-generated by backend
        // Remove invoiceDate and retailStore - they don't exist in backend entity
      };
      
      console.log('Creating invoice with data:', invoiceData);
      const invoice = await this.createInvoice(invoiceData);
      console.log('Invoice created successfully:', invoice);

      // Create payment method with ONLY the fields the backend accepts
      const paymentMethodData = {
        type: orderData.paymentType || 'CASH',
        // Only send type - paymentMethodId is auto-generated by backend
        // Remove paymentDate - it doesn't exist in backend entity
      };
      
      console.log('Creating payment method with data:', paymentMethodData);
      const paymentMethod = await this.createPaymentMethod(paymentMethodData);
      console.log('Payment method created successfully:', paymentMethod);

      // Create payment with ONLY the fields the backend accepts
      const paymentData = {
        totalAmount: orderData.totalAmount,
        paymentMethod: paymentMethod
        // Only send totalAmount and paymentMethod - paymentNumber is auto-generated by backend
        // Remove paymentDate and retailStore - they don't exist in backend entity
      };
      
      console.log('Creating payment with data:', paymentData);
      const payment = await this.createPayment(paymentData);
      console.log('Payment created successfully:', payment);

      // Create order with all related entities
      const completeOrderData = {
        orderStatus: 'Pending',
        retailStore: orderData.retailStore,
        orderItems: orderData.orderItems,
        delivery: delivery,
        invoice: invoice,
        payment: payment
        // Only send the fields the backend Order entity accepts
        // Remove orderDate - it's handled by backend
      };
      
      console.log('Creating order with complete data:', completeOrderData);
      const order = await this.createOrder(completeOrderData);
      console.log('Order created successfully:', order);
      
      return order;
    } catch (error) {
      console.error('Error creating complete order:', error);
      throw new Error('Failed to create complete order: ' + error.message);
    }
  }
}

export default new ApiService();