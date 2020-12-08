import React, { useEffect, useState } from 'react';
import { fetchBlogByID } from '../../functions/api';
import { formatDate } from '../../functions/customHooks';
import { useParams } from 'react-router-dom';
import { IBlog } from '../../types';
import { Spinner } from '../Spinner/Spinner';
import { CommentForm } from './CommentForm/CommentForm';
import styled from 'styled-components';
const Container = styled.section`
    padding: 1em;
    display: grid;
    max-width: 1000px;
    margin: 0 auto;
    gap: 20px;
`;
const Title = styled.h1`
    color: ${(props) => props.theme.headline};
    font-size: 2em;
    margin: 0;
`;
const Text = styled.p`
    color: ${(props) => props.theme.paragraph};
    font-weight: 300;
    line-height: 1.5em;
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.info};
`;
export const Blog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<IBlog>();

    useEffect(() => {
        const fetchBlog = async () => {
            const blog = await fetchBlogByID(id);
            setBlog(blog);
        };
        fetchBlog();
    }, [id]);

    return (
        <>
            {blog ? (
                <Container>
                    <Title>{blog.title}</Title>
                    <Text>{blog.text}</Text>
                    <Info>
                        <span>By: {blog.author.username}</span>
                        <span>{formatDate(blog.timestamp)}</span>
                    </Info>
                    <CommentForm />
                    {blog.comments.map((comment) => {
                        return <p>{comment.author}</p>;
                    })}
                </Container>
            ) : (
                <Spinner />
            )}
        </>
    );
};