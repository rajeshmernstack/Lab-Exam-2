const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const path = require('path')
app.set("view engine", "ejs")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.use("/images", express.static("public/imgs"))
const User = require('./Models/userModel')

app.get("/", async(req, res) => {
    await User.find({}, (err, docs) => {

    res.render("index", {data: docs})
    }).clone()
})
app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", async(req, res) => {
    const newUser = new User({fullname: req.body.fullname, email: req.body.email, phone: req.body.phone, country: req.body.country, state: req.body.state, city: req.body.city, address: req.body.address, zipcode: req.body.zipcode, avatar: req.files.avatar.name})
    await newUser.save()
    req.files.avatar.mv(path.resolve(__dirname, "public/imgs", req.files.avatar.name));
    res.redirect("/");
});

app.get("/delete/:id", async(req, res) => {
    let id = req.params.id;

    await User.deleteOne({_id: id});
    res.redirect("/")
})

app.get("/update/:id", async(req, res) => {
    let id = req.params.id;
    let myUser = await User.find({_id: id});
    res.render("update", {data: myUser})
})

app.listen(3000)