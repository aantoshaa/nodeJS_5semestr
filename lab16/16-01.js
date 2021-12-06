const http = require('http');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const {graphql, buildSchema} = require('graphql');
const {PORT} = require('./src/common/config');
const resolver = require('./src/resolver/resolver');
const context = require('./src/context/context');

const schema = buildSchema(fs.readFileSync('./schema.gql').toString());
const server = http.createServer();

server.on('request', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const body = await getBody();
    const graphqlRequest = JSON.parse(body);

    const answerFromGQL = await graphql(schema, graphqlRequest.query, resolver, context, graphqlRequest.variables);
    if (answerFromGQL.data) {
        res.end(JSON.stringify(answerFromGQL.data));
    } else {
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.end(JSON.stringify(answerFromGQL.errors));
    }

    async function getBody() {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        return Buffer.concat(buffers).toString();
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});