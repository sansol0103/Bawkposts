import { showAllPostsURL } from './url.js';

async function getPost() {
    const response = await fetch(showAllPostsURL);

    const posts = await response.json();

    return posts;
}

console.log(getPost());

//Create HTML
function createHTML(posts) {
    if (posts.categories[0] === 3) {
    const container = document.querySelector('.featured-post');

    const postsContainer = document.createElement('div');
    postsContainer.className = 'posts-container';
    postsContainer.id = posts.id;

    const title = document.createElement('p');
    title.innerText = posts.title.rendered;
    postsContainer.append(title);

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

    const button = document.createElement('a');
    button.innerText = 'Read more';
    button.className = 'read-more';
    button.href = "blog-specific.html?id=" + posts.id;
    postsContainer.append(button);

    container.append(postsContainer);
    }
}

// Carousel

const carousel = document.querySelector("[data-carousel]");

function createCarouselPosts(posts) {

    const carouselContainer = document.createElement('a');
    carouselContainer.href = "blog-specific.html?id=" + posts.id;
    carouselContainer.className = 'carousel-container', 'wrapper';
    carouselContainer.id = posts.id;

    if (posts._embedded['wp:featuredmedia']) {
        const image = document.createElement('img');
        image.src = posts._embedded['wp:featuredmedia'][0].source_url;
        image.alt = posts._embedded['wp:featuredmedia'][0].alt_text;
        carouselContainer.append(image);
    } else {
        const noImage = document.createElement('p');
        noImage.innerText = 'No image available';
        carouselContainer.append(noImage);
    }

    const title = document.createElement('p');
    title.innerText = posts.title.rendered;
    carouselContainer.append(title);

    carousel.append(carouselContainer);
}

// Carousel buttons

const leftCarouselButton = document.querySelector('.prev');
const rightCarouselButton = document.querySelector('.next');

leftCarouselButton.addEventListener('click', () => {
    carousel.scrollLeft += -210;
});

rightCarouselButton.addEventListener('click', () => {
    carousel.scrollLeft += 210;
});

// Handle posts

function handlePost(posts) {
    for (let i = 0; i < posts.length; i++) {
        createHTML(posts[i]);
        createCarouselPosts(posts[i]);
    }
}

async function main() {
    const posts = await getPost();
    handlePost(posts);
}

main();
