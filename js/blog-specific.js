// Get queryString

const pageTitle = document.querySelector("title");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const postId = params.get('id');

async function getPost() {
    const response = await fetch('http://bawkposts.local/wp-json/wp/v2/posts/' + postId + '?_embed&per_page=50');

    const post = await response.json();

    return post;
}

getPost();

console.log(getPost());

function createHTML(post) {
    const container = document.querySelector('.blog-post');

    const title = document.createElement('h2');
    title.innerText = post.title.rendered;
    container.append(title);

    if (post._embedded['wp:featuredmedia']) {
        const image = document.createElement('img');
        image.src = post._embedded['wp:featuredmedia'][0].source_url;
        image.alt = post._embedded['wp:featuredmedia'][0].alt_text;
        image.classList.add('image');
        container.append(image);
    } else {
        const noImage = document.createElement('p');
        noImage.innerText = 'No image available';
        container.append(noImage);
    }

    const content = document.createElement('div');
    content.innerHTML = post.content.rendered;
    container.append(content);

    const date = document.createElement('p');
    date.innerText = post.date;
    container.append(date);

    pageTitle.innerText += post.title.rendered;
}

async function main() {
    const post = await getPost();
    createHTML(post);
}

main();