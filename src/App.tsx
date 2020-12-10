import React, { useEffect, useState } from 'react';
import { IBlog } from './types';
import {
    BlogPreviewsContainer,
    Header,
    Spinner,
    Blog,
    Login,
} from './components/index';
import { fetchAllBlogs } from './functions/api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
const theme = {
    headline: '#272343',
    paragraph: '#2d334a',
    bg: '#fffffe',
    info: '#ffd803',
    buttonbg: '#ffd803',
    stroke: '#272343',
    boxShadow: '10px 10px 10px rgba(182, 182, 182, 0.089)',
};
function App() {
    const [blogs, setBlogs] = useState<IBlog[] | null>();
    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await fetchAllBlogs();
            setBlogs(blogs);
        };
        fetchBlogs();
    }, []);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/blogs" />
                    </Route>

                    <Route path="/blogs" exact>
                        {blogs ? (
                            <BlogPreviewsContainer blogs={blogs} />
                        ) : (
                            <Spinner />
                        )}
                    </Route>
                    <Route path="/blogs/:id" exact>
                        <Blog />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;
