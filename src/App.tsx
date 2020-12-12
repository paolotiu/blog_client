import React, { useEffect, useState } from 'react';
import { IBlog, IUser } from './types';
import {
    BlogPreviewsContainer,
    Header,
    Spinner,
    Blog,
    Login,
    UserBlogsPreview,
    EditBlog,
    CreateBlog,
    SignUp,
} from './components/index';
import { fetchAllBlogs, getUser } from './functions/api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { BlogContext } from './context/BlogContext';
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
    const [user, setUser] = useState<IUser>({
        username: '',
        email: '',
        isLogged: false,
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await fetchAllBlogs();
            setBlogs(blogs);
        };
        fetchBlogs();
        getUser().then(
            (res: { username: string; email: string; error?: string }) => {
                if (res.error) {
                    return null;
                }

                setUser({
                    username: res.username,
                    email: res.email,
                    isLogged: true,
                });
            }
        );
    }, []);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <BlogContext.Provider value={{ setBlogs, blogs }}>
                    <UserContext.Provider value={{ user, setUser }}>
                        <Header />
                    </UserContext.Provider>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/blogs" />
                        </Route>

                        <Route path="/blogs" exact>
                            {blogs ? (
                                <BlogPreviewsContainer />
                            ) : (
                                <Spinner message="Fetching data..." />
                            )}
                        </Route>
                        <Route path="/blogs/:id" exact>
                            <Blog />
                        </Route>
                        <Route path="/login" exact>
                            <UserContext.Provider value={{ user, setUser }}>
                                <Login />
                            </UserContext.Provider>
                        </Route>
                        <Route path="/login/:name" exact>
                            <UserContext.Provider value={{ user, setUser }}>
                                <Login />
                            </UserContext.Provider>
                        </Route>
                        <Route path="/myblogs" exact>
                            <UserBlogsPreview />
                        </Route>
                        <Route path="/edit/:id" exact>
                            <EditBlog user={user} />
                        </Route>
                        <Route path="/create">
                            <CreateBlog />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                    </Switch>
                </BlogContext.Provider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
