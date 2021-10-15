const fetch = require('node-fetch')

const CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;
console.log(CLIENT_ID);

const unsplashURL = `https://api.unsplash.com/photos/random/?client_id=${CLIENT_ID}&?query=lucky&orientation=landscape`;

console.log(unsplashURL);

const getImgData = async () => {
    const res = await fetch(unsplashURL);
    const data = await res.json()

    return data
}

exports.handler = async function () {
    const imgData = await getImgData();

    return {
        statusCode: 200,
        body: JSON.stringify({ data: imgData }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json"
            // "Access-Control-Allow-Methods": "GET, POST, OPTION",
        }
    }
}