import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { User, Store, Settings, CreditCard, Phone, Mail, LogOut, Edit, Save, Package, RefreshCw } from 'lucide-react-native';
import { useCart } from '../../context/CartContext';
import ApiService from '../../services/api';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, store, setUser, setStoreInfo, logout } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phone: '',
    storeName: '',
    storeNumber: '',
  });

  // Load user and store data when component mounts or when user/store changes
  useEffect(() => {
    if (user || store) {
      setUserInfo({
        username: user?.username || store?.storeNumber || '',
        email: user?.email || store?.contactDetails?.email || store?.email || '',
        phone: user?.phoneNumber || store?.contactDetails?.phoneNumber || store?.phoneNumber || '',
        storeName: store?.storeName || '',
        storeNumber: store?.storeNumber || '',
      });
    }
  }, [user, store]);

  // Function to refresh user and store data
  const refreshProfileData = async () => {
    if (!user?.username) return;
    
    try {
      setIsLoading(true);
      // Refresh user data
      const refreshedUser = await ApiService.getUserByUsername(user.username);
      setUser(refreshedUser);
      
      // Refresh store data if available
      if (store?.storeNumber) {
        const refreshedStore = await ApiService.getStoreByNumber(store.storeNumber);
        setStoreInfo(refreshedStore);
      }
    } catch (error) {
      console.error('Error refreshing profile data:', error);
      Alert.alert('Error', 'Failed to refresh profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !store) {
      Alert.alert('Error', 'User or store information not available');
      return;
    }

    setIsLoading(true);
    try {
      let updatedUser = null;
      let updatedStore = null;

      // Update user information if changed
      if (userInfo.email !== user.email || userInfo.phone !== user.phoneNumber) {
        const userUpdateData = {
          ...user,
          email: userInfo.email,
          phoneNumber: userInfo.phone
        };
        
        try {
          updatedUser = await ApiService.updateUser(userUpdateData);
          console.log('User updated successfully:', updatedUser);
        } catch (userError) {
          console.error('Failed to update user:', userError);
          // Continue with store update even if user update fails
        }
      }

      // Update store information if changed
      if (userInfo.storeName !== store.storeName || 
          userInfo.email !== (store.contactDetails?.email || store.email) ||
          userInfo.phone !== (store.contactDetails?.phoneNumber || store.phoneNumber)) {
        
        const storeUpdateData = {
          ...store,
          storeName: userInfo.storeName,
          contactDetails: {
            ...store.contactDetails,
            email: userInfo.email,
            phoneNumber: userInfo.phone
          }
        };
        
        try {
          updatedStore = await ApiService.updateStore(storeUpdateData);
          console.log('Store updated successfully:', updatedStore);
        } catch (storeError) {
          console.error('Failed to update store:', storeError);
        }
      }

      // Update context with new data if updates were successful
      if (updatedUser) {
        setUser(updatedUser);
      }
      if (updatedStore) {
        setStoreInfo(updatedStore);
      }

      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
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
          onPress: async () => {
            try {
              console.log('Starting logout process...');
              
              // Clear all state first
              logout();
              
              // Force navigation to login screen with reset
              console.log('Navigating to login screen...');
              router.replace('/login');
              
              // Additional navigation to ensure we're at the login screen
              setTimeout(() => {
                console.log('Forcing navigation to login screen...');
                router.replace('/login');
              }, 200);
              
              console.log('User logged out successfully');
            } catch (error) {
              console.error('Error during logout:', error);
              // Fallback: try to navigate again
              router.replace('/login');
            }
          }
        },
      ]
    );
  };

  const handleManageProducts = () => {
    // Navigate to product management screen
    // You can implement navigation here
    Alert.alert('Product Management', 'Navigate to product management screen');
  };

  const handleSalesAnalytics = () => {
    // Navigate to sales analytics screen
    Alert.alert('Sales Analytics', 'Navigate to sales analytics screen');
  };

  const handleStoreSettings = () => {
    // Navigate to store settings screen
    Alert.alert('Store Settings', 'Navigate to store settings screen');
  };

  // Show loading state if user/store data is not loaded
  if (!user && !store) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerButtons}>
          {!isEditing && (
            <TouchableOpacity
              style={[styles.headerButton, isLoading && styles.disabledButton]}
              onPress={refreshProfileData}
              disabled={isLoading}
            >
              <RefreshCw size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.editButton, isLoading && styles.disabledButton]}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.loadingButtonText}>...</Text>
            ) : isEditing ? (
              <Save size={20} color="#F59E0B" />
            ) : (
              <Edit size={20} color="#F59E0B" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.username}>{userInfo.username}</Text>
          <View style={styles.userTypeContainer}>
            <Text style={[styles.userType, styles.storeUserType]}>
              Store Owner
            </Text>
          </View>
        </View>

        {/* Store Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Information</Text>
          
          <View style={styles.inputContainer}>
            <Store size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={userInfo.storeName}
              onChangeText={(text) => setUserInfo({...userInfo, storeName: text})}
              editable={isEditing}
              placeholder="Store Name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.storeNumberLabel}>Store #</Text>
            <TextInput
              style={[styles.input, styles.storeNumberInput]}
              value={userInfo.storeNumber}
              editable={false}
              placeholder="Store Number"
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({...userInfo, email: text})}
              editable={isEditing}
              placeholder="Store Email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
              editable={isEditing}
              placeholder="Store Phone"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Store Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Management</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleManageProducts}>
            <Package size={20} color="#6B7280" />
            <Text style={styles.actionText}>Manage Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleSalesAnalytics}>
            <CreditCard size={20} color="#6B7280" />
            <Text style={styles.actionText}>Sales Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleStoreSettings}>
            <Settings size={20} color="#6B7280" />
            <Text style={styles.actionText}>Store Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  editButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingButtonText: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  userTypeContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  storeUserType: {
    color: '#059669',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  storeNumberLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  storeNumberInput: {
    backgroundColor: '#F9FAFB',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
});