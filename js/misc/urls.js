// Base URLs
const apiBase = 'https://www.bawkposts.no';
const blogPosts = '/wp-json/wp/v2/posts';
const showAllBlogPosts = '?per_page=50';
const show6blogPosts = '?per_page=6';
const page2 = '?page=2';
const _embed = '&_embed=1';
const embedNoPosts = '?_embed=1';

// Full URLs
export const fullURL = apiBase + blogPosts + embedNoPosts;
export const showAllPostsURL = apiBase + blogPosts + showAllBlogPosts + _embed;
export const page2URL = apiBase + blogPosts + page2 + _embed;