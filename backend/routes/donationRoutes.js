const express = require('express');
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes in this file
router.use(authMiddleware.protect);

router.post('/', donationController.createDonation);
router.get('/my', donationController.getMyDonations);
router.get('/available', donationController.getAvailableDonations);
router.post('/:id/claim', donationController.claimDonation);
router.patch('/:id', donationController.updateDonation);

module.exports = router;
