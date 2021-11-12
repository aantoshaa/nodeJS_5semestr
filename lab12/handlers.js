const fs = require('fs');
const qs = require('querystring');
const {serverRPC} = require('./serverRPC.js');
const {StudentPointError} = require('./StudentPointError');
const pathFileJSON = './StudentList.json';
const regId = RegExp('^\/\\d+$');
const regBackupDate = RegExp('^\/backup\/\\d{8}$');

async function getHandler(req, res) {
    const url = req.url;

    switch (true) {
        case url === '/':
            fs.createReadStream(pathFileJSON).pipe(res);
            break;
        case regId.test(url):
            const id = +req.url.slice(1);
            const data = await fs.promises.readFile(pathFileJSON);
            const students = JSON.parse(data.toString());
            const student = students.find(s => s.id === id);
            if (student === undefined) {
                throw new StudentPointError(1, `студент с id ${id} не найден`);
            }
            res.end(JSON.stringify(student));
            break;
        case url === '/backup':
            const files = [];
            for (const name of await fs.promises.readdir('./backup')) {
                files.push(name);
            }
            res.end(JSON.stringify(files));
            break;
    }
}

async function postHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/':
            let reqData = '';
            for await (const chunk of req) {
                reqData += chunk;
            }
            const newStudent = JSON.parse(reqData.toString());

            const data = await fs.promises.readFile(pathFileJSON);
            const students = JSON.parse(data.toString());

            students.forEach(s => {
                if (s.id === newStudent.id) {
                    throw new StudentPointError(2, `студент с id ${newStudent.id} уже есть`);
                }
            });
            students.push(newStudent);

            await fs.promises.writeFile(pathFileJSON, JSON.stringify(students));
            res.end(JSON.stringify(newStudent));
            serverRPC.emit('change');
            break;
        case '/backup':
            const timeNow = new Date();
            const formatName = `./backup/${timeNow.getFullYear()}${('0' + timeNow.getDate()).slice(-2)}${('0' + (timeNow.getMonth() + 1)).slice(-2)}_StudentList.json`;
            fs.createReadStream(pathFileJSON).pipe(fs.createWriteStream(formatName));
            res.end('Успешно');
            break;
    }
}

async function deleteHandler(req, res) {
    const url = req.url;

    switch (true) {
        case regId.test(url):
            const id = +req.url.slice(1);
            const data = await fs.promises.readFile(pathFileJSON);
            const students = JSON.parse(data.toString());
            const deleteIndexStudent = students.findIndex(s => s.id === id);
            if (deleteIndexStudent === -1) {
                throw new StudentPointError(1, `студент с id ${id} не найден`);
            }
            const deleteStudent = students.splice(deleteIndexStudent, 1);
            await fs.promises.writeFile(pathFileJSON, JSON.stringify(students));
            res.end(JSON.stringify(deleteStudent));
            serverRPC.emit('change');
            break;
        case regBackupDate.test(url):
            const dateString = url.split('/')[2];
            const date = getDateFromYYYYDDMM(dateString);
            for (const name of await fs.promises.readdir('./backup')) {
                const dateFileString = name.split('_')[0];
                const dateFile = getDateFromYYYYDDMM(dateFileString);
                if (date > dateFile) {
                    await fs.promises.unlink(`./backup/${name}`);
                }
            }
            res.end('Успешно');
            break;
    }
}

async function putHandler(req, res) {
    const url = req.url;

    if (url === '/') {
        let reqData = '';
        for await (const chunk of req) {
            reqData += chunk;
        }
        const newStudent = JSON.parse(reqData.toString());

        const data = await fs.promises.readFile(pathFileJSON);
        const students = JSON.parse(data.toString());

        let replaceIndexStudent = students.findIndex(s => s.id === newStudent.id);
        if (replaceIndexStudent === -1) {
            throw new StudentPointError(2, `не найдена информация о студенте с id ${newStudent.id}`);
        }
        students[replaceIndexStudent] = newStudent;

        await fs.promises.writeFile(pathFileJSON, JSON.stringify(students));
        res.end(JSON.stringify(newStudent));
        serverRPC.emit('change');
    }
}

function write405(req, res) {
    res.writeHead(405, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify({
        error: 405,
        message: `Method ${req.method} not allowed`
    }));
}

function getDateFromYYYYDDMM(dateString) {
    const year = dateString.slice(0, 4);
    const day = dateString.slice(4, 6);
    const month = dateString.slice(6);

    return new Date(year, month, day);
}

module.exports = {getHandler, postHandler, deleteHandler, putHandler, write405};