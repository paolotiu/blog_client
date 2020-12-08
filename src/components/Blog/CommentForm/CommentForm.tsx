import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postComment } from '../../../functions/api';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: grid;
    gap: 1em;
    border: 2px solid ${(props) => props.theme.stroke};
    padding: 2em;
    color: ${(props) => props.theme.paragraph};
    h2 {
        padding-bottom: 1em;
    }
`;

const StyledInptContainer = styled.div`
    display: grid;
    gap: 0.4em;

    input[type='text'] {
        padding: 0.4em;
        max-width: 250px;
    }
    textarea {
        resize: none;
    }

    input,
    textarea {
        border: 1px solid ${(props) => props.theme.stroke};
    }
`;

export const CommentForm: React.FC = ({}) => {
    const { id } = useParams<{ id: string }>();
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (e.target.name === 'author') {
            setAuthor(e.target.value);
        } else if (e.target.name === 'text') {
            setText(e.target.value);
        }
    }

    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        postComment(id, author, text).then((json) => {
            console.log(json);
        });
    }
    return (
        <StyledForm onSubmit={handleSubmit}>
            <h2>Leave a comment </h2>
            <StyledInptContainer>
                <label htmlFor="author">Name:</label>
                <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={handleChange}
                />
            </StyledInptContainer>
            <StyledInptContainer>
                <label htmlFor="text">Comment:</label>
                <textarea
                    name="text"
                    id=""
                    value={text}
                    onChange={handleChange}
                    cols={30}
                    rows={10}
                ></textarea>
            </StyledInptContainer>
            <input type="submit" />
        </StyledForm>
    );
};
