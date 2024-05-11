var mongoose = require('mongoose');
var Plan = mongoose.model('Plan');

exports.edit_plans = function(req, res, next) {
    const { user,monday,tuesday,wednesday,thursday,friday,saturday,sunday } = req.body;
    const planData = {
       user, monday,tuesday,wednesday,thursday,friday,saturday,sunday
    };

    Plan.findOne({ user })
        .then(plan => {
            if (plan) {
                Plan.findOneAndUpdate({ user }, planData)
                    .then(() => {
                        res.json({success:true, message: 'Plan updated successfully' });
                    })
                    .catch(error => {
                        console.error('Error updating Plan:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            } else {
                Plan.create(planData)
                    .then(() => {
                        res.json({success:true, message: 'Plan created successfully' });
                    })
                    .catch(error => {
                        console.error('Error creating Plan:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Plan:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

exports.get_plans = function(req, res, next) {
    const { user } = req.body;
    Plan.findOne({ user })
        .then(plan => {
            if (plan) {
                res.json({ success: true, plan: plan });
            } else {
                res.status(404).json({ success: false, message: 'Plan not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Plan:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};