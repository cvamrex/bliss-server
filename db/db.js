require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL;

async function connect(){
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
          });
        console.log("DataBase Connected");
    }
    catch(error) {
        console.log(error);
    }
}

connect();

// const businessCuration = require('./models/businessCuration');
// const Gallery = require('./models/gallery');
const user = require('./models/user');
const gym = require('./models/gym');
const reels = require('./models/reels');
const booking = require('./models/booking');
const Transaction = require('./models/transaction');
// const curation = require('./models/curation');
// const chip = require('./models/chip');
// const savedCuration = require('./models/savedCuration');
// const savedChip = require('./models/savedChip');
// const category = require('./models/category');
// const waitlist = require('./models/waitlist');