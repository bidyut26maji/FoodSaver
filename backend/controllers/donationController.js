const Donation = require('../models/Donation');

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
