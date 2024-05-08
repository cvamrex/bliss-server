var mongoose = require('mongoose');
var User = mongoose.model('User');
var Gym = mongoose.model('Gym');
var Reels = mongoose.model('Reels');
var Booking = mongoose.model('Booking');
var Transaction = mongoose.model('Transaction');


exports.get_users_length = function(req,res,next){
    User.countDocuments({})
        .then(count => {
            res.json({ success: true, user: count });
        })
        .catch(error => {
            console.error('Error retrieving user count:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
}
exports.get_gyms_length = function(req,res,next){
    Gym.countDocuments({})
        .then(count => {
            res.json({ success: true, gym: count });
        })
        .catch(error => {
            console.error('Error retrieving user count:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
}
exports.get_reels_length = function(req,res,next){
    Reels.countDocuments({})
        .then(count => {
            res.json({ success: true, reels: count });
        })
        .catch(error => {
            console.error('Error retrieving user count:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
}
exports.get_bookings_length = function(req,res,next){
    Booking.countDocuments({})
        .then(count => {
            res.json({ success: true, booking: count });
        })
        .catch(error => {
            console.error('Error retrieving user count:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
}
exports.get_total_price = function(req,res,next){
    Transaction.aggregate([
        {
            $project: {
                price: { $toDouble: "$price" } 
            }
        },
        {
            $group: {
                _id: null, 
                totalPrice: { $sum: "$price" } 
            }
        }
    ])
    .then(result => {
        if (result.length > 0) {
            res.json({ success: true, totalPrice: result[0].totalPrice });
        } else {
            res.json({ success: true, totalPrice: 0 }); 
        }
    })
    .catch(error => {
        console.error('Error calculating total price:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    });
}
exports.get_admin_bookings = function(req, res, next) {
    Booking.find({}).populate('gym', 'name address').sort('-createdAt')
        .then(booking => {
            if (booking.length > 0) {
                res.json({ success: true, bookings:booking });
            } else {
                res.status(404).json({ success: false, message: 'No reels found' });
            }
        })
        .catch(error => {
            console.error('Error finding reels:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_admin_transactions = function(req, res, next) {
    Transaction.find({}).populate('gym', 'name').populate('user', 'name').sort('-createdAt')
        .then(transaction => {
            if (transaction.length > 0) {
                res.json({ success: true, transactions:transaction });
            } else {
                res.status(404).json({ success: false, message: 'No reels found' });
            }
        })
        .catch(error => {
            console.error('Error finding reels:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.create_gym = function(req, res, next) {
    const { user, name, address, city, opening_time, closing_time, gender, about, amenities,machines,
        images,video,hour_package,packages,days,morning_time,evening_time,active } = req.body;
    const gymData = {
        user, name, address, city, opening_time, closing_time, gender, about, amenities,machines,
        images,video,hour_package,packages,days,morning_time,evening_time,active
    };
    Gym.create(gymData)
    .then(() => {
        res.json({ success: true, message: 'Gym created successfully' });
    })
    .catch(error => {
        console.error('Error creating Gym:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    });
    
};
exports.edit_admin_gym = function(req, res, next) {
    const {id, user, name, address, city, opening_time, closing_time, gender, about, amenities,machines,
        images,video,hour_package,packages,days,morning_time,evening_time,active } = req.body;
    const gymData = {
        user, name, address, city, opening_time, closing_time, gender, about, amenities,machines,
        images,video,hour_package,packages,days,morning_time,evening_time,active
    };
    Gym.create(gymData)
    .then(() => {
        res.json({ success: true, message: 'Gym created successfully' });
    })
    .catch(error => {
        console.error('Error creating Gym:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    });
    
};
exports.get_admin_gyms = function(req, res, next) {
    const { user } = req.body;
    Gym.find({ user })
        .then(gym => {
            if (gym) {
                res.json({ success: true, gym: gym });
            } else {
                res.status(404).json({ success: false, message: 'Gym not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
