import styled from 'styled-components';
import React from 'react';
import { IBlog } from '../../types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../functions/customHooks';
const padding = '15px';
const StyledBlogPreview = styled.div`
    color: black;
    cursor: pointer;
    box-shadow: 1px 1px 4px black;
    padding: ${padding};
    border-radius: 4px;
    position: relative;
    height: 100%;
`;

const StyledHeader = styled.h1`
    font-size: 1.7em;
`;

const StyledPreview = styled.p`
    max-height: 40%;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const StyledInfo = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    color: ${(props) => props.theme.info};
    width: 100%;
    padding: ${padding};
`;
interface Props {
    blog: IBlog;
}

export const BlogPreview: React.FC<Props> = (props) => {
    const { blog } = props;

    return (
        <Link
            to={'/blogs/' + blog._id}
            style={{
                textDecoration: 'none',
                width: '100%',
                height: '100%',
            }}
        >
            <StyledBlogPreview>
                <StyledHeader>{blog.title}</StyledHeader>
                <StyledPreview>{blog.text}</StyledPreview>
                <StyledInfo>
                    <p>{blog.author.username}</p>
                    <p>{formatDate(blog.timestamp)}</p>
                </StyledInfo>
            </StyledBlogPreview>
        </Link>
    );
};
