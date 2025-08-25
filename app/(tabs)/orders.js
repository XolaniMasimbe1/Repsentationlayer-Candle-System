import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Package, Truck, CreditCard, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import ApiService from '../../services/api';

export default function OrdersScreen() {
  const { 
    orders, 
    loading, 
    loadOrders, 
    updateOrderStatus,
    store,
    setStoreInfo,
    getOrderStatusColor,
    getOrderStatusText
  } = useCart();

  // Debug logging for store state
  console.log('OrdersScreen - Current store state:', store);
  
  // Debug function to test store loading
  const debugLoadStore = async () => {
    try {
      console.log('Debug: Attempting to load store info from orders screen...');
      const { user } = useCart();
      
      if (user?.email) {
        console.log('Debug: User email found:', user.email);
        
        // Try to get all stores and find matching one
        try {
          const allStores = await ApiService.getAllStores();
          console.log('Debug: All stores from orders screen:', allStores);
          
          const matchingStore = allStores.find(store => 
            store.contactDetails?.email === user.email ||
            store.email === user.email
          );
          
          if (matchingStore) {
            console.log('Debug: Found matching store from orders screen:', matchingStore);
            setStoreInfo(matchingStore);
          } else {
            console.log('Debug: No matching store found by email from orders screen');
          }
        } catch (error) {
          console.log('Debug: Error fetching stores from orders screen:', error.message);
        }
      } else {
        console.log('Debug: No user email available from orders screen');
      }
    } catch (error) {
      console.log('Debug: Error in debug function from orders screen:', error.message);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    if (store?.storeNumber) {
      loadOrders();
    }
  }, [store]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadOrders();
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (orderNumber, newStatus) => {
    setUpdatingStatus(orderNumber);
    try {
      await updateOrderStatus(orderNumber, newStatus);
      Alert.alert('Success', `Order status updated to ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', `Failed to update order status: ${error.message}`);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock size={20} color="#F59E0B" />;
      case 'processing':
        return <Package size={20} color="#3B82F6" />;
      case 'shipped':
        return <Truck size={20} color="#8B5CF6" />;
      case 'delivered':
        return <CheckCircle size={20} color="#10B981" />;
      case 'cancelled':
        return <Package size={20} color="#EF4444" />;
      default:
        return <Package size={20} color="#6B7280" />;
    }
  };

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  const renderOrderCard = (order) => (
    <TouchableOpacity
      key={order.orderNumber}
      style={styles.orderCard}
      onPress={() => setSelectedOrder(selectedOrder === order.orderNumber ? null : order.orderNumber)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.orderDate || Date.now()).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(order.orderStatus)}
          <Text style={[
            styles.statusText, 
            { color: getOrderStatusColor(order.orderStatus) }
          ]}>
            {getOrderStatusText(order.orderStatus)}
          </Text>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.totalAmount}>
          R{order.invoice?.totalAmount?.toFixed(2) || '0.00'}
        </Text>
        <Text style={styles.itemCount}>
          {order.orderItems?.length || 0} item(s)
        </Text>
      </View>

      {selectedOrder === order.orderNumber && (
        <View style={styles.orderDetails}>
          <View style={styles.detailsDivider} />
          
          {/* Order Items */}
          <Text style={styles.detailsTitle}>Order Items</Text>
          {order.orderItems?.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.product?.name || 'Product'}
                </Text>
                <Text style={styles.itemVariant}>
                  {item.product?.scent} • {item.product?.color} • {item.product?.size}
                </Text>
              </View>
              <View style={styles.itemPricing}>
                <Text style={styles.itemQuantityPrice}>
                  {item.quantity}x R{item.unitPrice || item.product?.price || '0.00'}
                </Text>
                <Text style={styles.itemTotal}>
                  R{((item.quantity || 1) * (item.unitPrice || item.product?.price || 0)).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          {/* Order Details */}
          <View style={styles.orderInfoSection}>
            <Text style={styles.sectionTitle}>Order Information</Text>
            
            {/* Delivery Info */}
            {order.delivery && (
              <View style={styles.infoRow}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.infoLabel}>Delivery Status:</Text>
                <Text style={styles.infoValue}>{order.delivery.status}</Text>
              </View>
            )}

            {/* Payment Info */}
            {order.payment && (
              <View style={styles.infoRow}>
                <CreditCard size={16} color="#6B7280" />
                <Text style={styles.infoLabel}>Payment:</Text>
                <Text style={styles.infoValue}>
                  R{order.payment.totalAmount?.toFixed(2)} - {order.payment.paymentMethod?.type || 'N/A'}
                </Text>
              </View>
            )}

            {/* Invoice Info */}
            {order.invoice && (
              <View style={styles.infoRow}>
                <FileText size={16} color="#6B7280" />
                <Text style={styles.infoLabel}>Invoice:</Text>
                <Text style={styles.infoValue}>{order.invoice.invoiceNumber}</Text>
              </View>
            )}
          </View>

          {/* Status Update */}
          <View style={styles.statusUpdateSection}>
            <Text style={styles.sectionTitle}>Update Status</Text>
            <View style={styles.statusButtons}>
              {getStatusOptions(order.orderStatus).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    updatingStatus === order.orderNumber && styles.disabledButton
                  ]}
                  onPress={() => handleStatusUpdate(order.orderNumber, status)}
                  disabled={updatingStatus === order.orderNumber}
                >
                  {updatingStatus === order.orderNumber ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.statusButtonText}>{status}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Eye size={16} color="#6B7280" />
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.actionButtonText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  if (!store) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.noStoreContainer}>
          <Package size={64} color="#D1D5DB" />
          <Text style={styles.noStoreTitle}>Store Information Required</Text>
          <Text style={styles.noStoreSubtitle}>
            Please complete your store registration to view orders
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Debug Section - Remove this after fixing the issue */}
      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text style={styles.debugText}>User: {JSON.stringify(useCart().user)}</Text>
        <Text style={styles.debugText}>Store: {JSON.stringify(store)}</Text>
        <TouchableOpacity style={styles.debugButton} onPress={debugLoadStore}>
          <Text style={styles.debugButtonText}>Debug Load Store</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track your candle orders</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.ordersContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#F59E0B" />
              <Text style={styles.loadingText}>Loading orders...</Text>
            </View>
          ) : orders.length > 0 ? (
            orders.map(renderOrderCard)
          ) : (
            <View style={styles.noOrdersContainer}>
              <Package size={64} color="#D1D5DB" />
              <Text style={styles.noOrdersTitle}>No orders yet</Text>
              <Text style={styles.noOrdersSubtitle}>
                Start shopping to see your orders here
              </Text>
            </View>
          )}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  itemCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderDetails: {
    marginTop: 16,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemVariant: {
    fontSize: 12,
    color: '#6B7280',
  },
  itemPricing: {
    alignItems: 'flex-end',
  },
  itemQuantityPrice: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  orderInfoSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    minWidth: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  statusUpdateSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  noOrdersContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noOrdersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noOrdersSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  noStoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noStoreSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  debugSection: {
    backgroundColor: '#F0F9EB', // Light green background for debug
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7D7C5',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22C55E', // Green color for title
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  debugButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});