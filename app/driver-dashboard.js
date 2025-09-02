/**
 * Driver Dashboard Component for Candle System
 * 
 * This component provides a driver interface for delivery management,
 * order tracking, and delivery status updates with navigation integration.
 * 
 * References:
 * - React Native Driver Interface: https://reactnative.dev/docs/scrollview
 * - Delivery Management: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - Status Updates: https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - Navigation Integration: https://reactnative.dev/docs/linking
 * 
 * YouTube Tutorials Referenced:
 * - "Driver App in React Native" by Programming with Mosh
 * - "Delivery Management System" by The Net Ninja
 * - "Status Tracking in React Native" by Codevolution
 * - "Navigation Integration" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * 
 * Baeldung References:
 * - https://www.baeldung.com/spring-boot-json
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  LogOut,
  Navigation,
  Phone,
  User
} from 'lucide-react-native';
import { useCart } from '../context/CartContext';
import { router } from 'expo-router';

export default function DriverDashboard() {
  const { user, logout } = useCart();
  const [deliveries, setDeliveries] = useState([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customerName: 'John Smith',
      address: '123 Main St, Cape Town',
      status: 'pending',
      estimatedTime: '30 mins',
      phone: '+27 82 123 4567'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customerName: 'Sarah Johnson',
      address: '456 Oak Ave, Cape Town',
      status: 'in_progress',
      estimatedTime: '15 mins',
      phone: '+27 83 987 6543'
    }
  ]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setDeliveries(prev => 
      prev.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'in_progress': return '#3B82F6';
      case 'completed': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const DeliveryCard = ({ delivery }) => (
    <View style={styles.deliveryCard}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.orderNumber}>{delivery.orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(delivery.status) }]}>
            {getStatusText(delivery.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.deliveryInfo}>
        <View style={styles.infoRow}>
          <User size={16} color="#6B7280" />
          <Text style={styles.infoText}>{delivery.customerName}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.infoText}>{delivery.address}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Phone size={16} color="#6B7280" />
          <Text style={styles.infoText}>{delivery.phone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.infoText}>ETA: {delivery.estimatedTime}</Text>
        </View>
      </View>
      
      <View style={styles.deliveryActions}>
        {delivery.status === 'pending' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.startButton]}
            onPress={() => updateDeliveryStatus(delivery.id, 'in_progress')}
          >
            <Truck size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Start Delivery</Text>
          </TouchableOpacity>
        )}
        
        {delivery.status === 'in_progress' && (
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.navigateButton]}
              onPress={() => Alert.alert('Navigation', 'Opening navigation to destination')}
            >
              <Navigation size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Navigate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.completeButton]}
              onPress={() => updateDeliveryStatus(delivery.id, 'completed')}
            >
              <CheckCircle size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Complete</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {delivery.status === 'completed' && (
          <View style={styles.completedContainer}>
            <CheckCircle size={20} color="#10B981" />
            <Text style={styles.completedText}>Delivery Completed</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Ezelina Candle - Driver</Text>
          <Text style={styles.headerSubtitle}>Welcome, {user?.username || 'Driver'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Deliveries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>
        </View>

        {/* Deliveries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Deliveries</Text>
          {deliveries.map(delivery => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  deliveryActions: {
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#3B82F6',
  },
  navigateButton: {
    backgroundColor: '#8B5CF6',
    flex: 1,
    marginRight: 8,
  },
  completeButton: {
    backgroundColor: '#10B981',
    flex: 1,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  actionRow: {
    flexDirection: 'row',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  completedText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
});
