export const fetchAllBlogs = async () => {
    const blogs = await fetch('https://blog-api-pt.herokuapp.com/blogs');
    return blogs.json();
};

export const fetchBlogByID = async (id: string) => {
    const blog = await fetch('https://blog-api-pt.herokuapp.com/blogs/' + id);
    return blog.json();
};

export const postComment = async (id: string, author: string, text: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const urlencoded = new URLSearchParams();
    urlencoded.append('author', author);
    urlencoded.append('text', text);
    const res = await fetch(
        'https://blog-api-pt.herokuapp.com/blogs/' + id + '/comment',
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ author, text }),
        }
    );
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
        const res = await fetch(
            'http://localhost:3001/user/login',
            requestOptions
        );
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
    const res = await fetch('http://localhost:3001/user', {
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

    const res = await fetch('http://localhost:3001/user/blogs', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const json = await res.json();

    return json;
};
