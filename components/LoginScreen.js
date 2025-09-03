/**
 * Login Screen Component for Candle System
 * 
 * This component handles user authentication for different user types (Store Owner, Admin, Driver)
 * with dynamic form fields and API integration.
 * 
 * References:
 * - React Native Forms: https://reactnative.dev/docs/textinput
 * - Form Validation: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * - Authentication Flow: https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - Dynamic Form Fields: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * 
 * YouTube Tutorials Referenced:
 * - "React Native Forms Tutorial" by Programming with Mosh
 * - "Authentication in React Native" by The Net Ninja
 * - "Form Validation in React Native" by Codevolution
 * - "Dynamic Forms in React" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * 
 * Baeldung References:
 * - https://www.baeldung.com/spring-security-authentication
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 */
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
import { Mail, Lock, User, Store, Shield, Truck } from 'lucide-react-native';
import { RetailStoreApi, AdminApi /*, DriverApi - TEMPORARILY DISABLED */ } from '../services';
import { useCart } from '../context/CartContext';

export default function LoginScreen({ onLogin }) {
  const { setUser, setStoreInfo, loadStoreInfo } = useCart();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('store'); // 'store', 'admin' // 'driver' - TEMPORARILY DISABLED
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
    // licenseNumber: '', // For drivers - TEMPORARILY DISABLED
    // vehicleType: '', // For drivers - TEMPORARILY DISABLED
  });

  // Test backend connection on component mount
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        const isConnected = await RetailStoreApi.getAll();
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
        let result;
        
        // Login based on user type
        if (userType === 'store') {
          result = await RetailStoreApi.login({
            user: { username: formData.username, password: formData.password }
          });
        } else if (userType === 'admin') {
          result = await AdminApi.login({
            user: { username: formData.username, password: formData.password }
          });
        }
        // DRIVER FUNCTIONALITY TEMPORARILY DISABLED
        // } else if (userType === 'driver') {
        //   result = await DriverApi.login({
        //     user: { username: formData.username, password: formData.password }
        //   });
        // }

        if (result) {
          console.log('Login successful for', userType, ':', result);
          
          // Set user data based on type
          if (userType === 'store') {
            setUser(result.user);
            setStoreInfo(result);
          } else if (userType === 'admin') {
            setUser(result.user);
            // Admin doesn't have store info
          }
          // DRIVER FUNCTIONALITY TEMPORARILY DISABLED
          // } else if (userType === 'driver') {
          //   setUser(result.user);
          //   // Driver doesn't have store info
          // }
          
          onLogin();
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } else {
      try {
        let result;
        
        // Registration based on user type
        if (userType === 'store') {
          const registrationData = {
            user: {
              username: formData.username,
              password: formData.password,
              contactDetails: {
                email: formData.email,
                phoneNumber: formData.phone,
                postalCode: formData.postalCode,
                street: formData.street,
                city: formData.city,
                province: formData.province,
                country: formData.country
              }
            },
            storeName: formData.storeName
          };
          
          result = await RetailStoreApi.register(registrationData);
        } else if (userType === 'admin') {
          const registrationData = {
            user: {
              username: formData.username,
              password: formData.password,
              contactDetails: {
                email: formData.email,
                phoneNumber: formData.phone,
                postalCode: formData.postalCode,
                street: formData.street,
                city: formData.city,
                province: formData.province,
                country: formData.country
              }
            }
          };
          
          result = await AdminApi.register(registrationData);
        }
        // DRIVER FUNCTIONALITY TEMPORARILY DISABLED
        // } else if (userType === 'driver') {
        //   const registrationData = {
        //     user: {
        //       username: formData.username,
        //       password: formData.password,
        //       contactDetails: {
        //         email: formData.email,
        //         phoneNumber: formData.phone,
        //         postalCode: formData.postalCode,
        //         street: formData.street,
        //         city: formData.city,
        //         province: formData.province,
        //         country: formData.country
        //       }
        //     },
        //     licenseNumber: formData.licenseNumber,
        //     vehicleType: formData.vehicleType
        //   };
        //   
        //   result = await DriverApi.register(registrationData);
        // }

        if (result) {
          console.log('Registration successful for', userType, ':', result);
          
          // Set user data based on type
          if (userType === 'store') {
            setUser(result.user);
            setStoreInfo(result);
          } else if (userType === 'admin') {
            setUser(result.user);
          }
          // DRIVER FUNCTIONALITY TEMPORARILY DISABLED
          // } else if (userType === 'driver') {
          //   setUser(result.user);
          // }
          
          Alert.alert('Success', `${userType.charAt(0).toUpperCase() + userType.slice(1)} registered successfully`, [
            { text: 'OK', onPress: () => setIsLogin(true) }
          ]);
        } else {
          Alert.alert('Error', 'Registration failed');
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
          <Text style={styles.title}>Ezelina Candle</Text>
          <Text style={styles.subtitle}>Illuminating Moments, Crafting Memories</Text>
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

          {/* User Type Selection */}
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'store' && styles.activeUserType]}
              onPress={() => setUserType('store')}
            >
              <Store size={20} color={userType === 'store' ? '#FFFFFF' : '#6B7280'} />
              <Text style={[styles.userTypeText, userType === 'store' && styles.activeUserTypeText]}>
                Store Owner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'admin' && styles.activeUserType]}
              onPress={() => setUserType('admin')}
            >
              <Shield size={20} color={userType === 'admin' ? '#FFFFFF' : '#6B7280'} />
              <Text style={[styles.userTypeText, userType === 'admin' && styles.activeUserTypeText]}>
                Admin
              </Text>
            </TouchableOpacity>
            {/* DRIVER FUNCTIONALITY TEMPORARILY DISABLED */}
            {/* <TouchableOpacity
              style={[styles.userTypeButton, userType === 'driver' && styles.activeUserType]}
              onPress={() => setUserType('driver')}
            >
              <Truck size={20} color={userType === 'driver' ? '#FFFFFF' : '#6B7280'} />
              <Text style={[styles.userTypeText, userType === 'driver' && styles.activeUserTypeText]}>
                Driver
              </Text>
            </TouchableOpacity> */}
          </View>

          {!isLogin && (
            <View style={styles.userTypeBanner}>
              {userType === 'store' && (
                <>
                  <Store size={24} color="#F59E0B" />
                  <Text style={styles.bannerText}>Store Owner Registration</Text>
                </>
              )}
              {userType === 'admin' && (
                <>
                  <Shield size={24} color="#F59E0B" />
                  <Text style={styles.bannerText}>Admin Registration</Text>
                </>
              )}
              {/* DRIVER FUNCTIONALITY TEMPORARILY DISABLED */}
              {/* {userType === 'driver' && (
                <>
                  <Truck size={24} color="#F59E0B" />
                  <Text style={styles.bannerText}>Driver Registration</Text>
                </>
              )} */}
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
              {/* Store-specific fields */}
              {userType === 'store' && (
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
              )}

              {/* DRIVER FUNCTIONALITY TEMPORARILY DISABLED */}
              {/* Driver-specific fields */}
              {/* {userType === 'driver' && (
                <>
                  <View style={styles.inputContainer}>
                    <Truck size={20} color="#6B7280" />
                    <TextInput
                      style={styles.input}
                      placeholder="License Number"
                      value={formData.licenseNumber}
                      onChangeText={(text) => setFormData({...formData, licenseNumber: text})}
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="next"
                      onSubmitEditing={() => focusNextField(emailRef)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Truck size={20} color="#6B7280" />
                    <TextInput
                      style={styles.input}
                      placeholder="Vehicle Type (e.g., Van, Truck)"
                      value={formData.vehicleType}
                      onChangeText={(text) => setFormData({...formData, vehicleType: text})}
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="next"
                      onSubmitEditing={() => focusNextField(emailRef)}
                    />
                  </View>
                </>
              )} */}

              {/* Common fields for all user types */}
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
  userTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeUserType: {
    backgroundColor: '#F59E0B',
  },
  userTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 4,
  },
  activeUserTypeText: {
    color: '#FFFFFF',
  },
  userTypeBanner: {
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