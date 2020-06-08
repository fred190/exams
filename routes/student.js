const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullname: {type: String},
    level: {type: String},
    program: {type: String},
    email: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('student',studentSchema);