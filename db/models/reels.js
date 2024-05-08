var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReelsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    url : {
        type : String,
        required: false,

    },
    name : {
        type : String,
        required: false,

    },
    image:{
        type:String,
        required: false,

    },
    type:{
        type:String,
        required: true,

    }
}, { timestamps: true });

module.exports = mongoose.model('Reels',ReelsSchema);