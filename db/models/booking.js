var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    receive:{
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

    },
    day:{
        type:String,
        required: false,

    },
    time:{
        type:String,
        required: false,

    },
    package:{
        type:String,
        required: false,

    },
    price:{
        type:String,
        required: true,
    },
    payment_id:{
        type:String,
        required:true,
    },

}, { timestamps: true });
module.exports = mongoose.model('Booking',BookingSchema);