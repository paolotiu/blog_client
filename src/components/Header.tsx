import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: grid;
    background-color: pink;
    padding: 1em 2em;
    grid-template-columns: 1fr minmax(200px, 2fr);
    align-items: center;
`;

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <Link
                to="/blogs"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                Blogs
            </Link>
        </StyledHeader>
    );
};
