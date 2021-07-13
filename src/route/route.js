module.exports = (app) => {

    const middleware = require('../Middleware/validator');
    const controller = require('../controller/controller.js');

    //to insert teacher
    app.post('/insert_teacher', middleware.ValidateTeacher, controller.InsertTeacher);

    //to insert student
    app.post('/insert_student', middleware.ValidateStudent, controller.InsertStudent);

    //to add student to perticular teacher
    app.get('/add_student_to_teacher/:teacher_id/:student_id', controller.AddStudentToTeacher);

    //to remove student to perticular teacher
    app.get('/remove_student_from_teacher/:teacher_id/:student_id', controller.RemoveStudentFromTeacher);

    //to display all student info
    app.get('/display_student', controller.GetStudents);

    //to display all teacher info
    app.get('/display_teacher', controller.GetTeachers);

    //to drop entire collections
    app.get('/delete_all', controller.DeleteAllData);

    //if invalid url passed
    app.get('*', controller.NotFound);
};