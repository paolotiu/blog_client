import React, { useState, useEffect } from 'react';
import { getOwnBlogs } from '../../functions/api';
import { IBlog } from '../../types';
import { Spinner } from '../index';
import { BlogPreviewsContainer } from '../BlogPreviews/BlogPreviewsContainer';
import styled from 'styled-components';

const StyledHeader = styled.h1`
    text-align: center;
    margin-top: 50px;
    color: ${(props) => props.theme.headline};
`;
export const UserBlogsPreview: React.FC = () => {
    const [blogs, setBlogs] = useState<IBlog[] | null>();
    useEffect(() => {
        getOwnBlogs().then((blogs) => {
            if (blogs.error) {
                return;
            }
            setBlogs(blogs);
        });
    }, []);
    return (
        <>
            <StyledHeader style={{ textAlign: 'center' }}>
                Your Blogs
            </StyledHeader>
            {blogs ? <BlogPreviewsContainer blogs={blogs} /> : <Spinner />}
        </>
    );
};
