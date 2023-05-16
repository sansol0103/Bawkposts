// Base URL
const apiBase = 'http://bawkposts.local';
const blogPosts = '/wp-json/wp/v2/posts';
const showAllBlogPosts = '?per_page=50';
const blogPostsPage2 = '?page=2';
const _embed = '&_embed=1';

// Full URL
export const fullURL = apiBase + blogPosts + showAllBlogPosts + _embed;; 

