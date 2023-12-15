const API_URL = 'https://blog-api-assignment.up.railway.app/posts';

// Funktion för att hämta blogginlägg från API:et
async function getBlogPosts() {
    try {
        // Hämtar data från API:et
        const response = await fetch(API_URL);
        // Konverterar till JSON-format
        const posts = await response.json();
        return posts;
    } catch (error) {
        // try catch för att hantera eventuella fel vid hämtning av inlägg
        console.error('Fel vid hämtning av blogginlägg:', error);
        return [];
    }
}

// Funktion för att visa blogginlägg på sidan
async function displayBlogPosts() {
    const postsContainer = document.getElementById('blog-posts');
    
    // Hämtar blogginlägg från API:et
    let posts = await getBlogPosts();

    // Loopa igenom varje inlägg och skapa element för att visa dem
    posts.forEach(post => {
        let postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        let title = document.createElement('h2');
        title.textContent = post.title;

        let author = document.createElement('p');
        author.textContent = `Författare: ${post.author}`;

        let date = document.createElement('p');
        date.textContent = `Datum: ${post.date}`;

        let content = document.createElement('p');
        content.textContent = `${post.content.substring(0, 100)}...`; // Visar endast de första 100 karaktärerna

        let tags = document.createElement('p');
        tags.textContent = `Taggar: ${post.tags ? post.tags.join(', ') : 'Inga'}`;

        // Skapar en "Läs mer.." länk för varje inlägg
        let readMoreLink = document.createElement('a');
        readMoreLink.textContent = 'Läs mer..';

        // Sätter href-attributet för länken baserat på inläggets ID (_id)
        if (post._id) {
            readMoreLink.href = `post.html?id=${post._id}`;
        } else {
            readMoreLink.href = '#'; // Sätter en fallback-URL eller hantera saknade ID:n på lämpligt sätt
            console.error('Inläggets ID (_id) är undefined eller null:', post);
        }
        postElement.appendChild(title);
        postElement.appendChild(author);
        postElement.appendChild(date);
        postElement.appendChild(content);
        postElement.appendChild(tags);
        postElement.appendChild(readMoreLink);
        
        postsContainer.appendChild(postElement);
    });
}

// Anropar displayBlogPosts när fönstret laddas
window.onload = displayBlogPosts;
