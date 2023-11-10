const express = require("express")
const connectToMongo = require("./db.js")
connectToMongo();
const auth = require("./routes/auth.js");
const category_crud = require("./routes/category_crud.js");
const add = require("./routes/add.js")
const dlt=require("./routes/delete.js")
const save=require("./routes/save.js")
const cors = require("cors")
const generate = require("./routes/generate.js");
const Payment = require("./routes/payment.js");
const session = require("express-session")
const passport = require("passport")
const jwt = require('jsonwebtoken');
const passportLocalMongoose = require("passport-local-mongoose");
// const User = require("./models/User.js")
require('dotenv').config();
const app = express();
const port = 4000;

//let port = process.env.port || 4000
//to get data from the client we need to make a cors beetween two
app.use(cors())

//to send some information to server
app.use(express.json());
 
// app.use(session({
//     secret : 'Our Little Secrettttttttttttttttttttttttttttttt................',
//     resave :false,
//     saveUninitialized : false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
 



//Available Routes
app.use("/auth", auth);
app.use("/category_crud", category_crud);
app.use("/add", add);
app.use("/save", save);
app.use("/delete", dlt);
app.use("/payment", Payment);
app.use("/generate",generate)

app.listen(port, (err) => {
    console.log(`Server Running on port ${port}`)
})

app.post("/generateToken", (req, res) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(process.env.JWT_SECRET_KEY)
    console.log(jwtSecretKey);
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);

    res.status(200).json({ token: token });
});

app.get("/validateToken", (req, res) => {
    
    console.log("I am in middle ware");
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            console.log(req.headers.authorization)
            token = req.headers.authorization.split(" ")[1];
         
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decoded);
 
            res.status(200).json({message : "Token Has Been Verified"});
        } catch (error) {
            res.status(401);
        }
    }
});