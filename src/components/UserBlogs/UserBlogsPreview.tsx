import React, { useState, useEffect } from 'react';
import { getOwnBlogs } from '../../functions/api';
import { IBlog } from '../../types';
import { Spinner } from '../index';
import { BlogPreviewsContainer } from '../BlogPreviews/BlogPreviewsContainer';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledHeader = styled.h1`
    text-align: center;
    margin-top: 50px;
    color: ${(props) => props.theme.headline};
`;

export const UserBlogsPreview: React.FC = () => {
    const [blogs, setBlogs] = useState<IBlog[] | null>();
    const history = useHistory();
    useEffect(() => {
        getOwnBlogs().then((blogs) => {
            if (blogs.error) {
                history.push('/blogs');
                return;
            }
            setBlogs(blogs);
        });
    }, [history]);

    return (
        <>
            <StyledHeader style={{ textAlign: 'center' }}>
                Your Blogs
            </StyledHeader>
            {blogs ? (
                <>
                    <BlogPreviewsContainer editing={true} ownBlogs={blogs} />
                </>
            ) : (
                <Spinner message="This may take a few seconds" />
            )}
        </>
    );
};
