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
const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    rating: {
        type: String,
        required: true
    },
    review: {
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
        required:false,
    },
    link:{
        type:String,
        required:false,

    },
    phone:{
        type:String,
        required:false,

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
        required:false,
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
        required:false,

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
        required:false,
    },
    morning_time:{
        type: [String],
        required: false
    },
    evening_time:{
        type: [String],
        required: false
    },
    active:{
        type:Boolean,
        default:false,
        required:true
    },
    machines:{
        type: [String],
        required: false
    },
    reviews: [ReviewSchema]
});


module.exports = mongoose.model('Gym',GymSchema);