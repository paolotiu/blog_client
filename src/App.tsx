import React, { useEffect, useState } from 'react';
import { Blog } from './types';
import { BlogPreviewsContainer, Header } from './components/index';
import { fetchAllBlogs } from './functions/api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

function App() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await fetchAllBlogs();
            setBlogs(blogs);
        };
        fetchBlogs();
    }, []);

    console.log(blogs);
    return (
        <Router>
            <Header />

            <Switch>
                <Route path="/" exact>
                    <Redirect to="/blogs" />
                </Route>
                <Route path="/blogs">
                    <BlogPreviewsContainer blogs={blogs} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
