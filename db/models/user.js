var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name:{
        type:String,
        required: false,

    },
    image : {
        type : String,
        required: false,

    },
    weight:{
        type:String,
    },
    weight_type:{
        type:Boolean,
    },
    height:{
        type:String,
    },
    height_type:{
        type:Boolean,
    },

    phone : {
        type : String,
        required: [true, 'Phone number is required'],
    },
    age:{
        type:String,
        required: false,

    },
    email:{
        type:String,
    },
    gender:{
        type:Number,
        required: false,

    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gym',
        required: false
    }]
});


module.exports = mongoose.model('User',UserSchema);