
//db.js
const mongoose=require("mongoose")



mongoose.connect("mongodb://0.0.0.0:27017/SMS")

    .then(() => {
    console.log("connect to MongoDB");
    })
    .catch((err) => {
    console.log("error connecting to MongoDB",err);
});
