module.exports = () => {
    const mongoose = require('mongoose');

    const TeacherSchema = new mongoose.Schema({
        name: String,
        email: String,
        having_students: {
            type: [mongoose.ObjectId],
            ref: 'student_data'
        }
    }, {
        versionKey: false
    });

    return mongoose.model('teacher_data', TeacherSchema);
};