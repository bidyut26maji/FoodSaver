const Donation = require('../models/Donation');
const Order = require('../models/Order');
const User = require('../models/User');

exports.createDonation = async (req, res, next) => {
    try {
        // req.user is populated by protect middleware
        const {
            foodName,
            quantity,
            quantityUnit,
            expiryTime,
            pickupAddress,
            description,
            category,
            imageUrl
        } = req.body;

        const newDonation = await Donation.create({
            donorId: req.user.id,
            foodName,
            quantity,
            quantityUnit,
            expiryTime,
            pickupAddress,
            description,
            category,
            imageUrl
        });

        res.status(201).json({
            status: 'success',
            message: 'Donation created successfully',
            data: {
                donation: newDonation,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};

exports.getMyDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find({ donorId: req.user.id }).sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: donations.length,
            data: {
                donations,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};

exports.updateDonation = async (req, res, next) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation not found',
            });
        }

        // Check ownership
        if (donation.donorId.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'You do not have permission to update this donation',
            });
        }

        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'success',
            message: 'Donation updated successfully',
            data: {
                donation: updatedDonation,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};

exports.getAvailableDonations = async (req, res, next) => {
    try {
        // Find all donations with status 'Available'
        // In the future, we can add geo-spatial filtering here
        const donations = await Donation.find({ status: 'Available' }).sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: donations.length,
            data: {
                donations,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};

exports.claimDonation = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        // Ensure only NGOs can claim
        if (user.organizationType !== 'ngo') {
            return res.status(403).json({
                status: 'error',
                message: 'Only NGOs are permitted to claim donations',
            });
        }

        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation not found',
            });
        }

        if (donation.status !== 'Available') {
            return res.status(400).json({
                status: 'error',
                message: `This donation is already ${donation.status.toLowerCase()}`,
            });
        }

        // Update donation status
        donation.status = 'Claimed';
        await donation.save();

        // Create an order
        const order = await Order.create({
            donationId: donation._id,
            restaurantId: donation.donorId,
            ngoId: req.user.id,
            status: 'Pending',
            claimedAt: Date.now(),
        });

        res.status(200).json({
            status: 'success',
            message: 'Donation claimed successfully',
            data: {
                donation,
                order,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};
