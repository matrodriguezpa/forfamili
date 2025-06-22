const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Validar token
    const token = event.queryStringParameters.token;
    if (!token || token.length < 10) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Token inválido" })
        };
    }

    try {
        // Verificar con el servicio de Netlify
        const verifyResponse = await fetch('https://api.netlify.com/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await verifyResponse.json();

        if (!verifyResponse.ok) {
            return {
                statusCode: verifyResponse.status,
                body: JSON.stringify({
                    error: "Error en verificación",
                    details: data
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "¡Cuenta verificada!",
                user: data
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Error interno del servidor",
                details: error.message
            })
        };
    }
};