var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gym',
        required:true
    },
    date:{
        type:String,
        required: false,

    }
    time:{
        type:String,
        required: false,

    },
    address:{
        type:String,
        required: false,

    },
    package:{
        type:String,
        required: false,

    },
    price:{
        type:String,
        required: false,

    }
});
module.exports = mongoose.model('Booking',BookingSchema);