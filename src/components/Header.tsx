import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: grid;
    background-color: pink;
    padding: 1em 2em;
`;

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <span>Blog</span>
        </StyledHeader>
    );
};
