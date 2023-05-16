import { fullURL } from './url.js';

async function getPost() {
    const response = await fetch(fullURL);

    const posts = await response.json();

    return posts;
}

console.log(getPost());

//Create HTML
function createHTML(posts) {
    if (posts.categories[0] === 3) {
    const container = document.querySelector('.featured-post');

    const postsContainer = document.createElement('a');
    postsContainer.href = "blog-specific.html?id=" + posts.id;
    postsContainer.className = 'posts-container';
    postsContainer.id = posts.id;

    if (posts._embedded['wp:featuredmedia']) {
        const image = document.createElement('img');
        image.src = posts._embedded['wp:featuredmedia'][0].source_url;
        image.alt = posts._embedded['wp:featuredmedia'][0].alt_text;
        image.classList.add('image');
        postsContainer.append(image);
    } else {
        const noImage = document.createElement('p');
        noImage.innerText = 'No image available';
        postsContainer.append(noImage);
    }

    const title = document.createElement('h2');
    title.innerText = posts.title.rendered;
    postsContainer.append(title);

    container.append(postsContainer);
    }
}

function handlePost(posts) {
    for (let i = 0; i < posts.length; i++) {
        createHTML(posts[i]);
    }
}

async function main() {
    const posts = await getPost();
    handlePost(posts);
}

main();
