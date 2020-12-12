const url = 'https://blog-api-pt.herokuapp.com';

export const fetchAllBlogs = async () => {
    const blogs = await fetch(url + '/blogs');
    return blogs.json();
};

export const fetchBlogByID = async (id: string) => {
    const blog = await fetch(url + '/blogs/' + id);
    return blog.json();
};

export const postComment = async (id: string, author: string, text: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const res = await fetch(url + '/blogs/' + id + '/comment', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ author, text }),
    });
    return res.json();
};

export const loginUser = async (username: string, password: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('username', username);
    urlencoded.append('password', password);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: urlencoded,
    };

    try {
        const res = await fetch(url + '/user/login', requestOptions);
        const json = await res.json();
        return json;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { error: 'No token' };
    }
    const res = await fetch(url + '/user', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    const json = await res.json();

    return json;
};

export const getOwnBlogs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { error: 'No token' };
    }

    const res = await fetch(url + '/user/blogs', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const json = await res.json();

    return json;
};

export const updateBlog = async (id: string, title: string, text: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { error: 'No token' };
    }

    const res = await fetch(url + '/blogs/' + id, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
    });

    const json = await res.json();

    return json;
};

export const deleteBlog = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { error: 'No token' };
    }

    const res = await fetch(url + '/blogs/' + id, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const json = await res.json();

    return json;
};

export const createblog = async (title: string, text: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { error: 'No token' };
    }

    const res = await fetch(url + '/blogs/', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const json = await res.json();

    return json;
};
