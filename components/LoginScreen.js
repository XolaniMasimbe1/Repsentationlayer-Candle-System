import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import { Mail, Lock, User, Store } from 'lucide-react-native';
import ApiService from '../services/api';
import { useCart } from '../context/CartContext';

export default function LoginScreen({ onLogin }) {
  const { setUser, setStoreInfo, loadStoreInfo } = useCart();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '', // This will be sent as phoneNumber to backend
    storeName: '',
    postalCode: '',
    street: '',
    city: '',
    province: '',
    country: 'South Africa',
  });

  // Test backend connection on component mount
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        const isConnected = await ApiService.checkConnection();
        console.log('Backend connection test:', isConnected ? 'SUCCESS' : 'FAILED');
      } catch (error) {
        console.log('Backend connection test error:', error.message);
      }
    };
    
    testConnection();
  }, []);

  // Create refs for input fields
  const passwordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const storeNameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();
  const provinceRef = useRef();

  const focusNextField = (nextField) => {
    nextField?.current?.focus();
  };

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const result = await ApiService.login(formData.username, formData.password);
        if (result.includes('successful')) {
          // After successful login, fetch user and store information
          try {
            console.log('Login successful, fetching user data for:', formData.username);
            
            // Get user information
            const userData = await ApiService.getUserByUsername(formData.username);
            console.log('User data received:', userData);
            
            if (userData) {
              setUser(userData);
              console.log('User set in context:', userData);
              
              // If user has a store, load store information
              if (userData.retailStore) {
                console.log('User has retail store:', userData.retailStore);
                setStoreInfo(userData.retailStore);
              } else {
                console.log('User has no retail store in user data, trying to find store by email');
                // Try to find store by user's email (more reliable than username)
                try {
                  // Get all stores and find the one matching the user's email
                  const allStores = await ApiService.getAllStores();
                  console.log('All stores fetched:', allStores);
                  
                  // Find store that matches the user's email
                  const matchingStore = allStores.find(store => 
                    store.contactDetails?.email === userData.email ||
                    store.email === userData.email
                  );
                  
                  if (matchingStore) {
                    console.log('Store found by email:', matchingStore);
                    setStoreInfo(matchingStore);
                  } else {
                    console.log('No store found by email, trying username as fallback');
                    // Fallback: try to find store by username (in case they are the same)
                    try {
                      const storeData = await ApiService.getStoreByNumber(formData.username);
                      console.log('Store data found by username:', storeData);
                      if (storeData) {
                        setStoreInfo(storeData);
                        console.log('Store info set in context');
                      }
                    } catch (storeError) {
                      console.log('No store found for user:', storeError.message);
                    }
                  }
                } catch (storesError) {
                  console.log('Error fetching all stores:', storesError.message);
                  // Fallback: try username method
                  try {
                    const storeData = await ApiService.getStoreByNumber(formData.username);
                    if (storeData) {
                      setStoreInfo(storeData);
                    }
                  } catch (fallbackError) {
                    console.log('Fallback store lookup failed:', fallbackError.message);
                  }
                }
              }
            }
          } catch (userError) {
            console.log('Error loading user data:', userError.message);
          }
          
          onLogin();
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      } catch (error) {
        Alert.alert('Error', 'Network error. Please try again.');
      }
    } else {
      try {
        const registrationData = {
          username: formData.username,
          password: formData.password,
          storeName: formData.storeName,
          email: formData.email,
          phoneNumber: formData.phone,
          postalCode: formData.postalCode,
          street: formData.street,
          city: formData.city,
          province: formData.province,
          country: formData.country
        };

        console.log('Sending registration data:', registrationData);

        const result = await ApiService.registerStore(registrationData);
        if (result) {
          console.log('Registration successful, fetching user and store data');
          
          // After successful registration, fetch and set user and store information
          try {
            // Get the newly created user
            const userData = await ApiService.getUserByUsername(formData.username);
            console.log('User data after registration:', userData);
            
            if (userData) {
              setUser(userData);
              console.log('User set in context after registration');
              
              // Get the newly created store
              if (userData.retailStore) {
                console.log('User has retail store after registration:', userData.retailStore);
                setStoreInfo(userData.retailStore);
              } else {
                console.log('No retail store in user data, trying to find store by email');
                // Try to find store by email (more reliable)
                try {
                  const allStores = await ApiService.getAllStores();
                  console.log('All stores after registration:', allStores);
                  
                  // Find store that matches the user's email
                  const matchingStore = allStores.find(store => 
                    store.contactDetails?.email === userData.email ||
                    store.email === userData.email
                  );
                  
                  if (matchingStore) {
                    console.log('Store found by email after registration:', matchingStore);
                    setStoreInfo(matchingStore);
                  } else {
                    console.log('No store found by email, trying username as fallback');
                    // Fallback: try username
                    try {
                      const storeData = await ApiService.getStoreByNumber(formData.username);
                      if (storeData) {
                        setStoreInfo(storeData);
                      }
                    } catch (storeError) {
                      console.log('Fallback store lookup failed after registration:', storeError.message);
                    }
                  }
                } catch (storesError) {
                  console.log('Error fetching stores after registration:', storesError.message);
                }
              }
            }
          } catch (userError) {
            console.log('Error loading user data after registration:', userError.message);
          }
          
          Alert.alert('Success', 'Store registered successfully', [
            { text: 'OK', onPress: () => setIsLogin(true) }
          ]);
        } else {
          Alert.alert('Error', 'Username already exists');
        }
      } catch (error) {
        console.error('Registration error:', error);
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Candle Haven</Text>
          <Text style={styles.subtitle}>Premium Handcrafted Candles</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>Register</Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <View style={styles.storeOwnerBanner}>
              <Store size={24} color="#F59E0B" />
              <Text style={styles.bannerText}>Store Owner Registration</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <User size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={(text) => setFormData({...formData, username: text})}
              placeholderTextColor="#9CA3AF"
              returnKeyType="next"
              onSubmitEditing={() => focusNextField(passwordRef)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#6B7280" />
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
              returnKeyType={isLogin ? "done" : "next"}
              onSubmitEditing={isLogin ? handleSubmit : () => focusNextField(emailRef)}
            />
          </View>

          {!isLogin && (
            <>
              <View style={styles.inputContainer}>
                <Store size={20} color="#6B7280" />
                <TextInput
                  ref={storeNameRef}
                  style={styles.input}
                  placeholder="Store Name"
                  value={formData.storeName}
                  onChangeText={(text) => setFormData({...formData, storeName: text})}
                  placeholderTextColor="#9CA3AF"
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(emailRef)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Mail size={20} color="#6B7280" />
                <TextInput
                  ref={emailRef}
                  style={styles.input}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(phoneRef)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.phoneIcon}>📱</Text>
                <TextInput
                  ref={phoneRef}
                  style={styles.input}
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({...formData, phone: text})}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(streetRef)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.addressIcon}>🏠</Text>
                <TextInput
                  ref={streetRef}
                  style={styles.input}
                  placeholder="Street Address"
                  value={formData.street}
                  onChangeText={(text) => setFormData({...formData, street: text})}
                  placeholderTextColor="#9CA3AF"
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(cityRef)}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <TextInput
                    ref={cityRef}
                    style={styles.input}
                    placeholder="City"
                    value={formData.city}
                    onChangeText={(text) => setFormData({...formData, city: text})}
                    placeholderTextColor="#9CA3AF"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextField(postalCodeRef)}
                  />
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <TextInput
                    ref={postalCodeRef}
                    style={styles.input}
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChangeText={(text) => setFormData({...formData, postalCode: text})}
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextField(provinceRef)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.locationIcon}>📍</Text>
                <TextInput
                  ref={provinceRef}
                  style={styles.input}
                  placeholder="Province"
                  value={formData.province}
                  onChangeText={(text) => setFormData({...formData, province: text})}
                  placeholderTextColor="#9CA3AF"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>
              {isLogin ? 'Login' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#F59E0B',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  storeOwnerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneIcon: {
    fontSize: 20,
  },
  addressIcon: {
    fontSize: 20,
  },
  locationIcon: {
    fontSize: 20,
  },
});