const student_data = require('../model/student_model')();
const teacher_data = require('../model/teacher_model')();

exports.NotFound = (req, res) => res.send({ message: 'invalid URL!' });

exports.InsertTeacher = async (req, res) => {
    const data = new teacher_data({
        name: req.body.name,
        email: req.body.email,
    });

    const result = await data.save();
    res.send({ message: "new teacher has been added", result });
};

exports.InsertStudent = async (req, res) => {

    const result = await student_data({
        name: req.body.name,
        class: req.body.class,
        email: req.body.email,
        role_no: req.body.role_no
    });

    const data = await result.save();
    res.send({ message: 'new student has been added', data });
};

exports.AddStudentToTeacher = async (req, res) => {

    const teacher_id = req.params.teacher_id;
    const student_id = req.params.student_id;

    const data = await teacher_data.findByIdAndUpdate(teacher_id, {
        $push: {
            having_students: student_id
        },
    }, { new: true });

    res.send({ message: 'new updated data', data });

};

exports.RemoveStudentFromTeacher = async (req, res) => {

    const teacher_id = req.params.teacher_id;
    const student_id = req.params.student_id;

    const data = await teacher_data.findOneAndUpdate({ _id: teacher_id }, {
        $pull: { having_students: student_id }
    }, { new: true })
        .populate('having_students', 'name class role_no -_id');

    res.send({ message: "data after deleted student from " + data.name, data });
};

exports.GetStudents = async (req, res) => {
    const data = await student_data.find();
    data.length ? res.send({ message: 'all student data', data }) : res.send({ message: "No data available to display" });
};

exports.GetTeachers = async (req, res) => {
    const data = await teacher_data.find().populate('having_students', 'name class role_no -_id');
    data.length ? res.send({ message: 'all teachers data', data }) : res.send({ message: "No data available to display" });
};

exports.DeleteAllData = async (req, res) => {

    const delete_all_data_students = await student_data.deleteMany();
    const delete_all_data_teachers = await teacher_data.deleteMany();

    const sucess_string = delete_all_data_students.deletedCount || delete_all_data_teachers.deletedCount
        ? `${delete_all_data_students.deletedCount + delete_all_data_teachers.deletedCount} Documemt(s) has been deleted!`
        : `No documemts found to delete!`

    res.send({ message: sucess_string });

};
