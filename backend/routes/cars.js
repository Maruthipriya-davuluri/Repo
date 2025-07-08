const express = require('express');
const { body, validationResult } = require('express-validator');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cars
// @desc    Get all cars with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      brand,
      priceMin,
      priceMax,
      fuelType,
      transmission,
      seats,
      availability,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (priceMin || priceMax) {
      filter.pricePerDay = {};
      if (priceMin) filter.pricePerDay.$gte = Number(priceMin);
      if (priceMax) filter.pricePerDay.$lte = Number(priceMax);
    }
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (seats) filter.seats = Number(seats);
    if (availability !== undefined) filter.availability = availability === 'true';

    // Sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const cars = await Car.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Car.countDocuments(filter);

    res.json({
      cars,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({ message: 'Server error while fetching cars' });
  }
});

// @route   GET /api/cars/:id
// @desc    Get single car by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Get car error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid car ID' });
    }
    res.status(500).json({ message: 'Server error while fetching car' });
  }
});

// @route   POST /api/cars
// @desc    Create a new car (Admin only)
// @access  Private/Admin
router.post('/', authenticate, requireAdmin, [
  body('brand').trim().isLength({ min: 1 }).withMessage('Brand is required'),
  body('model').trim().isLength({ min: 1 }).withMessage('Model is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Valid year is required'),
  body('licensePlate').trim().isLength({ min: 1 }).withMessage('License plate is required'),
  body('color').trim().isLength({ min: 1 }).withMessage('Color is required'),
  body('fuelType').isIn(['petrol', 'diesel', 'electric', 'hybrid']).withMessage('Valid fuel type is required'),
  body('transmission').isIn(['manual', 'automatic']).withMessage('Valid transmission type is required'),
  body('seats').isInt({ min: 2, max: 12 }).withMessage('Seats must be between 2 and 12'),
  body('pricePerDay').isFloat({ min: 0 }).withMessage('Price per day must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const carData = req.body;
    
    // Check if license plate already exists
    const existingCar = await Car.findOne({ licensePlate: carData.licensePlate.toUpperCase() });
    if (existingCar) {
      return res.status(400).json({ message: 'Car with this license plate already exists' });
    }

    const car = new Car(carData);
    await car.save();

    res.status(201).json({
      message: 'Car created successfully',
      car
    });
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({ message: 'Server error while creating car' });
  }
});

// @route   PUT /api/cars/:id
// @desc    Update car (Admin only)
// @access  Private/Admin
router.put('/:id', authenticate, requireAdmin, [
  body('brand').optional().trim().isLength({ min: 1 }).withMessage('Brand cannot be empty'),
  body('model').optional().trim().isLength({ min: 1 }).withMessage('Model cannot be empty'),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Valid year is required'),
  body('color').optional().trim().isLength({ min: 1 }).withMessage('Color cannot be empty'),
  body('fuelType').optional().isIn(['petrol', 'diesel', 'electric', 'hybrid']).withMessage('Valid fuel type is required'),
  body('transmission').optional().isIn(['manual', 'automatic']).withMessage('Valid transmission type is required'),
  body('seats').optional().isInt({ min: 2, max: 12 }).withMessage('Seats must be between 2 and 12'),
  body('pricePerDay').optional().isFloat({ min: 0 }).withMessage('Price per day must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const carId = req.params.id;
    const updateData = req.body;

    // If license plate is being updated, check for duplicates
    if (updateData.licensePlate) {
      const existingCar = await Car.findOne({ 
        licensePlate: updateData.licensePlate.toUpperCase(),
        _id: { $ne: carId }
      });
      if (existingCar) {
        return res.status(400).json({ message: 'Car with this license plate already exists' });
      }
    }

    const car = await Car.findByIdAndUpdate(
      carId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({
      message: 'Car updated successfully',
      car
    });
  } catch (error) {
    console.error('Update car error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid car ID' });
    }
    res.status(500).json({ message: 'Server error while updating car' });
  }
});

// @route   DELETE /api/cars/:id
// @desc    Delete car (Admin only)
// @access  Private/Admin
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const carId = req.params.id;

    // Check if car has active bookings
    const activeBookings = await Booking.find({
      car: carId,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete car with active bookings' 
      });
    }

    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Delete car error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid car ID' });
    }
    res.status(500).json({ message: 'Server error while deleting car' });
  }
});

// @route   GET /api/cars/available/:startDate/:endDate
// @desc    Get available cars for specific date range
// @access  Public
router.get('/available/:startDate/:endDate', async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    
    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Find cars that are not booked during the specified period
    const bookedCarIds = await Booking.find({
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ],
      status: { $in: ['pending', 'confirmed'] }
    }).distinct('car');

    const availableCars = await Car.find({
      _id: { $nin: bookedCarIds },
      availability: true
    });

    res.json(availableCars);
  } catch (error) {
    console.error('Available cars error:', error);
    res.status(500).json({ message: 'Server error while fetching available cars' });
  }
});

module.exports = router;