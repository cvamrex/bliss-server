const axios = require("axios");
require('dotenv').config();
var mongoose = require('mongoose');
var Gym = mongoose.model('Gym');

exports.edit_gym_details = function(req, res, next) {
    const { user, name, address, city, opening_time, closing_time, gender, about, amenities } = req.body;

    const gymData = {
        user,
        name,
        address,
        city,
        opening_time,
        closing_time,
        gender,
        about,
        amenities
    };

    Gym.findOne({ user })
        .then(existingGym => {
            if (existingGym) {
                Gym.findOneAndUpdate({ user }, gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym updated successfully' });
                    })
                    .catch(error => {
                        console.error('Error updating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            } else {
                Gym.create(gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym created successfully' });
                    })
                    .catch(error => {
                        console.error('Error creating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

exports.edit_gym_cover = function(req, res, next) {
    const { user, images,video } = req.body;

    const gymData = {
        user,
       images,
       video
    };

    Gym.findOne({ user })
        .then(existingGym => {
            if (existingGym) {
                Gym.findOneAndUpdate({ user }, gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym updated successfully' });
                    })
                    .catch(error => {
                        console.error('Error updating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            } else {
                Gym.create(gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym created successfully' });
                    })
                    .catch(error => {
                        console.error('Error creating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};
exports.edit_gym_slots = function(req, res, next) {
    const { user,days,morning_time,evening_time } = req.body;

    const gymData = {
      user,
      days,
      morning_time,
      evening_time
    };

    Gym.findOne({ user })
        .then(existingGym => {
            if (existingGym) {
                Gym.findOneAndUpdate({ user }, gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym updated successfully' });
                    })
                    .catch(error => {
                        console.error('Error updating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            } else {
                Gym.create(gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym created successfully' });
                    })
                    .catch(error => {
                        console.error('Error creating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};
exports.edit_gym_packages = function(req, res, next) {
    const { user,hour_package,packages} = req.body;
    const gymData = {
      user,
      hour_package,
      packages
    };

    Gym.findOne({ user })
        .then(existingGym => {
            if (existingGym) {
                Gym.findOneAndUpdate({ user }, gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym updated successfully' });
                    })
                    .catch(error => {
                        console.error('Error updating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            } else {
                Gym.create(gymData)
                    .then(() => {
                        res.json({success:true, message: 'Gym created successfully' });
                    })
                    .catch(error => {
                        console.error('Error creating Gym:', error);
                        res.status(500).json({success:false, error: 'Internal server error' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};
exports.get_gym_profile = function(req, res, next) {
    const { user } = req.body;
    Gym.findOne({ user })
        .then(gym => {
            if (gym) {
                res.json({ success: true, gym: gym });
            } else {
                res.status(404).json({ success: false, message: 'Gym not found' });
            }
        })
        .catch(error => {
            // Handle errors that occur during the find operation
            console.error('Error finding Gym:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_gyms = function(req, res, next) {
    const { city } = req.body;
    Gym.find({ city:city })
        .then(gym => {
            if (gym) {
                res.json({ success: true, gym: gym });
            } else {
                res.json({ success: false, message: 'Gym not found' });
            }
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};

exports.get_gym_details = function(req, res, next) {
    const { id } = req.body;
    Gym.findOne({_id:id})
        .then(gym => {
            if (gym) {
                res.json({ success: true, gym: gym });
            } else {
                res.status(404).json({ success: false, message: 'Gym not found' });
            }
        })
        .catch(error => {
            // Handle errors that occur during the find operation
            console.error('Error finding Gym:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.toggle_active = function(req, res, next) {
    const { id } = req.body;
    Gym.findById({_id:id})  
        .then(gym => {
            if (!gym) {
                res.status(404).json({ success: false, message: 'Gym not found' });
                return;  
            }
            Gym.findByIdAndUpdate(id, { $set: { active: !gym.active } }, { new: true })
                .then(updatedGym => {
                    if (updatedGym) {
                        res.json({ success: true, active: updatedGym.active });
                    } else {
                        res.status(404).json({ success: false, message: 'No gym updated' });
                    }
                })
                .catch(error => {
                    console.error('Error updating Gym:', error);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                });
        })
        .catch(error => {
            console.error('Error finding Gym:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};




