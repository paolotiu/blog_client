import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../../functions/customHooks';
import { IComment } from '../../../types';

interface Props {
    comment: IComment;
    id: string;
}

const CommentContainer = styled.div`
    color: ${(props) => props.theme.paragraph};
    display: grid;
    gap: 1em;
    border-radius: 1em;
    box-shadow: ${(props) => props.theme.boxShadow};
    padding: 1em 1em 1em 0.5em;
    span {
        font-weight: 300;
        font-size: 0.8em;
        justify-self: flex-end;
    }
`;

export const Comment: React.FC<Props> = ({ comment, id }) => {
    return (
        <CommentContainer id={id}>
            <h2>{comment.author}</h2>
            <p>{comment.text}</p>

            <span>
                {comment.timestamp ? formatDate(comment.timestamp) : ''}
            </span>
        </CommentContainer>
    );
};
