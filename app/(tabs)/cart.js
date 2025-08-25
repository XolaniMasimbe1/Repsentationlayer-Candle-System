import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, FileText, Check, AlertCircle } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import ApiService from '../../services/api';

export default function CartScreen() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    createOrder,
    loading: orderLoading,
    store,
    setStoreInfo
  } = useCart();
  
  // Debug logging for store state
  console.log('CartScreen - Current store state:', store);
  
  // Debug function to test store loading
  const debugLoadStore = async () => {
    try {
      console.log('Debug: Attempting to load store info...');
      const { user, setStoreInfo } = useCart();
      
      if (user?.email) {
        console.log('Debug: User email found:', user.email);
        
        // Try to get all stores and find matching one
        try {
          const allStores = await ApiService.getAllStores();
          console.log('Debug: All stores:', allStores);
          
          const matchingStore = allStores.find(store => 
            store.contactDetails?.email === user.email ||
            store.email === user.email
          );
          
          if (matchingStore) {
            console.log('Debug: Found matching store:', matchingStore);
            setStoreInfo(matchingStore);
          } else {
            console.log('Debug: No matching store found by email');
          }
        } catch (error) {
          console.log('Debug: Error fetching stores:', error.message);
        }
      } else {
        console.log('Debug: No user email available');
      }
    } catch (error) {
      console.log('Debug: Error in debug function:', error.message);
    }
  };

  // Debug function to test delivery creation
  const debugTestDelivery = async () => {
    try {
      console.log('Debug: Testing delivery creation...');
      
      // Test delivery with ONLY the fields the backend accepts
      try {
        const minimalDelivery = await ApiService.createDelivery({ status: 'Pending' });
        console.log('Debug: Delivery created successfully:', minimalDelivery);
        Alert.alert('Success', 'Delivery created successfully!');
      } catch (error) {
        console.log('Debug: Delivery failed:', error.message);
        Alert.alert('Error', `Delivery failed: ${error.message}`);
      }
    } catch (error) {
      console.log('Debug: Error testing delivery:', error.message);
    }
  };

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState('CASH');

  const removeItem = (productNumber) => {
    removeFromCart(productNumber);
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 8.99;
    return subtotal + shipping;
  };

  const handleConfirmOrder = async () => {
    if (!store) {
      Alert.alert(
        'Store Information Required',
        'Please ensure your store information is properly set up before placing orders.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const createdOrder = await createOrder(paymentMethodType);
      
      Alert.alert(
        'Order Confirmed!',
        `Order ${createdOrder.orderNumber} has been created successfully.\n\nTotal Amount: R${calculateTotal().toFixed(2)}\nPayment Method: ${paymentMethodType}\nStatus: ${createdOrder.orderStatus}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setShowCheckout(false);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', `Failed to create order: ${error.message}`);
      console.error('Order creation error:', error);
    }
  };

  const renderCartItem = (item) => (
    <View key={item.productNumber} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariant}>{item.scent} • {item.color} • {item.size}</Text>
        <Text style={styles.itemPrice}>R{item.price}</Text>
        
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.productNumber, item.quantity - 1)}
          >
            <Minus size={16} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.productNumber, item.quantity + 1)}
          >
            <Plus size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.productNumber)}
      >
        <Trash2 size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.emptyCart}>
          <ShoppingBag size={64} color="#D1D5DB" />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtitle}>Add some beautiful candles to get started</Text>
        </View>
      </SafeAreaView>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 8.99;
  const total = calculateTotal();

  return (
    <>
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
        <TouchableOpacity style={[styles.debugButton, { marginTop: 8 }]} onPress={debugTestDelivery}>
          <Text style={styles.debugButtonText}>Test Delivery Creation</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.cartItemsContainer}>
          {cartItems.map(renderCartItem)}
        </View>

        {/* Store Information */}
        {store && (
          <View style={styles.storeInfo}>
            <Text style={styles.storeInfoTitle}>Store Information</Text>
            <Text style={styles.storeName}>{store.storeName}</Text>
            <Text style={styles.storeNumber}>Store #: {store.storeNumber}</Text>
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R{subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={[styles.summaryValue, shipping === 0 && styles.freeShipping]}>
              {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
            </Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
          </View>
          
          {subtotal < 50 && (
            <Text style={styles.freeShippingNote}>
              Add R{(50 - subtotal).toFixed(2)} more for free shipping
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => setShowCheckout(true)}
        >
          <Text style={styles.checkoutText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    {/* Checkout Modal */}
    <Modal
      visible={showCheckout}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Confirm Order</Text>
          <TouchableOpacity onPress={() => setShowCheckout(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Store Information */}
          {store && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Store Details</Text>
              <View style={styles.storeDetails}>
                <Text style={styles.storeDetailName}>{store.storeName}</Text>
                <Text style={styles.storeDetailNumber}>Store #: {store.storeNumber}</Text>
                {store.contactDetails && (
                  <>
                    <Text style={styles.storeDetailAddress}>
                      {store.contactDetails.street}, {store.contactDetails.city}
                    </Text>
                    <Text style={styles.storeDetailContact}>
                      {store.contactDetails.email} • {store.contactDetails.phoneNumber}
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartItems.map(item => (
              <View key={item.productNumber} style={styles.orderSummaryItem}>
                <Text style={styles.itemSummaryName}>{item.name}</Text>
                <Text style={styles.itemSummaryDetails}>
                  {item.quantity}x R{item.price} = R{(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>R{total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethodType === 'CREDIT_CARD' && styles.selectedPayment
                ]}
                onPress={() => setPaymentMethodType('CREDIT_CARD')}
              >
                <CreditCard size={20} color={paymentMethodType === 'CREDIT_CARD' ? '#F59E0B' : '#6B7280'} />
                <Text style={[
                  styles.paymentText,
                  paymentMethodType === 'CREDIT_CARD' && styles.selectedPaymentText
                ]}>Credit Card</Text>
                {paymentMethodType === 'CREDIT_CARD' && <Check size={16} color="#F59E0B" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethodType === 'CASH' && styles.selectedPayment
                ]}
                onPress={() => setPaymentMethodType('CASH')}
              >
                <Text style={styles.cashIcon}>💵</Text>
                <Text style={[
                  styles.paymentText,
                  paymentMethodType === 'CASH' && styles.selectedPaymentText
                ]}>Cash</Text>
                {paymentMethodType === 'CASH' && <Check size={16} color="#F59E0B" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethodType === 'EFT' && styles.selectedPayment
                ]}
                onPress={() => setPaymentMethodType('EFT')}
              >
                <Text style={styles.eftIcon}>🏦</Text>
                <Text style={[
                  styles.paymentText,
                  paymentMethodType === 'EFT' && styles.selectedPaymentText
                ]}>EFT Transfer</Text>
                {paymentMethodType === 'EFT' && <Check size={16} color="#F59E0B" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Order Processing Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What Happens Next?</Text>
            <View style={styles.processInfo}>
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>1</View>
                <Text style={styles.stepText}>Order will be processed and confirmed</Text>
              </View>
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>2</View>
                <Text style={styles.stepText}>Invoice will be generated automatically</Text>
              </View>
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>3</View>
                <Text style={styles.stepText}>Delivery will be arranged</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={[styles.confirmButton, (orderLoading || !store) && styles.disabledButton]}
            onPress={handleConfirmOrder}
            disabled={orderLoading || !store}
          >
            {orderLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.confirmButtonText}>Processing...</Text>
              </View>
            ) : (
              <Text style={styles.confirmButtonText}>
                {!store ? 'Store Info Required' : 'Confirm Order'}
              </Text>
            )}
          </TouchableOpacity>
          
          {!store && (
            <View style={styles.warningContainer}>
              <AlertCircle size={16} color="#F59E0B" />
              <Text style={styles.warningText}>
                Please complete your store registration first
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
    </>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  itemCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  cartItemsContainer: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 6,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#1F2937',
  },
  removeButton: {
    padding: 8,
  },
  storeInfo: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  storeInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  storeNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderSummary: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  freeShipping: {
    color: '#059669',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  freeShippingNote: {
    fontSize: 12,
    color: '#059669',
    textAlign: 'center',
    marginTop: 8,
  },
  checkoutContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  checkoutButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cancelText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  storeDetails: {
    gap: 4,
  },
  storeDetailName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  storeDetailNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  storeDetailAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  storeDetailContact: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemSummaryName: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  itemSummaryDetails: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  paymentOptions: {
    gap: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  selectedPayment: {
    borderColor: '#F59E0B',
    backgroundColor: '#FEF3C7',
  },
  paymentText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
  },
  selectedPaymentText: {
    color: '#92400E',
    fontWeight: '600',
  },
  cashIcon: {
    fontSize: 20,
  },
  eftIcon: {
    fontSize: 20,
  },
  processInfo: {
    gap: 12,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  confirmButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    gap: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
  },
  debugSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  debugText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  debugButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});