// Base URL
const apiBase = 'http://bawkposts.local';
const blogPosts = '/wp-json/wp/v2/posts?_embed';

// Full URL
const fullURL = apiBase + blogPosts;

// Fetch

async function getPosts() {
    const response = await fetch(fullURL);

    const posts = await response.json();

    return posts;
}

console.log(getPosts());

// Create HTML

function createHTML(posts) {
    const container = document.querySelector('.blog-posts');

    const postsContainer = document.createElement('a');
    postsContainer.href = "blog-specific.html?id=" + posts.id;
    postsContainer.className = 'posts-container';
    postsContainer.id = posts.id;

    const title = document.createElement('h2');
    title.innerText = posts.title.rendered;
    postsContainer.append(title);


    if (posts._embedded['wp:featuredmedia']) {
        const image = document.createElement('img');
        image.src = posts._embedded['wp:featuredmedia'][0].source_url;
        image.alt = posts._embedded['wp:featuredmedia'][0].alt_text;
        postsContainer.append(image);
    } else {
        const noImage = document.createElement('p');
        noImage.innerText = 'No image available';
        postsContainer.append(noImage);
    }

    container.append(postsContainer);
}

function handlePosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        createHTML(posts[i]);
    }
}

async function main() {
    const posts = await getPosts();
    handlePosts(posts);
}

main();