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
    console.log('Function `savePik` invoked');

    try {
        const res = await client.query(
            q.Map(
                q.Paginate(
                    q.Documents(
                        q.Collection('fav_piks')
                    )
                ),
                q.Lambda('doc', q.Get(q.Var('doc')))
            )
        );
        console.log(res);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully fetched documents',
                data: res.data
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

}