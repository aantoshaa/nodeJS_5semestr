const {Op} = require('sequelize');
const {sequelize, collections} = require('../db/index');

class Context {
    // Faculty
    async getAllFaculties() {
        return collections.faculty.findAll({raw: true});
    }
    async getOneFaculty(faculty) {
        return collections.faculty.findAll({raw: true, where: {faculty: faculty}});
    }
    async addFaculty(faculty) {
        return collections.faculty.create(faculty, {raw: true});
    }
    async updateFaculty(faculty) {
        return collections.faculty.update(faculty, {raw: true, returning: true, where: {faculty: faculty.faculty}});
    }
    async deleteFaculty(faculty) {
        return collections.faculty.destroy({where: {faculty: faculty}});
    }

    // Pulpit
    async getAllPulpits() {
        return collections.pulpit.findAll({raw: true});
    }
    async getOnePulpit(pulpit) {
        return collections.pulpit.findAll({raw: true, where: {pulpit: pulpit}});
    }
    async getPulpitsByFaculty(faculty) {
        return collections.pulpit.findAll({raw: true, where: {faculty: faculty}});
    }
    async addPulpit(pulpit) {
        return collections.pulpit.create(pulpit, {raw: true});
    }
    async updatePulpit(pulpit) {
        return collections.pulpit.update(pulpit, {raw: true, returning: true, where: {pulpit: pulpit.pulpit}});
    }
    async deletePulpit(pulpit) {
        return collections.pulpit.destroy({where: {pulpit: pulpit}});
    }

    // Teacher
    async getAllTeachers() {
        return collections.teacher.findAll({raw: true,});
    }
    async getOneTeacher(teacher) {
        return collections.teacher.findAll({raw: true, where: {teacher: teacher}});
    }
    async getTeachersByFaculty(faculty) {
        const pulpitsByFaculty = await this.getPulpitsByFaculty(faculty);
        const arrayPulpits = pulpitsByFaculty.map(p => p.pulpit);
        return collections.teacher.findAll({
            raw: true,
            where: {
                pulpit: arrayPulpits
            }
        });
    }
    async addTeacher(teacher) {
        return collections.teacher.create(teacher, {raw: true});
    }
    async updateTeacher(teacher) {
        return collections.teacher.update(teacher, {raw: true, returning: true, where: {teacher: teacher.teacher}});
    }
    async deleteTeacher(teacher) {
        return collections.teacher.destroy({where: {teacher: teacher}});
    }

    // Subject
    async getAllSubjects() {
        return collections.subject.findAll({raw: true});
    }
    async getOneSubject(subject) {
        return collections.subject.findAll({raw: true, where: {subject: subject}});
    }
    async getSubjectsByFaculty(faculty) {
        const pulpitsByFaculty = await this.getPulpitsByFaculty(faculty);
        const arrayPulpits = pulpitsByFaculty.map(p => p.pulpit);
        return collections.subject.findAll({
            raw: true,
            where: {
                pulpit: arrayPulpits
            }
        });
    }
    async addSubject(subject) {
        return collections.subject.create(subject, {raw: true});
    }
    async updateSubject(subject) {
        return collections.subject.update(subject, {raw: true, returning: true, where: {subject: subject.subject}});
    }
    async deleteSubject(subject) {
        return collections.subject.destroy({where: {subject: subject}});
    }
}

module.exports = new Context();