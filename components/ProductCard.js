import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, onAddToCart, showQuantityControls = true }) {
  const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    isProductInCart, 
    getProductQuantityInCart 
  } = useCart();

  const isInCart = isProductInCart(product.productNumber);
  const cartQuantity = getProductQuantityInCart(product.productNumber);

  const handleAddToCart = () => {
    addToCart(product);
    if (onAddToCart) onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.productNumber);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product.productNumber);
    } else {
      updateQuantity(product.productNumber, newQuantity);
    }
  };

  const renderQuantityControls = () => {
    if (!showQuantityControls || !isInCart) return null;

    return (
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(cartQuantity - 1)}
        >
          <Minus size={14} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{cartQuantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(cartQuantity + 1)}
        >
          <Plus size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddToCartButton = () => {
    if (isInCart) {
      return (
        <View style={styles.inCartIndicator}>
          <ShoppingCart size={16} color="#10B981" />
          <Text style={styles.inCartText}>In Cart</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Plus size={16} color="#FFFFFF" />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.details}>
          {product.scent} • {product.color} • {product.size}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{product.rating || '4.5'}</Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>R{product.price}</Text>
          {renderAddToCartButton()}
        </View>
        
        <Text style={styles.stock}>{product.stockQuantity} in stock</Text>
        
        {renderQuantityControls()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  addButton: {
    backgroundColor: '#F59E0B',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inCartIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  inCartText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  stock: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    backgroundColor: '#F59E0B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
});