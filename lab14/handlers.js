const sql = require('mssql/msnodesqlv8');
const fs = require('fs');

const config = {
    database: 'lab14_nodeJS',
    server: 'localhost',
    driver: "msnodesqlv8",
    options: {trustedConnection: true}
};
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function getHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/':
            res.writeHead(200, { 'Content-Type' : 'text/html;charset=utf-8' });
            fs.createReadStream('./index.html').pipe(res);
            break;
        case '/api/faculty':
        case '/api/pulpit':
        case '/api/subject':
        case '/api/auditorium_type':
        case '/api/auditorium':
            const parseUrl = url.split('/');
            const table = parseUrl[2];

            await poolConnect;
            const result = await pool.request()
                .query(`select *
                        from ${table}`);
            res.end(JSON.stringify(result.recordset));
            break;
    }
}

async function postHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/api/faculty':
        case '/api/pulpit':
        case '/api/subject':
        case '/api/auditorium_type':
        case '/api/auditorium':
            const parseUrl = url.split('/');
            const table = parseUrl[2];

            let strInsertObj = '';
            req.on('data', data => {
                strInsertObj += data;
            });
            req.on('end', async () => {
                const insertObj = JSON.parse(strInsertObj);

                let keys = Object.keys(insertObj);
                let values = Object.values(insertObj);

                let strKeys = '';
                let strValues = '';

                for (let i = 0; i < keys.length; i++) {
                    if (i !== 0) {
                        strKeys += ` , ${keys[i]} `;
                        strValues += ` , '${values[i]}' `;
                    } else {
                        strKeys += ` ${keys[i]} `;
                        strValues += ` '${values[i]}' `;
                    }
                }

                try {
                    await poolConnect;
                    await pool.request()
                        .query(`insert into ${table} (${strKeys})
                                values (${strValues})`);
                    res.end(JSON.stringify(insertObj));
                } catch (err) {
                    res.end(JSON.stringify({error: 'error', message: `Не удалось добавить данные в таблицу ${table}`}));
                }
            });
            break;
    }
}

function putHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/api/faculty':
        case '/api/pulpit':
        case '/api/subject':
        case '/api/auditorium_type':
        case '/api/auditorium':
            const parseUrl = url.split('/');
            const table = parseUrl[2];

            let strUpdatedObj = '';
            req.on('data', data => {
                strUpdatedObj += data;
            });
            req.on('end', async () => {
                const updatedObj = JSON.parse(strUpdatedObj);

                let keys = Object.keys(updatedObj);
                let values = Object.values(updatedObj);

                let updatedValues = '';
                for (let i = 0; i < keys.length; i++) {
                    if (i !== 0) {
                        updatedValues += `, ${keys[i]} = '${values[i]}' `;
                    } else {
                        updatedValues += `${keys[i]} = '${values[i]}' `;
                    }
                }

                try {
                    await poolConnect;
                    await pool.request()
                        .query(`update ${table}
                                set ${updatedValues}
                                where ${keys[0]} = '${values[0]}'`);
                    res.end(JSON.stringify(updatedObj));
                } catch (err) {
                    res.end(JSON.stringify({error: 'error', message: `Не удалось обновить данные в таблице ${table}`}));
                }
            });
            break;
    }
}

async function deleteHandler(req, res) {
    const url = req.url;

    switch (true) {
        case /^\/api\/faculty\//.test(url):
        case /^\/api\/pulpit\//.test(url):
        case /^\/api\/subject\//.test(url):
        case /^\/api\/auditorium_type\//.test(url):
        case /^\/api\/auditorium\//.test(url):
            const parseUrl = url.split('/');
            const table = parseUrl[2];
            const id = parseUrl[3];
                try {
                    await poolConnect;
                    await pool.request()
                        .query(`delete from ${table} where ${table} = '${id}'`);
                    res.end(JSON.stringify({status: 'Успешно'}));
                } catch (err) {
                    res.end(JSON.stringify({error: 'error', message: `Не удалось удалить данные из таблицы ${table} по ключу ${id}`}));
                }
            break;
    }
}

module.exports = {
    getHandler,
    postHandler,
    putHandler,
    deleteHandler
};