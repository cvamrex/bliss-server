var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');
var Transaction = mongoose.model('Transaction');

exports.create_booking = function(req,res,next){
    const {user,receive,gym,date,day,time,package,price,payment_id} = req.body;
    const booking_data = {
        user,
        receive,
        gym,
        date,
        day,
        time,
        package,
        price,
        payment_id
    };
    Booking.create(booking_data)
    .then(() => {
        res.json({ success: true, message: 'Booking created successfully' });
    })
    .catch(error => {
        console.error('Error creating Booking:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    });
}

exports.get_booking = function(req, res, next) {
    const { user } = req.body;
    Booking.find({ user }).populate('gym', 'name address').sort('-createdAt')
        .then(booking => {
            if (booking) {
                res.json({ success: true, booking: booking });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Booking:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_owner_booking = function(req, res, next) {
    const { receive } = req.body;
    Booking.find({ receive }).populate('gym', 'name address').sort('-createdAt')
        .then(booking => {
            if (booking) {
                res.json({ success: true, booking: booking });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Booking:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_owner_transaction = function(req, res, next) {
    const { receive } = req.body;
    Transaction.find({ receive }).populate('gym', 'name').populate('user', 'name').populate('receive', 'name').sort('-createdAt')
        .then(trans => {
            if (trans) {
                res.json({ success: true, transaction: trans });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Booking:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_transaction = function(req, res, next) {
    const { user } = req.body;
    Transaction.find({ user }).populate('gym', 'name').populate('user', 'name').populate('receive', 'name').sort('-createdAt')
        .then(trans => {
            if (trans) {
                res.json({ success: true, transaction: trans });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Booking:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};

exports.create_transaction = function(req,res,next){
    const {user,receive,gym,date,price,payment_id} = req.body;
    const booking_data = {
        user,
        receive,
        gym,
        date,
        price,
        payment_id
    };
    Transaction.create(booking_data)
    .then(() => {
        res.json({ success: true, message: 'Transaction created successfully' });
    })
    .catch(error => {
        console.error('Error creating Transaction:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    });
}

