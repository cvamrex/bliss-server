var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
    date:{
        type:String,
    },
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
    price : {
        type : String,
        required: false,

    },
});


module.exports = mongoose.model('Transaction',TransactionSchema);