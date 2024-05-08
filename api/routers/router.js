const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const HelpController = require('../controllers/help_controller');
const UserController = require('../controllers/UserController');
const GymController = require('../controllers/GymController');
const ReelsController = require('../controllers/ReelsController');
const BookingController = require('../controllers/BookingController');
const AdminController = require('../controllers/AdminController');

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
router.post('/edit/gym/slots',GymController.edit_gym_slots);
router.post('/edit/gym/details',GymController.edit_gym_details);
router.post('/edit/gym/cover',GymController.edit_gym_cover);
router.post('/edit/gym/packages',GymController.edit_gym_packages);
router.post('/edit/gym/reviews',GymController.edit_gym_reviews);

// get-gym
router.post('/get/gym/profile',GymController.get_gym_profile);
router.post('/get/gyms',GymController.get_gyms);
router.post('/get/gym/details',GymController.get_gym_details);
router.post('/get/gym/reviews',GymController.get_gym_reviews);
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
router.post('/get/owner/booking',BookingController.get_owner_booking);
router.post('/get/owner/transaction',BookingController.get_owner_transaction);

// admin
router.post('/get/users/length',AdminController.get_users_length);
router.post('/get/gyms/length',AdminController.get_gyms_length);
router.post('/get/reels/length',AdminController.get_reels_length);
router.post('/get/bookings/length',AdminController.get_bookings_length);
router.post('/get/total/price',AdminController.get_total_price);
router.post('/get/admin/bookings',AdminController.get_admin_bookings);
router.post('/get/admin/transactions',AdminController.get_admin_transactions);
router.post('/create/gym',AdminController.create_gym);
router.post('/edit/admin/gym',AdminController.edit_admin_gym);
router.post('/get/admin/gyms',AdminController.get_admin_gyms);


module.exports = router;