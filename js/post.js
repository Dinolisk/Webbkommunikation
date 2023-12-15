document.addEventListener('DOMContentLoaded', async function() {

    const postDetailsContainer = document.getElementById('post-details');

    // Returnerar ett felmeddelande och avsluta funktionen om behållaren inte existerar
    if (!postDetailsContainer) {
        console.error("post-details behållaren finns inte");
        return;
    }

    // Hämtar ID för inlägget från URL:en
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Skapar URL:en för att hämta specifika inläggsdetaljer baserat på ID
    const API_URL = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    try {
        // Hämtar inläggsdetaljer från API:et med den specifika URL:en
        const response = await fetch(API_URL);
        const post = await response.json();

        // Skapar element för författare, datum, taggar och innehåll baserat på inläggsdetaljerna
        const authorElement = document.createElement('p');
        authorElement.textContent = `Författare: ${post.author || 'Okänd'}`;

        const dateElement = document.createElement('p');
        dateElement.textContent = `Datum: ${post.date || 'Okänt'}`;

        const tagsElement = document.createElement('p');
        tagsElement.textContent = `Taggar: ${post.tags ? post.tags.join(', ') : 'Inga'}`;

        const contentElement = document.createElement('p');
        contentElement.textContent = `Innehåll: ${post.content || 'Inget innehåll tillgängligt'}`;

        postDetailsContainer.appendChild(authorElement);
        postDetailsContainer.appendChild(dateElement);
        postDetailsContainer.appendChild(tagsElement);
        postDetailsContainer.appendChild(contentElement);
    } catch (error) {
        // Använder catch för att hantera eventuella fel vid hämtning av inläggsdetaljer från API:et
        console.error('Fel vid hämtning av inläggsdetaljer:', error);
    }
});
