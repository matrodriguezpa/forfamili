// Carga la lista de posts
async function loadPosts() {
    try {
        const res = await fetch('/posts.json');
        if (!res.ok) throw new Error('Failed to load posts');

        const posts = await res.json();
        const container = document.getElementById('posts');

        posts.forEach(post => {
            // Formatear fecha en español (colombia)
            const dateObj = new Date(post.date);
            const formattedDate = dateObj.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            /*
            // Construir contenido de preview (imagen + texto)
            let previewContent = '';
            if (post.previewImage) {
                previewContent += `
                    <div class="post-preview-image">
                        <img src="${post.previewImage}" alt="Vista previa de ${post.title}" />
                    </div>
                `;
            }
            if (post.previewText) {
                previewContent += `
                    <div class="post-preview-text">
                        <p>${post.previewText}</p>
                    </div>
                `;
            }
            */

            // Crear el artículo
            const article = document.createElement('article');
            article.innerHTML = `
                <h2>
                    <a href="/post.html?slug=${post.slug}">${post.title}</a>
                </h2>
                <time datetime="${post.date}">${formattedDate}</time>
                ${previewContent}
            `;

            container.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts').innerHTML =
            '<p class="error-message">Error cargando publicaciones. Por favor intenta recargar.</p>';
    }
}

// Carga post individual
async function loadPost() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (!slug) throw new Error('Missing slug parameter');

        const res = await fetch(`/posts/${slug}.json`);
        if (!res.ok) throw new Error('Post not found');

        const post = await res.json();

        // Formatear fecha
        const dateObj = new Date(post.date);
        const formattedDate = dateObj.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Actualizar contenido del post
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-meta').innerHTML = `
            <time datetime="${post.date}">${formattedDate}</time>
        `;
        document.getElementById('post-content').innerHTML = post.body;

        // Actualizar el título de la página
        document.title = `${post.title} - Forfamili`;

    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-content').innerHTML =
            '<p class="error-message">Error cargando la publicación. Por favor verifica la URL.</p>';
    }
}

if (document.getElementById('posts')) loadPosts();
if (document.getElementById('post-content')) loadPost();