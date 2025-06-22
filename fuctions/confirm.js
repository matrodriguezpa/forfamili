// functions/confirm.js
const fetch = require('node-fetch');

exports.handler = async (event) => {

    const token = event.queryStringParameters.token;

    try {
        const response = await fetch('https://api.netlify.com/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token})
        });

        if (!response.ok) {
            throw new Error(`Error de verificación: ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Verificación exitosa'})
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: error.message})
        };
    }
};