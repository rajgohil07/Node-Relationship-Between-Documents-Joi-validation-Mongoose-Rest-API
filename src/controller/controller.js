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
    const student_arr = req.body.data;

    const data = await teacher_data.findByIdAndUpdate(teacher_id, {
        $push: {
            students: { $each: student_arr }
        },
    }, { new: true });

    res.send({ message: 'new updated data', data });
};

exports.RemoveStudentFromTeacher = async (req, res) => {

    const teacher_id = req.params.teacher_id;
    const student_arr = req.body.data;

    try {

        const data = await teacher_data.findOneAndUpdate({ _id: teacher_id }, {
            $pull: { students: { $in: student_arr } }
        }, { new: true })
            .populate('students', 'name class role_no -_id');

        res.send({ message: "data after deleted student from " + data.name, data });

    } catch (err) {
        res.send({ message: "error in fetch data due to:" + err.message });
    }

};

exports.GetStudents = async (req, res) => {
    const data = await student_data.find();
    data.length ? res.send({ message: 'all student data', data }) : res.send({ message: "No data available to display" });
};

exports.GetTeachers = async (req, res) => {

    try {
        const data = await teacher_data.find().populate('students', 'name class role_no -_id');
        data.length ? res.send({ message: 'all teachers data', data }) : res.send({ message: "No data available to display" });
    } catch (err) {
        res.send({ message: "error in fetch data due to:" + err.message });
    }
};

exports.DeleteStudent = async (req, res) => {

    const student_id = req.params.id;
    const data = await student_data.findByIdAndDelete(student_id);

    res.send({ message: "student data of " + data.name + " sucessfully deleted", deleted_data: data });
};

exports.DeleteTeacher = async (req, res) => {

    const teacher_id = req.params.id;

    try {
        const data = await teacher_data.findById(teacher_id).populate('students', 'name class role_no -_id');
        const student_data = data.students;

        if (!data.students.length) {
            const data = await teacher_data.findByIdAndDelete(teacher_id);
            res.send({ message: "Teacher data of " + data.name + " sucessfully deleted", deleted_data: data });
        } else
            res.send({ message: "Please remove the remaing student data first", student_data, status: "failed" });

    } catch (err) {
        res.send({ message: "error in fetch data due to:" + err.message });
    }
};

exports.DeleteAllData = async (req, res) => {

    const delete_students = await student_data.deleteMany();
    const delete_teachers = await teacher_data.deleteMany();

    const sucess_string = delete_students.deletedCount || delete_teachers.deletedCount
        ? `${delete_students.deletedCount + delete_teachers.deletedCount} Documemt(s) has been deleted!`
        : `No documemts found to delete!`

    res.send({ message: sucess_string });


};
