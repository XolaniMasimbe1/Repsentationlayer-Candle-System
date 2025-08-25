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
  Package, 
  Search,
  Filter,
  X,
  Save,
  DollarSign,
  Hash,
  Palette,
  Zap,
  Ruler
} from 'lucide-react-native';
import ApiService from '../services/api';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stockQuantity: '',
    scent: '',
    color: '',
    size: '',
    manufacturerId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, manufacturersData] = await Promise.all([
        ApiService.getAllProducts(),
        ApiService.getAllManufactures()
      ]);
      setProducts(productsData);
      setManufacturers(manufacturersData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.stockQuantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const manufacturer = manufacturers.find(m => m.manufacturerNumber === parseInt(formData.manufacturerId));
      if (!manufacturer) {
        Alert.alert('Error', 'Please select a valid manufacturer');
        return;
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        scent: formData.scent,
        color: formData.color,
        size: formData.size,
        manufacturer: manufacturer
      };

      const newProduct = await ApiService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      setShowAddModal(false);
      resetForm();
      Alert.alert('Success', 'Product added successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to add product: ${error.message}`);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct || !formData.name || !formData.price || !formData.stockQuantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const manufacturer = manufacturers.find(m => m.manufacturerNumber === parseInt(formData.manufacturerId));
      if (!manufacturer) {
        Alert.alert('Error', 'Please select a valid manufacturer');
        return;
      }

      const updatedProduct = {
        ...editingProduct,
        name: formData.name,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        scent: formData.scent,
        color: formData.color,
        size: formData.size,
        manufacturer: manufacturer
      };

      const result = await ApiService.updateProduct(updatedProduct);
      setProducts(prev => prev.map(p => p.productNumber === editingProduct.productNumber ? result : p));
      setEditingProduct(null);
      setShowAddModal(false);
      resetForm();
      Alert.alert('Success', 'Product updated successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to update product: ${error.message}`);
    }
  };

  const handleDeleteProduct = async (productNumber) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Note: Your backend might not have a delete endpoint
              // You might want to just update the stock to 0 or mark as inactive
              Alert.alert('Info', 'Delete functionality would be implemented based on your backend requirements');
            } catch (error) {
              Alert.alert('Error', `Failed to delete product: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      stockQuantity: '',
      scent: '',
      color: '',
      size: '',
      manufacturerId: ''
    });
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      stockQuantity: product.stockQuantity?.toString() || '',
      scent: product.scent || '',
      color: product.color || '',
      size: product.size || '',
      manufacturerId: product.manufacturer?.manufacturerNumber?.toString() || ''
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    resetForm();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.scent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.color?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductCard = (product) => (
    <View key={product.productNumber} style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productVariant}>
            {product.scent} • {product.color} • {product.size}
          </Text>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openEditModal(product)}
          >
            <Edit3 size={16} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteProduct(product.productNumber)}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.productDetails}>
        <View style={styles.detailRow}>
          <DollarSign size={16} color="#F59E0B" />
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>R{product.price}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Hash size={16} color="#6B7280" />
          <Text style={styles.detailLabel}>Stock:</Text>
          <Text style={[
            styles.detailValue,
            { color: product.stockQuantity > 10 ? '#059669' : product.stockQuantity > 0 ? '#F59E0B' : '#EF4444' }
          ]}>
            {product.stockQuantity} units
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Package size={16} color="#6B7280" />
          <Text style={styles.detailLabel}>Manufacturer:</Text>
          <Text style={styles.detailValue}>{product.manufacturer?.manufacturerName || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#F59E0B" />
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(renderProductCard)
          ) : (
            <View style={styles.noProductsContainer}>
              <Package size={64} color="#D1D5DB" />
              <Text style={styles.noProductsTitle}>No products found</Text>
              <Text style={styles.noProductsSubtitle}>
                {searchQuery ? 'Try adjusting your search' : 'Add your first product to get started'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Product Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Product Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Product Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Enter product name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Price and Stock */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Price (R) *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.price}
                  onChangeText={(text) => setFormData({...formData, price: text})}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Stock Quantity *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.stockQuantity}
                  onChangeText={(text) => setFormData({...formData, stockQuantity: text})}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Scent and Color */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Scent</Text>
                <TextInput
                  style={styles.input}
                  value={formData.scent}
                  onChangeText={(text) => setFormData({...formData, scent: text})}
                  placeholder="e.g., Vanilla"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Color</Text>
                <TextInput
                  style={styles.input}
                  value={formData.color}
                  onChangeText={(text) => setFormData({...formData, color: text})}
                  placeholder="e.g., White"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Size and Manufacturer */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Size</Text>
                <TextInput
                  style={styles.input}
                  value={formData.size}
                  onChangeText={(text) => setFormData({...formData, size: text})}
                  placeholder="e.g., Medium"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Manufacturer</Text>
                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerText}>
                    {formData.manufacturerId ? 
                      manufacturers.find(m => m.manufacturerNumber === parseInt(formData.manufacturerId))?.manufacturerName || 'Select' :
                      'Select Manufacturer'
                    }
                  </Text>
                </View>
              </View>
            </View>

            {/* Manufacturer Selection */}
            {formData.manufacturerId && (
              <View style={styles.selectedManufacturer}>
                <Text style={styles.selectedManufacturerText}>
                  Selected: {manufacturers.find(m => m.manufacturerNumber === parseInt(formData.manufacturerId))?.manufacturerName}
                </Text>
              </View>
            )}

            {/* Manufacturer List */}
            <View style={styles.manufacturerList}>
              <Text style={styles.sectionTitle}>Available Manufacturers</Text>
              {manufacturers.map(manufacturer => (
                <TouchableOpacity
                  key={manufacturer.manufacturerNumber}
                  style={[
                    styles.manufacturerItem,
                    formData.manufacturerId === manufacturer.manufacturerNumber.toString() && styles.selectedManufacturerItem
                  ]}
                  onPress={() => setFormData({...formData, manufacturerId: manufacturer.manufacturerNumber.toString()})}
                >
                  <Text style={styles.manufacturerName}>{manufacturer.manufacturerName}</Text>
                  {formData.manufacturerId === manufacturer.manufacturerNumber.toString() && (
                    <Text style={styles.selectedText}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Save Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={editingProduct ? handleEditProduct : handleAddProduct}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>
                {editingProduct ? 'Update Product' : 'Add Product'}
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
  productsContainer: {
    padding: 20,
  },
  productCard: {
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
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  productVariant: {
    fontSize: 14,
    color: '#6B7280',
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  productDetails: {
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
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
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
  noProductsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noProductsSubtitle: {
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 16,
    color: '#1F2937',
  },
  selectedManufacturer: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedManufacturerText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
  },
  manufacturerList: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  manufacturerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedManufacturerItem: {
    borderColor: '#F59E0B',
    backgroundColor: '#FEF3C7',
  },
  manufacturerName: {
    fontSize: 14,
    color: '#1F2937',
  },
  selectedText: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: 'bold',
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
});
