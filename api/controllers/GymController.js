const axios = require("axios");
require('dotenv').config();
var mongoose = require('mongoose');
var Gym = mongoose.model('Gym');

exports.edit_gym_details = function(req, res, next) {
    const { user, name, address, city,link,phone, opening_time, closing_time, gender, about, amenities,machines } = req.body;
    const gymData = {
        user,
        name,
        address,
        city,
        link,
        phone,
        opening_time,
        closing_time,
        gender,
        about,
        amenities,
        machines
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
exports.edit_gym_reviews = function(req, res) {
    const { id, reviews } = req.body;
    Gym.findOne({ _id: id }) 
        .then(existingGym => {
            if (existingGym) {
                Gym.findOneAndUpdate({ _id: id }, { $push: { reviews: reviews } }, { new: true })
                    .then(updatedGym => {
                        res.json({ success: true, message: 'Review added to Gym successfully', data: updatedGym });
                    })
                    .catch(error => {
                        console.error('Error updating Gym:', error);
                        res.status(500).json({ success: false, error: 'Internal server error' });
                    });
            } else {
                // If gym does not exist, handle it appropriately
                res.status(404).json({ success: false, message: 'Gym not found' });
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
exports.get_gym_reviews = function(req, res, next) {
    const { id } = req.body;
    Gym.findOne({ _id:id })
        .then(gym => {
            if (gym) {
                res.json({ success: true, reviews: gym.reviews });
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

exports.search_gyms = function(req, res) {
    const name = req.body.name; 
    if (!name) {
        return res.json({ success: false, message: "No search term provided" });
    }
    Gym.find({ name: { $regex: new RegExp(name, 'i') } }) // Use regex to perform a case-insensitive search
    .then(result => {
        if (result && result.length > 0) { // Check if any gyms are found
            res.json({ success: true, gym: result });
        } else {
            res.json({ success: false, message: "No such gym exists" });
        }
    }).catch(err => {
        console.error(err); // Log the error for debugging purposes
        res.json({ success: false, message: "Error while searching gyms" });
    });
};



