const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Donor ID is required'],
    },
    foodName: {
        type: String,
        required: [true, 'Food item name is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    quantityUnit: {
        type: String,
        enum: {
            values: ['kg', 'meals', 'units'],
            message: '{VALUE} is not a valid unit',
        },
        default: 'kg',
    },
    status: {
        type: String,
        enum: {
            values: ['Available', 'Claimed', 'Delivered', 'Cancelled'],
            message: '{VALUE} is not a valid status',
        },
        default: 'Available',
    },
    expiryTime: {
        type: Date,
        required: [true, 'Expiry time is required'],
    },
    pickupAddress: {
        type: String,
        required: [true, 'Pickup address is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ['Veg', 'Non-Veg', 'Vegan', 'Other'],
        default: 'Other',
    },
    imageUrl: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
});

// Index for geo-queries if needed later
// donationSchema.index({ "location": "2dsphere" });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
