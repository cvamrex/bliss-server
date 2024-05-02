var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PackageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String, 
        required: true
    }
});

var GymSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    images: {
        type: [String],
        required: false
    },
    video:{
        type:String,
        required: false,

    },
    address:{
        type:String,
        required:true,
    },
    opening_time:{
        type:String,
        required: false,

    },
    closing_time:{
        type:String,
        required: false,

    },
    gender:{
        type:Number,
        required: false,

    },
    amenities:{
        type: [String],
        required: false
    },
    about:{
        type:String,
        required: false,

    },
    packages: [PackageSchema],
    hour_package:{
        type: [String],
        required: false
    },
    days:{
        type: [String],
        required: false
    },
    city:{
        type:String,
        required:true,
    },
    morning_time:{
        type: [String],
        required: false
    },
    evening_time:{
        type: [String],
        required: false
    },
});


module.exports = mongoose.model('Gym',GymSchema);