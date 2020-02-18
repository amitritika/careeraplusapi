const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//routes
const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/form");
const userRoutes = require("./routes/user");
const examplanRoutes = require("./routes/examplan");
const visualresumeRoutes = require("./routes/visualresume");
const testRoutes = require("./routes/test");
const payRoutes = require("./routes/payUMoney");
const blogRoutes = require('./routes/blog');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');

const db = (process.env.NODE_ENV == "development") ? process.env.DATABASE_CLOUD_DEV : process.env.DATABASE_CLOUD_PROD

mongoose
  .connect(db, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => console.log("DB Connected"));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

if(process.env.NODE_ENV == "development"){
  app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}


//routes Middleware
app.get("/", (req, res)=>{
  res.send("You are in Server Side")
});

app.use("/api", authRoutes);
app.use("/api", formRoutes);
app.use("/api", userRoutes);
app.use("/api", examplanRoutes);
app.use("/api", visualresumeRoutes);
app.use("/api", testRoutes);
app.use("/api", payRoutes);
app.use('/api', blogRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started at ${port}`)
})