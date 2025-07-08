const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  totalDays: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required']
  },
  dropoffLocation: {
    type: String,
    required: [true, 'Dropoff location is required']
  },
  specialRequests: {
    type: String,
    maxlength: [300, 'Special requests cannot exceed 300 characters']
  }
}, {
  timestamps: true
});

// Validate that end date is after start date
bookingSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  
  // Calculate total days
  const timeDifference = this.endDate.getTime() - this.startDate.getTime();
  this.totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
  next();
});

// Index for better query performance
bookingSchema.index({ user: 1 });
bookingSchema.index({ car: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);