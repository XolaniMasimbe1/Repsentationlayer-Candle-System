# 🔧 How to Change IP Address

## ✅ **CENTRALIZED CONFIGURATION SETUP COMPLETE!**

Now you only need to change the IP address in **ONE PLACE** and it will update across all API services!

### 📍 **Where to Change IP Address:**

**File:** `services/config.js`

**Line to change:**
```javascript
BASE_URL: 'http://192.168.12.236:8080/CandleSystem',
```

**Change to your new IP:**
```javascript
BASE_URL: 'http://YOUR_NEW_IP:8080/CandleSystem',
```

### 🎯 **What This Updates Automatically:**

✅ **All API Services Updated:**
- RetailStoreApi.js
- OrderApi.js  
- ProductApi.js
- AdminApi.js
- DriverApi.js
- PaymentApi.js
- PaymentMethodApi.js
- InvoiceApi.js
- DeliveryApi.js
- ManufactureApi.js
- OrderItemApi.js
- api.js (legacy)

### 🚀 **How It Works:**

1. **Single Source of Truth**: All API services import from `config.js`
2. **Automatic Updates**: Change IP once, updates everywhere
3. **Easy Maintenance**: No more searching through multiple files
4. **Consistent Configuration**: All services use the same base URL

### 📝 **Example:**

**Before (Old Way):**
```javascript
// Had to change in every file individually
const BASE_URL = 'http://192.168.12.236:8080/CandleSystem'; // RetailStoreApi.js
const BASE_URL = 'http://192.168.12.236:8080/CandleSystem'; // OrderApi.js
const BASE_URL = 'http://192.168.12.236:8080/CandleSystem'; // ProductApi.js
// ... and so on for every file
```

**After (New Way):**
```javascript
// services/config.js - CHANGE ONLY HERE!
const API_CONFIG = {
  BASE_URL: 'http://YOUR_NEW_IP:8080/CandleSystem',
  // ... other config
};

// All API services automatically use this:
import API_CONFIG from './config';
// Uses API_CONFIG.BASE_URL everywhere
```

### 🎉 **Benefits:**

- ✅ **One Change, Updates Everywhere**
- ✅ **No More File-by-File Updates**
- ✅ **Consistent Configuration**
- ✅ **Easy Maintenance**
- ✅ **Professional Architecture**

### 🔄 **To Change IP Address:**

1. Open `services/config.js`
2. Change the IP address in `BASE_URL`
3. Save the file
4. **DONE!** All API services now use the new IP

**That's it! No more going through files one by one!** 🎉
