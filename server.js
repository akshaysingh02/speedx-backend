require("dotenv").config();
const express = require('express')
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const metricsRoute = require('./routes/metricsroute')

const app = express();
app.use(express.json())
app.use(cors())


app.get('/',(req, res)=>{
    res.send("Home route")
})

app.use("/api/metrics", metricsRoute)




mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(`Failed to connect to database at ${process.env.PORT}`,err))

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`Backend server listening at port ${process.env.PORT}`)
})