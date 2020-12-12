import React, { useContext } from 'react';
import styled from 'styled-components';
import { IBlog } from '../../types';
import { BlogPreview } from './BlogPreview';
import { BlogContext } from '../../context/BlogContext';
const StyledBG = styled.div`
    position: fixed;
    z-index: -1;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;

    background-image: url('https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
`;
const StyledContainer = styled.section`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: clamp(200px, 25vh, 400px);
    gap: 4em;
    padding: 50px clamp(50px, 1vw, 200px);
`;

interface Props {
    editing?: boolean;
    setBlogs?: React.Dispatch<React.SetStateAction<IBlog[] | null | undefined>>;
    ownBlogs?: IBlog[];
}

export const BlogPreviewsContainer: React.FC<Props> = ({
    editing,
    ownBlogs,
}) => {
    const { blogs } = useContext(BlogContext);
    return (
        <>
            <StyledContainer>
                {editing
                    ? ownBlogs?.map((blog, index) => {
                          if (editing) {
                              return (
                                  <BlogPreview
                                      key={index}
                                      blog={blog}
                                      editing={editing}
                                  />
                              );
                          }
                          return <BlogPreview key={index} blog={blog} />;
                      })
                    : blogs?.map((blog, index) => {
                          if (editing) {
                              return (
                                  <BlogPreview
                                      key={index}
                                      blog={blog}
                                      editing={editing}
                                  />
                              );
                          }
                          return <BlogPreview key={index} blog={blog} />;
                      })}
            </StyledContainer>
            <StyledBG />
        </>
    );
};
