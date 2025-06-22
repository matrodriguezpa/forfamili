// Verificar si estamos en la página principal
if (window.location.pathname === "/") {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Identity handler loaded");

        // Manejar token de confirmación
        if (window.location.hash.includes('confirmation_token')) {
            console.log("Token found in URL");
            confirmToken();
        }
    });

    async function confirmToken() {
        try {
            // Extraer token del hash
            const token = new URLSearchParams(window.location.hash.substring(1)).get('confirmation_token');
            if (!token) throw new Error("Token not found");

            console.log("Sending token to server:", token);

            // Llamar a la función de Netlify
            const response = await fetch(`/.netlify/functions/confirm?token=${encodeURIComponent(token)}`, {
                method: 'POST'
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorData}`);
            }

            // Limpiar URL y redirigir
            window.history.replaceState({}, document.title, "/");
            alert('¡Cuenta verificada correctamente! Redirigiendo al panel de administración...');
            window.location.href = '/admin/';
        } catch (error) {
            console.error("Confirmation failed:", error);
            alert(`Error de confirmación: ${error.message}. Por favor contacta al soporte.`);
        }
    }
}