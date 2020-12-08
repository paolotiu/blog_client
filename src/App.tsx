import React, { useEffect, useState } from 'react';
import { IBlog } from './types';
import {
    BlogPreviewsContainer,
    Header,
    Spinner,
    Blog,
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
    stroke: '#272343',
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
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/blogs" />
                </Route>
                <ThemeProvider theme={theme}>
                    <Route path="/blogs" exact>
                        {blogs ? (
                            <BlogPreviewsContainer blogs={blogs} />
                        ) : (
                            <Spinner />
                        )}
                    </Route>
                    <Route path="/blogs/:id">
                        <Blog />
                    </Route>
                </ThemeProvider>
            </Switch>
        </Router>
    );
}

export default App;
