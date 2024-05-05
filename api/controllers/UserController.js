var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.create_user = function(req,res,next){
    const {id,name,age,gender,image} = req.body;
    const user_data = {
        name,
        age,
        gender,
        image,
    };
    User.findByIdAndUpdate(id, user_data, { new: true })  
        .then(user => {
            if (!user) {
                res.json({ success: false, message: "No user found with the given ID" });
            } else {
                res.json({ success: true, message: "User update successful", user: user });
            }
        })
        .catch(err => {
            console.log(err);
            res.json({ success: false, message: "Error updating the user" });
        });
}
exports.edit_profile = function(req,res,next){
    const {id,name,age,gender,image,weight,height,weight_type,height_type} = req.body;
    const user_data = {
        name,age,gender,image,weight,height,weight_type,height_type
    };
    User.findByIdAndUpdate(id, user_data, { new: true })  
        .then(user => {
            if (!user) {
                res.json({ success: false, message: "No user found with the given ID" });
            } else {
                res.json({ success: true, message: "User update successful", user: user });
            }
        })
        .catch(err => {
            console.log(err);
            res.json({ success: false, message: "Error updating the user" });
        });
}
exports.get_profile = function(req, res, next) {
    const { id } = req.body;
    User.findOne({_id:id})
        .then(user => {
            if (user) {
                res.json({ success: true, user: user });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        })
        .catch(error => {
            console.error('Error finding User:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_name = function(req, res, next) {
    const { id } = req.body;
    User.findOne({ _id: id }, 'name')
        .then(user => {
            if (user) {
                res.json({ success: true, name: user.name });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        })
        .catch(error => {
            console.error('Error finding User:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.get_favourites = function(req, res, next) {
    const { id } = req.body;

    User.findOne({ _id: id })
        .populate('favourites') 
        .then(user => {
            if (user) {
                res.json({ success: true, favourites: user.favourites });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        })
        .catch(error => {
            console.error('Error finding User:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        });
};
exports.toggle_favourite = function(req, res, next) {
    const { id ,gym_id} = req.body;
    User.findOne({_id:id}).then(user =>{
        let user_fav = user.favourites.indexOf(gym_id);
        if(user_fav !== -1){
            user.favourites.splice(user_fav, 1);
            user.save();
            res.json({success:true, message:"Removed from favourites"})
        }
        else{
            user.favourites.push(gym_id);
            user.save();
            res.json({success:true, message:"Added to favourites"});
        }
            
    }).catch(err =>{
         res.json({success:false, message:`Error while performing favourite ${err}`})
    })
}




