var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
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
    },
    price : {
        type : String,
        required: false,

    },
    payment_id : {
        type : String,
        required: false,
    },
}, { timestamps: true });


module.exports = mongoose.model('Transaction',TransactionSchema);