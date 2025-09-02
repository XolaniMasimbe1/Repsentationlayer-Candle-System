import API_CONFIG from './config';

class ApiService {

  // Utility methods
  async checkConnection() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/all`, { 
        method: 'HEAD',
        timeout: 5000 
      });
      return response.ok;
    } catch (error) {
      console.error('Connection check failed:', error);
      return false;
    }
  }

 
  async createCompleteOrder(orderData) {
    try {
      console.log('Creating complete order with data:', orderData);
      
      // Import the specific APIs
      const { DeliveryApi, InvoiceApi, PaymentMethodApi, PaymentApi, OrderApi } = await import('./index.js');
      
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

      // Create order with all related entities
      const completeOrderData = {
        orderStatus: 'Pending',
        retailStore: orderData.retailStore,
        orderItems: orderData.orderItems,
        delivery: delivery,
        invoice: invoice,
        payment: payment
      };
      
      console.log('Creating order with complete data:', completeOrderData);
      const order = await OrderApi.create(completeOrderData);
      console.log('Order created successfully:', order);
      
      return order;
    } catch (error) {
      console.error('Error creating complete order:', error);
      throw new Error('Failed to create complete order: ' + error.message);
    }
  }
}

export default new ApiService();