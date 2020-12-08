import styled from 'styled-components';
import React from 'react';
import { IBlog } from '../../types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../functions/customHooks';

interface Props {
    key: number;
    blog: IBlog;
}

const padding = '15px';
const StyledBlogPreview = styled.div`
    color: ${(props) => props.theme.paragraph};
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(40px);
    cursor: pointer;
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(182, 182, 182, 0.089);
    padding: ${padding};
    border-radius: 4px;
    position: relative;
    height: 100%;
    transition: all 0.5s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const StyledHeader = styled.h1`
    font-size: 1.7em;
    color: ${(props) => props.theme.headline};
`;

const StyledPreview = styled.p`
    max-height: 40%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
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
