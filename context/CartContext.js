import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);

  // Load user data on mount
  useEffect(() => {
    // User and store data will be loaded by LoginScreen after authentication
    // No need to set hardcoded demo data
  }, []);

  const addToCart = (product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.productNumber === product.productNumber);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.productNumber === product.productNumber
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productNumber) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.productNumber !== productNumber)
    );
  };

  const updateQuantity = (productNumber, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productNumber);
      return;
    }

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.productNumber === productNumber
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Order management functions
  const createOrder = async (paymentType = 'CASH') => {
    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    if (!user || !store) {
      throw new Error('User or store information not available');
    }

    setLoading(true);
    try {
      // Calculate total amount
      const totalAmount = getCartTotal();

      // Create order items
      const orderItems = cartItems.map(item => ({
        quantity: item.quantity,
        unitPrice: item.price,
        product: item
      }));

      // Create order data
      const orderData = {
        orderStatus: 'Pending',
        retailStore: store,
        orderItems: orderItems,
        totalAmount: totalAmount,
        paymentType: paymentType
      };

      // Use the API service to create the complete order
      const createdOrder = await ApiService.createCompleteOrder(orderData);
      
      // Add to orders list
      setOrders(prevOrders => [...prevOrders, createdOrder]);
      
      // Clear cart after successful order
      clearCart();
      
      return createdOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    if (!store?.storeNumber) return;
    
    setLoading(true);
    try {
      const storeOrders = await ApiService.getOrdersByStore(store.storeNumber);
      setOrders(storeOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderNumber, newStatus) => {
    setLoading(true);
    try {
      const updatedOrder = await ApiService.updateOrderStatus(orderNumber, newStatus);
      
      // Update local orders
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNumber === orderNumber
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );
      
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderNumber) => {
    try {
      return await ApiService.getOrderByNumber(orderNumber);
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };

  // Store management
  const setStoreInfo = (storeInfo) => {
    console.log('Setting store info in context:', storeInfo);
    setStore(storeInfo);
  };

  const loadStoreInfo = async (storeNumber) => {
    try {
      const storeData = await ApiService.getStoreByNumber(storeNumber);
      console.log('Loading store info:', storeData);
      setStore(storeData);
      return storeData;
    } catch (error) {
      console.error('Error loading store info:', error);
      throw error;
    }
  };

  // Product management
  const refreshProducts = async () => {
    try {
      const products = await ApiService.getAllProducts();
      // Update cart items with fresh product data
      setCartItems(currentItems =>
        currentItems.map(item => {
          const freshProduct = products.find(p => p.productNumber === item.productNumber);
          return freshProduct ? { ...item, ...freshProduct } : item;
        })
      );
      return products;
    } catch (error) {
      console.error('Error refreshing products:', error);
      throw error;
    }
  };

  // Utility functions
  const isProductInCart = (productNumber) => {
    return cartItems.some(item => item.productNumber === productNumber);
  };

  const getProductQuantityInCart = (productNumber) => {
    const item = cartItems.find(item => item.productNumber === productNumber);
    return item ? item.quantity : 0;
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#F59E0B';
      case 'processing':
        return '#3B82F6';
      case 'shipped':
        return '#8B5CF6';
      case 'delivered':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getOrderStatusText = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || 'Unknown';
  };

  // User management
  // setUser is already defined as a state setter above

  return (
    <CartContext.Provider value={{
      // Cart state
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      isProductInCart,
      getProductQuantityInCart,
      
      // Order state
      orders,
      loading,
      createOrder,
      loadOrders,
      updateOrderStatus,
      getOrderById,
      
      // Store state
      store,
      setStoreInfo,
      loadStoreInfo,
      
      // User state
      user,
      setUser,
      
      // Product management
      refreshProducts,
      
      // Utility functions
      getOrderStatusColor,
      getOrderStatusText,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}