// Get queryString

const pageTitle = document.querySelector("title");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const postId = params.get('id');

async function getPost() {
    const response = await fetch('http://bawkposts.local/wp-json/wp/v2/posts/' + postId);

    const post = await response.json();

    return post;
}

getPost();

console.log(getPost());

function createHTML(post) {
    const container = document.querySelector('.blog-post');

    //Image

    const title = document.createElement('h2');
    title.innerText = post.title.rendered;
    container.append(title);

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