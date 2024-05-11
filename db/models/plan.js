var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var PlanSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    monday:{
        type:[String],
        required:false,
    },
    tuesday:{
        type:[String],
        required:false,
    },
    wednesday:{
        type:[String],
        required:false,
    },
    thursday:{
        type:[String],
        required:false,
    },
    friday:{
        type:[String],
        required:false,
    },
    saturday:{
        type:[String],
        required:false,
    },
    sunday:{
        type:[String],
        required:false,
    },
    
    
});


module.exports = mongoose.model('Plan',PlanSchema);