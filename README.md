# 🕯️ Candle Management System - Mobile App

A comprehensive React Native mobile application for managing candle inventory, orders, and store operations with full RESTful API integration.

## 🚀 Features

### 🔐 Authentication & Store Management
- **Store Owner Registration**: Complete store registration with contact details
- **User Login**: Secure authentication system
- **Store Information**: Manage store details and contact information

### 📦 Product Management
- **Product Catalog**: Browse and search through candle products
- **Product Details**: View scent, color, size, price, and stock information
- **Stock Management**: Real-time inventory tracking
- **Manufacturer Integration**: Link products to manufacturers

### 🛒 Shopping Cart & Orders
- **Smart Cart System**: Add/remove products with quantity controls
- **Order Creation**: Seamless order placement with payment methods
- **Order Tracking**: Real-time order status updates
- **Order History**: Complete order management and status updates

### 💳 Payment & Billing
- **Multiple Payment Methods**: Cash, Credit Card, EFT
- **Automatic Invoice Generation**: Integrated billing system
- **Payment Processing**: Secure payment handling

### 🚚 Delivery Management
- **Delivery Tracking**: Monitor delivery status
- **Status Updates**: Real-time delivery status management

## 🏗️ Architecture

### Frontend (React Native)
- **Components**: Modular, reusable UI components
- **Context API**: Centralized state management
- **Hooks**: Custom hooks for API integration
- **Navigation**: Tab-based navigation system

### Backend Integration
- **RESTful API**: Full integration with Spring Boot backend
- **Real-time Updates**: Live data synchronization
- **Error Handling**: Comprehensive error management
- **Data Transformation**: Backend data to mobile-friendly format

## 📱 Screens & Components

### Main Screens
1. **Home (Products)**: Product catalog with search and filtering
2. **Cart**: Shopping cart management and checkout
3. **Orders**: Order tracking and management
4. **Profile**: User and store information

### Key Components
- `ProductCard`: Enhanced product display with cart integration
- `ProductManagement`: Store owner product management
- `LoginScreen`: Authentication and registration
- `CartContext`: Centralized cart and order management

## 🔧 Technical Implementation

### API Service (`services/api.js`)
```javascript
// Comprehensive API integration
- Authentication endpoints
- Product management
- Order processing
- Payment handling
- Delivery tracking
- Store management
```

### State Management (`context/CartContext.js`)
```javascript
// Centralized state management
- Cart operations
- Order management
- Store information
- User data
- Real-time updates
```

### Enhanced Components
- **ProductCard**: Shows cart status, quantity controls
- **Cart Screen**: Integrated order creation
- **Orders Screen**: Real-time status updates
- **Product Management**: Full CRUD operations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native development environment
- Android Studio / Xcode for mobile development

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

### Configuration
1. Update `services/api.js` with your backend URL
2. Ensure your Spring Boot backend is running
3. Configure your mobile development environment

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register/store` - Store registration

### Products
- `GET /product/all` - Get all products
- `POST /product/create` - Create new product
- `PUT /product/update` - Update product
- `GET /product/read/{id}` - Get product by ID

### Orders
- `POST /order/create` - Create new order
- `GET /order/all` - Get all orders
- `GET /order/store/{storeNumber}` - Get orders by store
- `PUT /order/update` - Update order status

### Payments
- `POST /payment/create` - Create payment
- `POST /payment-method/create` - Create payment method

### Delivery
- `POST /delivery/create` - Create delivery
- `GET /delivery/all` - Get all deliveries

## 📊 Data Flow

1. **User Authentication** → Store information loaded
2. **Product Loading** → Products fetched from API
3. **Cart Operations** → Local state management
4. **Order Creation** → Complete order with all entities
5. **Status Updates** → Real-time order tracking

## 🎯 Key Features

### Smart Cart System
- Automatic quantity management
- Real-time price calculations
- Stock validation
- Seamless checkout process

### Order Management
- Complete order lifecycle
- Status tracking
- Payment integration
- Delivery management

### Product Management
- Full CRUD operations
- Manufacturer integration
- Stock management
- Search and filtering

## 🔒 Security Features

- Secure API communication
- Input validation
- Error handling
- User authentication
- Data sanitization

## 📱 Mobile-First Design

- Responsive UI components
- Touch-friendly interfaces
- Native mobile patterns
- Performance optimization
- Offline capability support

## 🧪 Testing

### API Testing
- All endpoints tested with backend
- Error handling validation
- Data transformation verification
- Performance testing

### Component Testing
- UI component validation
- State management testing
- User interaction testing
- Cross-platform compatibility

## 🚀 Deployment

### Development
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Production Build
```bash
# Android APK
cd android && ./gradlew assembleRelease

# iOS Archive
# Use Xcode for iOS production builds
```

## 📈 Performance Optimization

- Lazy loading of components
- Efficient state management
- Optimized API calls
- Image optimization
- Memory management

## 🔮 Future Enhancements

- Push notifications
- Offline mode
- Advanced analytics
- Multi-language support
- Dark mode
- Advanced filtering
- Barcode scanning
- Inventory alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎉 Acknowledgments

- Spring Boot backend team
- React Native community
- UI/UX design team
- Testing and QA team

---

**Built with ❤️ for efficient candle business management**
