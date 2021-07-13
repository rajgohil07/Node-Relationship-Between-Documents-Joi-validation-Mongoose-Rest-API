module.exports = () => {
    const mongoose = require('mongoose');
    const UserSchema = new mongoose.Schema({
        name: String,
        class: Number,
        email: String,
        role_no: String
    }, {
        versionKey: false
    });

    return mongoose.model('student_data', UserSchema);
}