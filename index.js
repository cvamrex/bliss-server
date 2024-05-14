const express = require('express');
const app = express();
var cors = require('cors');
const axios = require("axios");
const bodyParser = require('body-parser');
const db = require('./db/db');
const multer = require('multer');
const Razorpay = require('razorpay');
const AWS = require('aws-sdk');
const upload = multer();
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


app.use(express.json());
app.use(cors());

const routes = require('./api/routers/router');
app.use('/api',routes);


app.get('/api/searchCity', async (req, res) => {
    const {input} = req.query;
    const lang = 'en'; 
    const apiKey = process.env.GOOGLE_MAPS_API; 
    const country = 'in'; 
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&language=${lang}&components=country:${country}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const predictions = response.data.predictions;
        const cities = predictions.map(prediction => prediction.terms[0].value);
        res.json({success:true,cities:cities}); 
      } catch (error) {
        res.json({success:false});
      }
});
app.get('/api/places/autocomplete', async (req, res) => {
  const {input} = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API; // Consider using environment variables for API keys
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
      const response = await axios.get(url);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/api/upload/image', upload.array('file'), async (req, res) => {
  try {
    const myUUID = uuidv4();
    const files = req.files;
    let uploadPromises = files.map((file, index) => {
      const putObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `profile/image_${myUUID}_${index}.jpg`,
        Body: file.buffer,
        ContentType: 'image/jpeg',
      };
      return s3Client.send(new PutObjectCommand(putObjectParams));
    });

    await Promise.all(uploadPromises);
    let imageUrls = files.map((file, index) => 
      `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/profile/image_${myUUID}_${index}.jpg`
    );
    console.log(imageUrls);
    res.json({ urls: imageUrls });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).send('Error uploading images');
  }
});
app.post('/api/upload/cover', upload.array('file'), async (req, res) => {
  try {
    const myUUID = uuidv4();
    const files = req.files;
    let uploadPromises = files.map((file, index) => {
      const putObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `gym/image_${myUUID}_${index}.jpg`,
        Body: file.buffer,
        ContentType: 'image/jpeg',
      };
      return s3Client.send(new PutObjectCommand(putObjectParams));
    });

    await Promise.all(uploadPromises);
    let imageUrls = files.map((file, index) => 
      `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/gym/image_${myUUID}_${index}.jpg`
    );
    console.log(imageUrls);
    res.json({ urls: imageUrls });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).send('Error uploading images');
  }
});

app.post('/api/reel/image', upload.array('file'), async (req, res) => {
  try {
    const myUUID = uuidv4();
    const files = req.files;
    let uploadPromises = files.map((file, index) => {
      const putObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `reels/image_${myUUID}_${index}.jpg`,
        Body: file.buffer,
        ContentType: 'image/jpeg',
      };
      return s3Client.send(new PutObjectCommand(putObjectParams));
    });

    await Promise.all(uploadPromises);
    let imageUrls = files.map((file, index) => 
      `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/reels/image_${myUUID}_${index}.jpg`
    );
    console.log(imageUrls);
    res.json({ urls: imageUrls });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).send('Error uploading images');
  }
});

app.post('/api/upload/video', upload.single('file'), async (req, res) => {
  try {
    const myUUID = uuidv4();
    const file = req.file;
    const putObjectParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `gym/video_${myUUID}.mp4`,
      Body: file.buffer,
      ContentType: 'video/mp4',
    };

    await s3Client.send(new PutObjectCommand(putObjectParams));
    const videoUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/gym/video_${myUUID}.mp4`;

    console.log(videoUrl);
    res.json({ urls: [videoUrl] });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).send('Error uploading video');
  }
});
app.post('/api/upload/reel', upload.single('file'), async (req, res) => {
  try {
    const myUUID = uuidv4();
    const file = req.file;
    const putObjectParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `reels/video_${myUUID}.mp4`,
      Body: file.buffer,
      ContentType: 'video/mp4',
    };
    await s3Client.send(new PutObjectCommand(putObjectParams));
    const videoUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/reels/video_${myUUID}.mp4`;

    console.log(videoUrl);
    res.json({success:true ,urls: [videoUrl] });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).send('Error uploading video');
  }
});

app.post('/owner/onboard', async (req, res) => {
  try {
    const {user, name, email, phone, bank_account, ifsc } = req.body;
    const myUUID = uuidv4();

    const contactData = {
      user,
      name,
      email,
      phone,
      type: 'customer',
      reference_id: myUUID, 
    };

    const contactResponse = await razorpay.contacts.create(contactData);

    const accountData = {
      contact_id: contactResponse.id,
      account_type: 'bank_account',
      bank_account: {
        name,
        account_number: bank_account,
        ifsc
      }
    };

    const accountResponse = await razorpay.accounts.create(accountData);

    res.json({
      success: true,
      message: 'Gym owner registered successfully!',
      data: accountResponse
    });

  } catch (error) {
    console.error('Error in registering gym owner:', error);
    res.status(500).send({
      success: false,
      message: 'Failed to register gym owner',
      error: error.message
    });
  }
});

app.post('/capture/payment', async (req, res) => {
  const { paymentId, ownerId } = req.body;
  try {
    const totalAmount = 1000 * 100; 
    const captureResponse = await razorpay.payments.capture(paymentId, totalAmount);

    const splitDetails = {
      settle: true,
      transfers: [
        {
          account: ownerId, 
          amount: 990 * 100, 
          currency: "INR",
          on_hold: false,
          notes: {
            description: "Payment for gym services"
          }
        }
      ]
    };

    const splitResponse = await razorpay.payments.transfer(paymentId, splitDetails);

    res.json({
      success: true,
      message: 'Payment captured and split successfully',
      data: splitResponse
    });
  } catch (error) {
    console.error('Error in capturing and splitting payment:', error);
    res.status(500).send({
      success: false,
      message: 'Failed to capture and split payment',
      error: error.message
    });
  }
})




app.get('/', (req, res) => {
 res.send({message: "Welcome to Blissbody Updated"});
})
const port = 3000;


app.listen(port, '0.0.0.0', () => {
 console.log(`Server running at http://localhost:${port}`)
})