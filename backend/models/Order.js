const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: [true, 'Donation ID is required'],
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Restaurant ID is required'],
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'NGO ID is required'],
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'In Transit', 'Completed', 'Cancelled'],
            message: '{VALUE} is not a valid status',
        },
        default: 'Pending',
    },
    claimedAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    feedback: {
        type: String,
        trim: true,
    },
    pickupCode: {
        type: String,
        // Could be a simple 6-digit code for verification
    }
}, {
    timestamps: true,
});

// Middleware to update donation status when order is created/completed
// Note: In a production app, this would be handled in the controller/service layer
// but we can add hooks if necessary.

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
