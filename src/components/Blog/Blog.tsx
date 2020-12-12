import React, { useEffect, useState } from 'react';
import { fetchBlogByID } from '../../functions/api';
import { formatDate } from '../../functions/customHooks';
import { useParams } from 'react-router-dom';
import { IBlog, IComment } from '../../types';
import { Spinner } from '../Spinner/Spinner';
import { CommentForm } from './CommentForm/CommentForm';
import { Comment } from './Comment/Comment';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
const Container = styled.section`
    background-color: white;
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
const Text = styled.div`
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
    const [comments, setComments] = useState<Array<IComment>>();
    const [madeNewComment, setMadeNewComment] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            const blog: IBlog = await fetchBlogByID(id);
            setBlog(blog);
            setComments(blog.comments);
        };
        fetchBlog();
    }, [id]);
    if (madeNewComment && comments) {
        const newComment = document.getElementById(comments[0]._id);

        newComment?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMadeNewComment(false);
    }
    return (
        <>
            {blog ? (
                <Container>
                    <Title>{blog.title}</Title>
                    <Text>{ReactHtmlParser(blog.text)}</Text>
                    <Info>
                        <span>By: {blog.author.username}</span>
                        <span>{formatDate(blog.timestamp)}</span>
                    </Info>
                    <CommentForm
                        setComments={setComments}
                        setMadeNewComment={setMadeNewComment}
                    />
                    {comments?.map((comment, index) => {
                        return (
                            <Comment
                                comment={comment}
                                key={comment._id}
                                id={comment._id}
                            />
                        );
                    })}
                </Container>
            ) : (
                <Spinner />
            )}
        </>
    );
};
