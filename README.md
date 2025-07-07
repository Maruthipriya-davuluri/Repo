# 🚗 Car Rental Booking System

A full-stack Car Rental Booking System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using JavaScript.

## 📋 Features

### 🔐 Authentication & Authorization
- User signup and login with JWT authentication
- Password hashing with bcrypt
- Role-based access control (User/Admin)
- Protected routes with middleware
- JWT token stored in localStorage
- Session management with automatic token verification

### 👤 User Features
- **User Registration & Login**: Secure authentication system
- **Browse Cars**: View all available cars with advanced filtering
- **Car Details**: Detailed view of each car with specifications
- **Book Cars**: Reserve cars for specific dates
- **Booking History**: View past and current bookings
- **Profile Management**: Update personal information

### 👨‍💼 Admin Features
- **Admin Dashboard**: Comprehensive management interface
- **Car Management**: Add, edit, delete cars from the fleet
- **Booking Management**: View and manage all customer bookings
- **User Management**: View and manage registered users
- **Analytics**: Business reports and statistics

### 🚙 Car Management
- **Car Filtering**: Filter by brand, price, fuel type, transmission, seats
- **Car Details**: Complete specifications and features
- **Availability Tracking**: Real-time availability status
- **Price Management**: Dynamic pricing per day

### 📝 Booking System
- **Date Selection**: Choose pickup and dropoff dates
- **Price Calculation**: Automatic total price calculation
- **Booking Status**: Track booking status (pending, confirmed, cancelled, completed)
- **Conflict Prevention**: Prevent double bookings for same dates

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logger

### Frontend
- **React.js**: Frontend library with functional components
- **React Router**: Client-side routing
- **React Hooks**: useState, useEffect, useContext
- **Axios**: HTTP client for API requests
- **CSS3**: Styling with responsive design
- **Context API**: State management for authentication

## 📁 Project Structure

```
car-rental-booking-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Car.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cars.js
│   │   └── bookings.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── ProtectedRoute.js
│       │   └── AdminRoute.js
│       ├── contexts/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   ├── Cars.js
│       │   ├── CarDetails.js
│       │   ├── BookCar.js
│       │   ├── Bookings.js
│       │   ├── Profile.js
│       │   └── AdminDashboard.js
│       └── App.js
├── package.json
├── .env
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-rental-booking-system
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (backend + frontend)
   npm run install-all
   
   # Or install separately:
   npm install  # Backend dependencies
   cd frontend && npm install  # Frontend dependencies
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/car-rental-db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

   For the frontend, create `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Atlas (cloud) by updating MONGODB_URI in .env
   ```

5. **Run the Application**
   
   **Option 1: Run both frontend and backend together**
   ```bash
   npm run dev
   ```
   
   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📝 Sample Data

To test the application, you can create sample data through the API or directly in MongoDB:

### Sample User (Admin)
```javascript
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "+1234567890",
  "address": "123 Admin Street, City, Country",
  "role": "admin"
}
```

### Sample Cars
```javascript
[
  {
    "brand": "Toyota",
    "model": "Camry",
    "year": 2023,
    "licensePlate": "ABC123",
    "color": "Blue",
    "fuelType": "hybrid",
    "transmission": "automatic",
    "seats": 5,
    "pricePerDay": 75,
    "availability": true,
    "description": "Comfortable mid-size sedan perfect for city and highway driving.",
    "features": ["GPS Navigation", "Bluetooth", "Backup Camera", "Automatic Climate Control"]
  },
  {
    "brand": "Honda",
    "model": "Civic",
    "year": 2023,
    "licensePlate": "XYZ789",
    "color": "Red",
    "fuelType": "petrol",
    "transmission": "manual",
    "seats": 5,
    "pricePerDay": 55,
    "availability": true,
    "description": "Reliable compact car with excellent fuel efficiency.",
    "features": ["Bluetooth", "USB Ports", "Air Conditioning"]
  }
]
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Cars
- `GET /api/cars` - Get all cars (with filtering)
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car (Admin only)
- `PUT /api/cars/:id` - Update car (Admin only)
- `DELETE /api/cars/:id` - Delete car (Admin only)
- `GET /api/cars/available/:startDate/:endDate` - Get available cars for date range

### Bookings
- `GET /api/bookings` - Get bookings (all for admin, user's own for users)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id/status` - Update booking status (Admin only)
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/user/:userId` - Get user's bookings
- `GET /api/bookings/stats` - Get booking statistics (Admin only)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Middleware to protect sensitive routes
- **Role-Based Access**: Different access levels for users and admins
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Secure cross-origin requests

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface
- **Loading States**: Visual feedback for all async operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time form validation with feedback
- **Navigation**: Smooth navigation with React Router

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set up environment variables on your hosting platform
2. Deploy the backend code
3. Update MongoDB connection string for production

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Update API URL in environment variables
3. Deploy the build folder

### Full-Stack Deployment (Railway/Heroku)
1. Create a unified deployment script
2. Set up environment variables
3. Configure build and start scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation above
2. Look through existing issues on GitHub
3. Create a new issue if needed
4. Contact the development team

## 🔄 Future Enhancements

- **Payment Integration**: Stripe/PayPal payment processing
- **Email Notifications**: Booking confirmations and reminders
- **Advanced Search**: Location-based search and filters
- **Review System**: Customer reviews and ratings
- **Mobile App**: React Native mobile application
- **Real-time Updates**: WebSocket for real-time notifications
- **Inventory Management**: Advanced fleet management tools
- **Reporting Dashboard**: Detailed analytics and business insights

---

**Happy Coding! 🚗💨**