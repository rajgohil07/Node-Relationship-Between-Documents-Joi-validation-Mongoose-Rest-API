module.exports = (app) => {

    const controller = require('../controller/controller.js')

    app.post('/insert_teacher', controller.InsertTeacher);

    app.post('/insert_student', controller.InsertStudent);

    app.get('/add_student_to_teacher/:teacher_id/:student_id', controller.AddStudentToTeacher);

    app.get('/remove_student_from_teacher/:teacher_id/:student_id', controller.RemoveStudentFromTeacher);

    app.get('/display_student', controller.GetStudents);

    app.get('/display_teacher', controller.GetTeachers);

    app.get('/delete_all', controller.DeleteAllData);

    app.get('*', controller.NotFound);

};