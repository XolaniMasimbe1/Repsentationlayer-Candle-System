/**
 * Admin Dashboard Component for Candle System
 * 
 * This component provides a comprehensive admin interface with statistics,
 * quick actions, recent activity, and system management features.
 * 
 * References:
 * - React Native Dashboard Design: https://reactnative.dev/docs/scrollview
 * - Dashboard UI Patterns: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - Statistics Cards: https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - Navigation with Expo Router: https://docs.expo.dev/router/introduction/
 * 
 * YouTube Tutorials Referenced:
 * - "React Native Dashboard Design" by Programming with Mosh
 * - "Admin Panel in React Native" by The Net Ninja
 * - "Dashboard UI Components" by Codevolution
 * - "Expo Router Navigation" by Academind
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
  Package, 
  LogOut,
  Factory
} from 'lucide-react-native';
import { useCart } from '../context/CartContext';
import { router } from 'expo-router';
import ProductManagement from '../components/ProductManagement';
import ManufactureManagement from '../components/ManufactureManagement';
import { ProductApi, ManufactureApi } from '../services';

export default function AdminDashboard() {
  const { user, logout } = useCart();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'products', 'manufacturers'
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalManufacturers: 0
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  // Refresh stats when returning to dashboard
  useEffect(() => {
    if (currentView === 'dashboard') {
      loadDashboardStats();
    }
  }, [currentView]);

  const loadDashboardStats = async () => {
    try {
      console.log('Loading dashboard stats...');
      
      const [products, manufacturers] = await Promise.all([
        ProductApi.getAll(),
        ManufactureApi.getAll()
      ]);

      console.log('Products loaded:', products.length);
      console.log('Manufacturers loaded:', manufacturers.length);

      setStats({
        totalProducts: products.length,
        totalManufacturers: manufacturers.length
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      // Set default values if API fails
      setStats({
        totalProducts: 0,
        totalManufacturers: 0
      });
    }
  };

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

  const StatCard = ({ title, value, icon: Icon, color, onPress }) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.statContent}>
        <View style={styles.statInfo}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Icon size={24} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const ActionButton = ({ title, icon: Icon, onPress, color = '#F59E0B' }) => (
    <TouchableOpacity style={[styles.actionButton, { borderColor: color }]} onPress={onPress}>
      <Icon size={20} color={color} />
      <Text style={[styles.actionButtonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );

  const renderDashboard = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Statistics Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="#F59E0B"
            onPress={() => setCurrentView('products')}
          />
          <StatCard
            title="Manufacturers"
            value={stats.totalManufacturers}
            icon={Factory}
            color="#8B5CF6"
            onPress={() => setCurrentView('manufacturers')}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <ActionButton
            title="Manage Products"
            icon={Package}
            color="#F59E0B"
            onPress={() => setCurrentView('products')}
          />
          <ActionButton
            title="Manage Manufacturers"
            icon={Factory}
            color="#8B5CF6"
            onPress={() => setCurrentView('manufacturers')}
          />
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'products':
        return <ProductManagement />;
      case 'manufacturers':
        return <ManufactureManagement />;
      default:
        return renderDashboard();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            {currentView === 'products' ? 'Product Management' :
             currentView === 'manufacturers' ? 'Manufacturer Management' :
             'Ezelina Candle - Admin'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {currentView === 'dashboard' ? `Welcome back, ${user?.username || 'Admin'}` :
             currentView === 'products' ? 'Manage your product catalog' :
             currentView === 'manufacturers' ? 'Manage manufacturer information' :
             'Admin Dashboard'}
          </Text>
        </View>
        <View style={styles.headerActions}>
          {currentView !== 'dashboard' && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentView('dashboard')}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {renderCurrentView()}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },

  managementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  managementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  managementText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 12,
  },
  bottomPadding: {
    height: 20,
  },
});
