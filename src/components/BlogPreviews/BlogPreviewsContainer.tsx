import React from 'react';
import styled from 'styled-components';
import { IBlog } from '../../types';
import { BlogPreview } from './BlogPreview';

interface Props {
    blogs: IBlog[];
}
const StyledContainer = styled.section`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: clamp(10px, 25vh, 400px);
    gap: 4em;
    padding: 50px clamp(50px, 1vw, 200px);
`;

export const BlogPreviewsContainer: React.FC<Props> = ({ blogs }) => {
    return (
        <StyledContainer>
            {blogs.map((blog, index) => {
                return <BlogPreview key={index} blog={blog} />;
            })}
        </StyledContainer>
    );
};
