const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Transactionmodel = require("./models/transactionmodel");
const signupmodel = require("./models/signupmodel");
const passport = require('./config/passport'); // Passport config

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow only specific frontend domains (like Vercel and localhost)
const allowedOrigins = [
  'http://localhost:3000',
  'https://wallet-watcher-frontend-d0mtjhgtx-viyomshuklas-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://viyomshukla21:wzgjf3cTrf43O8xc@cluster0.tugjybd.mongodb.net/website?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// ✅ Root route
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false
  });
});

// ✅ GET all transactions (protected)
app.get('/trans', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const trans = await Transactionmodel.find({ user_id: req.user._id });
  const demo = await Transactionmodel.aggregate([
    {
      $match: { user_id: req.user._id }
    },
    {
      $group: {
        _id: { $month: "$date" },
        transaction: { $push: { price: "$price", desc: "$desc", date: "$date" } },
        total: { $sum: "$price" }
      }
    }
  ]);

  res.json({ data: demo, data1: trans });
});

// ✅ POST a transaction (protected)
app.post('/trans', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { number, desc, date } = req.body;
  const trans = new Transactionmodel({
    price: number,
    user_id: req.user._id,
    desc: desc,
    date: date
  });
  await trans.save();
  res.json({ messge: "success" });
});

// ✅ DELETE a transaction (protected)
app.delete('/trans/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await Transactionmodel.findByIdAndDelete(req.params.id);
  if (result) {
    res.json({ messge: "successful" });
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

// ✅ PATCH a transaction (protected)
app.patch('/trans/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await Transactionmodel.findByIdAndUpdate(req.params.id, {
    price: req.body.number,
    desc: req.body.desc,
    date: req.body.date
  });
  if (result) {
    res.json({ messge: "successful" });
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

// ✅ SIGNUP Route
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const user = await signupmodel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const signup = new signupmodel({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });
    await signup.save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed" });
  }
});

// ✅ LOGIN Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userfind = await signupmodel.findOne({ email });

  if (!userfind) {
    return res.status(200).json("user doesn't exist");
  }

  const match = await bcrypt.compare(password, userfind.password);
  const payload = { userId: userfind._id, email: userfind.email };

  if (match) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(200).json({ message: 'Token generated', token });
  } else {
    res.json("wrong password");
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
