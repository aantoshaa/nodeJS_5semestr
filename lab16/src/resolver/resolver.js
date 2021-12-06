const resolver = {
    getFaculties: async (args, context) => {
        const pulpits = await context.getAllPulpits();
        if (args.faculty) {
            const faculty = await context.getOneFaculty(args.faculty);
            return faculty.map(faculty => Object.assign(faculty, {pulpits: pulpits.filter(pulpit => pulpit.faculty === faculty.faculty)}));
        } else {
            const faculties = await context.getAllFaculties();
            return faculties.map(faculty => Object.assign(faculty, {pulpits: pulpits.filter(pulpit => pulpit.faculty === faculty.faculty)}));
        }
    },
    getPulpits: async (args, context) => {
        if (args.pulpit) {
            return context.getOnePulpit(args.pulpit);
        } else {
            return context.getAllPulpits();
        }
    },
    getTeachers: async (args, context) => {
        if (args.teacher) {
            return context.getOneTeacher(args.teacher);
        } else {
            return context.getAllTeachers();
        }
    },
    getSubjects: async (args, context) => {
        if (args.subject) {
            return context.getOneSubject(args.subject);
        } else {
            return context.getAllSubjects();
        }
    },
    getTeachersByFaculty: async (args, context) => {
        return context.getTeachersByFaculty(args.faculty);
    },
    getSubjectsByFaculty: async (args, context) => {
        return context.getSubjectsByFaculty(args.faculty);
    },
    setFaculty: async (args, context) => {
        const faculty = await context.getOneFaculty(args.faculty.faculty);
        if (faculty.length === 0) {
            return context.addFaculty(args.faculty);
        } else {
            const rs = await context.updateFaculty(args.faculty);
            return rs[1][0];
        }
    },
    setTeacher: async (args, context) => {
        const teacher = await context.getOneTeacher(args.teacher.teacher);
        if (teacher.length === 0) {
            return context.addTeacher(args.teacher);
        } else {
            const rs = await context.updateTeacher(args.teacher);
            return rs[1][0];
        }
    },
    setPulpit: async (args, context) => {
        const pulpit = await context.getOnePulpit(args.pulpit.pulpit);
        if (pulpit.length === 0) {
            return context.addPulpit(args.pulpit);
        } else {
            const rs = await context.updatePulpit(args.pulpit);
            return rs[1][0];
        }
    },
    setSubject: async (args, context) => {
        const subject = await context.getOneSubject(args.subject.subject);
        if (subject.length === 0) {
            return context.addSubject(args.subject);
        } else {
            const rs = await context.updateSubject(args.subject);
            return rs[1][0];
        }
    },
    delFaculty: async (args, context) => {
        return context.deleteFaculty(args.faculty);
    },
    delTeacher: async (args, context) => {
        return context.deleteTeacher(args.teacher);
    },
    delPulpit: async (args, context) => {
        return context.deletePulpit(args.pulpit);
    },
    delSubject: async (args, context) => {
        return context.deleteSubject(args.subject);
    }
};

module.exports = resolver;