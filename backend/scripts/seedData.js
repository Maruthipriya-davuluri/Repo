const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '+1234567890',
    address: '123 Admin Street, New York, NY 10001',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    phone: '+1987654321',
    address: '456 User Avenue, Los Angeles, CA 90001',
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'user123',
    phone: '+1122334455',
    address: '789 Customer Street, Chicago, IL 60001',
    role: 'user'
  }
];

const sampleCars = [
  {
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    licensePlate: 'ABC123',
    color: 'Blue',
    fuelType: 'hybrid',
    transmission: 'automatic',
    seats: 5,
    pricePerDay: 75,
    availability: true,
    description: 'Comfortable mid-size sedan perfect for city and highway driving. Features advanced safety technology and excellent fuel efficiency.',
    features: ['GPS Navigation', 'Bluetooth Connectivity', 'Backup Camera', 'Automatic Climate Control', 'Lane Departure Warning'],
    mileage: 15000
  },
  {
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
    licensePlate: 'XYZ789',
    color: 'Red',
    fuelType: 'petrol',
    transmission: 'manual',
    seats: 5,
    pricePerDay: 55,
    availability: true,
    description: 'Reliable compact car with excellent fuel efficiency and sporty design. Perfect for city driving and daily commutes.',
    features: ['Bluetooth Connectivity', 'USB Ports', 'Air Conditioning', 'Power Steering'],
    mileage: 12000
  },
  {
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    licensePlate: 'LUX001',
    color: 'Black',
    fuelType: 'petrol',
    transmission: 'automatic',
    seats: 7,
    pricePerDay: 150,
    availability: true,
    description: 'Luxury SUV with premium features and spacious interior. Ideal for family trips and business travel.',
    features: ['Premium Sound System', 'Leather Seats', 'Panoramic Sunroof', 'Advanced Safety Features', 'All-Wheel Drive'],
    mileage: 25000
  },
  {
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    licensePlate: 'EV2023',
    color: 'White',
    fuelType: 'electric',
    transmission: 'automatic',
    seats: 5,
    pricePerDay: 120,
    availability: true,
    description: 'Electric luxury sedan with cutting-edge technology and zero emissions. Features autopilot and supercharging capability.',
    features: ['Autopilot', 'Premium Connectivity', 'Glass Roof', 'Wireless Charging', 'Over-the-Air Updates'],
    mileage: 8000
  },
  {
    brand: 'Ford',
    model: 'F-150',
    year: 2022,
    licensePlate: 'TRUCK1',
    color: 'Silver',
    fuelType: 'petrol',
    transmission: 'automatic',
    seats: 5,
    pricePerDay: 95,
    availability: true,
    description: 'Powerful pickup truck perfect for hauling and outdoor adventures. Features impressive towing capacity and durability.',
    features: ['Towing Package', '4WD', 'Bed Liner', 'Backup Camera', 'Bluetooth'],
    mileage: 30000
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2023,
    licensePlate: 'VW2023',
    color: 'Green',
    fuelType: 'diesel',
    transmission: 'manual',
    seats: 5,
    pricePerDay: 65,
    availability: true,
    description: 'Compact hatchback with European styling and efficient diesel engine. Great for city driving and longer trips.',
    features: ['Fuel Efficient', 'Compact Design', 'Modern Interior', 'Safety Features'],
    mileage: 18000
  },
  {
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    licensePlate: 'MB2022',
    color: 'Gray',
    fuelType: 'petrol',
    transmission: 'automatic',
    seats: 5,
    pricePerDay: 130,
    availability: false,
    description: 'Luxury sedan with premium amenities and sophisticated design. Perfect for business meetings and special occasions.',
    features: ['Premium Interior', 'Advanced Infotainment', 'Ambient Lighting', 'Premium Sound', 'Safety Assist'],
    mileage: 22000
  },
  {
    brand: 'Nissan',
    model: 'Altima',
    year: 2023,
    licensePlate: 'NIS123',
    color: 'Orange',
    fuelType: 'hybrid',
    transmission: 'automatic',
    seats: 5,
    pricePerDay: 70,
    availability: true,
    description: 'Mid-size sedan with hybrid efficiency and modern technology. Comfortable and reliable for all types of journeys.',
    features: ['Hybrid Engine', 'Apple CarPlay', 'Android Auto', 'Safety Shield', 'Intelligent Cruise Control'],
    mileage: 16000
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-rental-db';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Car.deleteMany({});
    await Booking.deleteMany({});
    console.log('Existing data cleared');

    // Hash passwords for users
    for (let user of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert sample users
    console.log('Inserting sample users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`${createdUsers.length} users created`);

    // Insert sample cars
    console.log('Inserting sample cars...');
    const createdCars = await Car.insertMany(sampleCars);
    console.log(`${createdCars.length} cars created`);

    // Create sample bookings
    console.log('Creating sample bookings...');
    const userUser = createdUsers.find(user => user.role === 'user');
    const availableCar = createdCars.find(car => car.availability === true);

    if (userUser && availableCar) {
      const sampleBooking = {
        user: userUser._id,
        car: availableCar._id,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-05'),
        totalDays: 4,
        totalPrice: availableCar.pricePerDay * 4,
        status: 'confirmed',
        paymentStatus: 'paid',
        pickupLocation: 'Main Office - 123 Rental Street',
        dropoffLocation: 'Main Office - 123 Rental Street',
        specialRequests: 'Please have the car ready by 9 AM'
      };

      await Booking.create(sampleBooking);
      console.log('1 sample booking created');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Data Summary:');
    console.log(`👥 Users: ${createdUsers.length}`);
    console.log(`🚗 Cars: ${createdCars.length}`);
    console.log(`📅 Bookings: 1`);
    
    console.log('\n🔐 Sample Login Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: john@example.com / user123');
    console.log('User: jane@example.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();