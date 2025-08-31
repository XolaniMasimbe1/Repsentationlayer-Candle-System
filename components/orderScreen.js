const BASE_URL = 'http://10.113.16.16:8080/CandleSystem';

class ApiService {
  // ✅ Authentication
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

      return await response.json();
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

  // ✅ Product management (unchanged)
  async getAllProducts() {
    try {
      const response = await fetch(`${BASE_URL}/product/all`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const products = await response.json();

      return products.map(product => ({
        ...product,
        image:
          'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5,
        inCart: false,
      }));
    } catch (error) {
      console.error('API Error - getAllProducts:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductByNumber(productNumber) {
    try {
      const response = await fetch(`${BASE_URL}/product/read/${productNumber}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const product = await response.json();
      return {
        ...product,
        image:
          'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5,
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error - updateProduct:', error);
      throw new Error('Failed to update product');
    }
  }

  // ✅ Order management
  async createOrder(orderData) {
    try {
      const response = await fetch(`${BASE_URL}/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error - getOrderByNumber:', error);
      throw new Error('Failed to fetch order');
    }
  }

  // ✅ Complete order (fixed, no recursion, no navigate)
  async createCompleteOrder(orderData) {
    try {
      console.log('Creating complete order with data:', orderData);

      // Step 1: Create delivery
      const delivery = await this.createDelivery({ status: 'Pending' });

      // Step 2: Create invoice
      const invoice = await this.createInvoice({ totalAmount: orderData.totalAmount });

      // Step 3: Create payment method
      const paymentMethod = await this.createPaymentMethod({
        type: orderData.paymentType || 'CASH',
      });

      // Step 4: Create payment
      const payment = await this.createPayment({
        totalAmount: orderData.totalAmount,
        paymentMethod,
      });

      // Step 5: Create order with linked entities
      const completeOrderData = {
        orderStatus: 'Pending',
        retailStore: orderData.retailStore,
        orderItems: orderData.orderItems,
        delivery,
        invoice,
        payment,
      };

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
