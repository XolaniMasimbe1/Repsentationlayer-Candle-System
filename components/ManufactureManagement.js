/**
 * Manufacture Management Component for Candle System
 * 
 * This component provides CRUD operations for manufacturers, allowing admins to
 * create, read, update, and manage manufacturer information.
 * 
 * References:
 * - React Native CRUD Operations: https://reactnative.dev/docs/textinput
 * - Form Validation: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * - API Integration: https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - Modal Management: https://reactnative.dev/docs/modal
 * 
 * YouTube Tutorials Referenced:
 * - "React Native CRUD Operations" by Programming with Mosh
 * - "Form Management in React Native" by The Net Ninja
 * - "API Integration in React Native" by Codevolution
 * - "Modal Components in React Native" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
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
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Factory, 
  Search,
  Filter,
  X,
  Save,
  Building,
  MapPin,
  Phone,
  Mail
} from 'lucide-react-native';
import { ManufactureApi } from '../services';

export default function ManufactureManagement() {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState(null);
  const [formData, setFormData] = useState({
    manufacturerName: ''
  });

  useEffect(() => {
    loadManufacturers();
  }, []);

  const loadManufacturers = async () => {
    try {
      setLoading(true);
      const manufacturersData = await ManufactureApi.getAll();
      setManufacturers(manufacturersData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load manufacturers');
      console.error('Error loading manufacturers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddManufacturer = async () => {
    if (!formData.manufacturerName) {
      Alert.alert('Error', 'Please fill in manufacturer name');
      return;
    }

    try {
      const newManufacturer = await ManufactureApi.create(formData);
      setManufacturers(prev => [...prev, newManufacturer]);
      setShowAddModal(false);
      resetForm();
      Alert.alert('Success', 'Manufacturer added successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to add manufacturer: ${error.message}`);
    }
  };

  const handleEditManufacturer = async () => {
    if (!editingManufacturer || !formData.manufacturerName) {
      Alert.alert('Error', 'Please fill in manufacturer name');
      return;
    }

    try {
      const updatedManufacturer = {
        ...editingManufacturer,
        ...formData
      };

      const result = await ManufactureApi.update(updatedManufacturer);
      setManufacturers(prev => prev.map(m => m.manufacturerNumber === editingManufacturer.manufacturerNumber ? result : m));
      setEditingManufacturer(null);
      setShowAddModal(false);
      resetForm();
      Alert.alert('Success', 'Manufacturer updated successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to update manufacturer: ${error.message}`);
    }
  };

  const handleDeleteManufacturer = async (manufacturerNumber) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this manufacturer? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Note: Your backend might not have a delete endpoint
              // You might want to implement soft delete or mark as inactive
              Alert.alert('Info', 'Delete functionality would be implemented based on your backend requirements');
            } catch (error) {
              Alert.alert('Error', `Failed to delete manufacturer: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setFormData({
      manufacturerName: ''
    });
  };

  const openEditModal = (manufacturer) => {
    setEditingManufacturer(manufacturer);
    setFormData({
      manufacturerName: manufacturer.manufacturerName || ''
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingManufacturer(null);
    resetForm();
  };

  const filteredManufacturers = manufacturers.filter(manufacturer =>
    manufacturer.manufacturerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderManufacturerCard = (manufacturer) => (
    <View key={manufacturer.manufacturerNumber} style={styles.manufacturerCard}>
      <View style={styles.manufacturerHeader}>
        <View style={styles.manufacturerInfo}>
          <Text style={styles.manufacturerName}>{manufacturer.manufacturerName}</Text>
          <Text style={styles.manufacturerLocation}>
            Manufacturer ID: {manufacturer.manufacturerNumber}
          </Text>
        </View>
        <View style={styles.manufacturerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openEditModal(manufacturer)}
          >
            <Edit3 size={16} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteManufacturer(manufacturer.manufacturerNumber)}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.manufacturerDetails}>
        <View style={styles.detailRow}>
          <Factory size={16} color="#6B7280" />
          <Text style={styles.detailLabel}>ID:</Text>
          <Text style={styles.detailValue}>{manufacturer.manufacturerNumber}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Building size={16} color="#6B7280" />
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{manufacturer.manufacturerName}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Loading manufacturers...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manufacturer Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Manufacturer</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search manufacturers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#F59E0B" />
        </TouchableOpacity>
      </View>

      {/* Manufacturers List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.manufacturersContainer}>
          {filteredManufacturers.length > 0 ? (
            filteredManufacturers.map(renderManufacturerCard)
          ) : (
            <View style={styles.noManufacturersContainer}>
              <Factory size={64} color="#D1D5DB" />
              <Text style={styles.noManufacturersTitle}>No manufacturers found</Text>
              <Text style={styles.noManufacturersSubtitle}>
                {searchQuery ? 'Try adjusting your search' : 'Add your first manufacturer to get started'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Manufacturer Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingManufacturer ? 'Edit Manufacturer' : 'Add New Manufacturer'}
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Manufacturer Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Manufacturer Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.manufacturerName}
                onChangeText={(text) => setFormData({...formData, manufacturerName: text})}
                placeholder="Enter manufacturer name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Information Note */}
            <View style={styles.infoCard}>
              <Factory size={20} color="#F59E0B" />
              <Text style={styles.infoText}>
                This manufacturer will be available for selection when creating products.
              </Text>
            </View>
          </ScrollView>

          {/* Save Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={editingManufacturer ? handleEditManufacturer : handleAddManufacturer}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>
                {editingManufacturer ? 'Update Manufacturer' : 'Add Manufacturer'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 16,
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  manufacturersContainer: {
    padding: 20,
  },
  manufacturerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  manufacturerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  manufacturerInfo: {
    flex: 1,
  },
  manufacturerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  manufacturerLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  manufacturerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  manufacturerDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    minWidth: 60,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  noManufacturersContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noManufacturersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noManufacturersSubtitle: {
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
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});
