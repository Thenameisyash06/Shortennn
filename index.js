const express = require("express");
const path = require("path");
const urlroute = require("./routes/url");
const { connectToMongo } = require("./connection");
// const { mongoose } = require("mongoose");
const URL = require("./models/url")
const moment = require('moment');
const geoip = require('geoip-lite')
const staticRouter = require('./routes/staticrouter');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUser} = require('./middleware/auth')
// const bodyParser = require('body-parser'); 

const app = express();
const PORT = 8090;

require('dotenv').config();
const connectDB = async () => {
  try {
    await connectToMongo(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();
// connectToMongo("mongodb://localhost:27017/url-shortner").then(()=>console.log("mondoDb Connected")).catch((err)=>console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.resolve("./Views"));


app.use("/user",userRoute);
app.use('/',staticRouter);
app.use("/url",restrictToLoggedInUser,urlroute);
app.get("/r/:shortedUrl", async (req, res) => {
    const shortedUrl = req.params.shortedUrl;
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
    const date = moment().format('YYYY-MM-DD');
    const time = moment().format('h:mm A');

    let geo;
    try {
        geo = geoip.lookup(ip);
    } catch (err) {
        console.log("geoip error:", err.message);
        geo = null;
    }

    try {
        const entry = await URL.findOneAndUpdate(
            { shortedUrl },
            {
                $push: {
                    visitedHistory: {
                        date,
                        time,
                        city: geo?.city || 'unknown',
                        state: geo?.region || 'unknown',
                        country: geo?.country || 'unknown'
                    }
                }
            }
        );

        if (!entry || !entry.requiredUrl) {
            console.log("No entry found for:", shortedUrl);
            return res.status(404).send("Short URL not found");
        }

        return res.redirect(entry.requiredUrl);
    } catch (error) {
        console.log("DB error:", error.message);
        return res.status(500).send("Something went wrong");
    }
});

app.listen(PORT,()=>{
    console.log("Server Started!");
})