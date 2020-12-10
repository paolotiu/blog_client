import React, { ChangeEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { loginUser } from '../../functions/api';
import { UserContext } from '../../context/UserContext';
import {
    StyledCommentForm,
    StyledInputContainer,
} from '../Blog/CommentForm/CommentForm';
import { IUser } from '../../types';
const StyledForm = styled(StyledCommentForm)`
    margin: 0 auto;
    margin-top: 4em;
    max-width: 600px;
    padding: 5em;
    justify-items: center;

    button[type='submit'] {
        width: 40%;
    }
`;

const StyledLoginInput = styled(StyledInputContainer)`
    align-items: center;
    width: 100%;
    padding: 1em;
    input {
        padding: 0.4em;
    }
    input[type='text'] {
        max-width: 800px;
    }
`;

const StyledError = styled.ul`
    justify-self: start;
    color: #ff4343;
    width: 100% li {
        list-style-type: disc;
    }
`;
export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('You must input a username and password');
            return;
        } else {
            loginUser(username, password)
                .then(
                    (res: {
                        user: { username: string; email: string };
                        token: string;
                        error: string;
                    }) => {
                        if (res.error) {
                            setError(res.error);
                        } else {
                            if (setUser) {
                                console.log(res.user);
                                setUser({
                                    ...res.user,
                                    isLogged: true,
                                });
                            }
                            localStorage.setItem('token', res.token);
                            setUsername('');
                            setPassword('');
                        }
                    }
                )
                .catch((err) => setError(err.message));
        }
    }
    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledLoginInput>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
            </StyledLoginInput>
            <StyledLoginInput>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </StyledLoginInput>
            {error ? (
                <StyledError>
                    <li>{error}</li>
                </StyledError>
            ) : (
                ''
            )}
            <button type="submit">
                <span className="submit">Submit</span>
            </button>
        </StyledForm>
    );
};
