const Joi = require('joi');

exports.ValidateTeacher = (req, res, cb) => {

    const SchemaTeacher = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    });

    const Teacher = {
        name: req.body.name,
        email: req.body.email,
    }

    const result = SchemaTeacher.validate(Teacher);
    result.error ? res.send(result.error.details[0].message) : cb();
};

exports.ValidateStudent = (req, res, cb) => {

    StudentSchema = Joi.object({
        name: Joi.string().min(3).required(),
        class: Joi.number().integer().required(),
        email: Joi.string().email().required(),
        role_no: Joi.number().integer().required()
    });

    const Student = {
        name: req.body.name,
        class: req.body.class,
        email: req.body.email,
        role_no: req.body.role_no
    }

    const result = StudentSchema.validate(Student);
    result.error ? res.send(result.error.details[0].message) : cb();
};

exports.ValidateArray = (req, res, cb) => {

    ArraySchema = Joi.object({
        data: Joi.array().items(Joi.string()).required()
    });

    const array_check = {
        data: req.body.data
    }

    const result = ArraySchema.validate(array_check);
    result.error ? res.send(result.error.details[0].message) : cb();
};