import { fullURL, page2URL, } from "./misc/urls.js";

// Fetch

async function getPosts() {
    const response = await fetch(fullURL);

    const posts = await response.json();

    return posts;
}

// Create HTML

const container = document.querySelector('.blog-posts');

function createHTML(posts) {

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

// Toggle shown posts

const toggleButton = document.querySelector('.toggle');

toggleButton.addEventListener('click', () => {
    getPostsPage2(page2URL).then(handlePosts);
    toggleButton.style.display = 'none';
});

// Create posts from page 2

async function getPostsPage2(page2URL) {
    const response = await fetch(page2URL);

    const posts = await response.json();

    return posts;
}

// Main

async function main() {
    const posts = await getPosts();
    handlePosts(posts);
}

main();