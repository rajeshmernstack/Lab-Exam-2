const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/iba');
}

main();

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: Integer,
    country: String,
    state: String,
    city: String,
    address: String,
    zipcode: Integer
});




const user = mongoose.model("user", userSchema)

module.exports = user;