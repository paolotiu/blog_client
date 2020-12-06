export const fetchAllBlogs = async () => {
    const blogs = await fetch('https://blog-api-pt.herokuapp.com/blogs');
    return blogs.json();
};
