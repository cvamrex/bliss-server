var mongoose = require('mongoose');
var Reels = mongoose.model('Reels');

exports.create_reel = function(req, res, next) {
    const { user, url,name,image} = req.body;
    const reelData = {
        user,
        url,
        name,
       image
    };
    Reels.create(reelData)
        .then(() => {
            res.json({ success: true, message: 'Reel created successfully' });
        })
        .catch(error => {
            console.error('Error creating Reel:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_reels = function(req, res, next) {
    Reels.find({})
        .then(reels => {
            if (reels.length > 0) {
                res.json({ success: true, reels: reels });
            } else {
                res.status(404).json({ success: false, message: 'No reels found' });
            }
        })
        .catch(error => {
            console.error('Error finding reels:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};

exports.get_user_reel = function(req, res, next) {
    const { id } = req.body;
    Reels.find({user:id })
        .then(reel => {
            if (reel) {
                res.json({ success: true, reel: reel });
            } else {
                res.status(404).json({ success: false, message: 'No Reels' });
            }
        })
        .catch(error => {
            console.error('Error finding Reels:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};

