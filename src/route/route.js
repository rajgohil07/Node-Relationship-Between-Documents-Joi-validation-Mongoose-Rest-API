module.exports = (app) => {

    const middleware = require('../Middleware/validator');
    const controller = require('../controller/controller.js');

    //to insert teacher
    app.post('/insert_teacher', middleware.ValidateTeacher, controller.InsertTeacher);

    //to insert student
    app.post('/insert_student', middleware.ValidateStudent, controller.InsertStudent);

    //to add multiple student to perticular teacher
    app.put('/add_student_to_teacher/:teacher_id', middleware.ValidateArray, controller.AddStudentToTeacher);

    //to remove multiple student to perticular teacher
    app.delete('/remove_student_from_teacher/:teacher_id', middleware.ValidateArray, controller.RemoveStudentFromTeacher);

    //to display all student info
    app.get('/display_student', controller.GetStudents);

    //to display all teacher info
    app.get('/display_teacher', controller.GetTeachers);

    //to drop specfic student
    app.delete('/delete_student/:id', controller.DeleteStudent);

    //to drop specfic teacher
    app.delete('/delete_teacher/:id', controller.DeleteTeacher);

    //to drop entire collections
    app.delete('/delete_all', controller.DeleteAllData);

    //if invalid url passed
    app.get('*', controller.NotFound);
};