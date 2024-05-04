const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const HelpController = require('../controllers/help_controller');
const UserController = require('../controllers/UserController');
const GymController = require('../controllers/GymController');
const ReelsController = require('../controllers/ReelsController');
const BookingController = require('../controllers/BookingController');

// create-user
router.post('/send-otp',AuthController.sendOtp);
router.post('/verify-otp',AuthController.verifyOtp);
router.post('/create-profile',UserController.create_user);
router.post('/edit/profile',UserController.edit_profile);
router.post('/get/profile',UserController.get_profile);
router.post('/get/name',UserController.get_name);
router.post('/get/favourites',UserController.get_favourites);
router.post('/toggle/favourite',UserController.toggle_favourite);

// create-gym
router.post('/edit/gym/details',GymController.edit_gym_slots);
router.post('/edit/gym/packages',GymController.edit_gym_packages);

// get-gym
router.post('/get/gym/profile',GymController.get_gym_profile);
router.post('/get/gyms',GymController.get_gyms);
router.post('/get/gym/details',GymController.get_gym_details);
router.post('/toggle/active',GymController.toggle_active);
router.post('/search/gyms',GymController.search_gyms);
// reel
router.post('/create/reel',ReelsController.create_reel);
router.post('/get/reels',ReelsController.get_reels);
router.post('/get/user/reel',ReelsController.get_user_reel);

// booking

router.post('/create/booking',BookingController.create_booking);
router.post('/get/booking',BookingController.get_booking);
router.post('/create/transaction',BookingController.create_transaction);
router.post('/get/transaction',BookingController.get_transaction);


module.exports = router;