import React, { useState } from 'react';
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
import { User, Store, Settings, CreditCard, MapPin, Phone, Mail, LogOut, CreditCard as Edit, Save } from 'lucide-react-native';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'john_doe',
    email: 'john@example.com',
    phone: '+27 11 123 4567',
    storeName: 'Candle Paradise',
    storeNumber: 'STR001',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would call your API to update user info
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? (
            <Save size={20} color="#F59E0B" />
          ) : (
            <Edit size={20} color="#F59E0B" />
          )}
        </TouchableOpacity>
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
            />
          </View>
        </View>

        {/* Store Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Management</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <Package size={20} color="#6B7280" />
            <Text style={styles.actionText}>Manage Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <CreditCard size={20} color="#6B7280" />
            <Text style={styles.actionText}>Sales Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
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
  editButton: {
    padding: 8,
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