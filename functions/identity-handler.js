// scripts/identity-handler.js
document.addEventListener('DOMContentLoaded', () => {
    const handleTokenConfirmation = async () => {
        if (!window.location.hash) return;

        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const token = hashParams.get('confirmation_token');

        if (!token) return;

        try {
            const response = await fetch(`/.netlify/functions/confirm?token=${token}`, {
                method: 'POST'
            });

            if (response.ok) {
                // Limpiar URL después de la confirmación
                window.history.replaceState({}, document.title, window.location.pathname);
                alert('¡Correo confirmado correctamente!');
                window.location.href = '/admin/';
            } else {
                throw new Error('Error en la confirmación');
            }
        } catch (error) {
            console.error('Error al confirmar:', error);
            alert('Error al confirmar el correo. Por favor intenta nuevamente.');
        }
    };

    handleTokenConfirmation();
});