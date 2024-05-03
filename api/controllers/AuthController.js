const axios = require("axios");
require('dotenv').config();
const { generateOTP } = require('../../utils/generateOtp');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const AWS = require('aws-sdk');
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
const twilio = require('twilio');


exports.sendOtp =async function(req,res){
    const {phone} = req.body;
    const otp = generateOTP();
            
    // const params = {
    //   Message: `${otp} is your verification code for Blissbody.`,
    //   PhoneNumber: phone,
    //   MessageAttributes: {
    //     'AWS.SNS.SMS.SMSType': {
    //       DataType: 'String',
    //       StringValue: 'Transactional' 
    //     }
    //   }
    // };
    // sns.publish(params).promise()
    //   .then(data => {
    //     res.json({success:true,otp:otp}); 
    //   })
    //   .catch(err => {
    //     res.json({success:false,error:err});
    //   });
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

client.messages.create({
    body:  `${otp} is your verification code for Blissbody`,
    to: `+91${phone}`,  
    from: '+14193180766' 
})
.then((message) => res.json({success:true,otp:otp}))
.catch((error) => res.json({success:false}))
}

exports.verifyOtp =async function(req,res){
  const {phone} = req.body;
  console.log("Received data:", req.body);
  if (phone=="") {
    return res.status(400).json({success: false, message: "Phone number is required"});
  }
  const user_data = {
    "phone":phone,
};
User.findOne({phone:phone}).then(user =>{
    if(user){
         const user_data = {
            "_id":user._id,
            "phone":user.phone,
        }; 
        res.json({success:true,message:"User auth successful",user:user,logged:true});
    }else{
        User.create({phone}).then(user =>{
            if(user){
                const user_data = {
                    "_id":user._id,
                    "phone":user.phone,
                };
                res.json({success:true,message:"User auth successful",user:user,logged:false});
            }else{
                res.json({success:false,message:"Cannot add a user"});
            }
        }).catch(err =>{
            console.log(err);
            res.json({success:false,message:"Cannot add a user"});
        });
    }

}).catch(err =>{
    res.json({success:false,message:"User auth failed"});
});
}
   
  