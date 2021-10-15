const faunadb = require('faunadb');

// initialize faunaDB client with our secret
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: 'db.fauna.com',
    scheme: 'https'
});

// the query object provides us with functions to create a new document in the collection
const q = faunadb.query;


exports.handler = async (event, context) => {

    // get the data from the body of the request
    const data = JSON.parse(event.body);

    try {
        // create document in existing collection
        const response = await client.query(
            q.Create(q.Collection('fav_piks'), {
                data
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully created document',
                data: response
            })
        };

    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({
                error
            })
        };
    }
};