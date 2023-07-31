const mongoose = require("mongoose");
const con = process.env.SECRET_KEY
mongoose.connect(con).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})