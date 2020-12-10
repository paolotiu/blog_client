import React, { ChangeEvent, useRef } from 'react';
import styled, { css } from 'styled-components';

function createCSS() {
    let styles = '';
    for (let i = 1; i <= 3; i++) {
        styles += `
        #option-${i}{
            transform-origin: top center
            animation: scaleZ 300ms ${i * 60}ms ease-in-out forwards
        }
        `;
    }
}
const StyledDropwdown = styled.div`
    justify-self: end;
    position: relative;
    background-color: ${(props) => props.theme.buttonbg};

    button {
        padding: 0.8em 1.2em;
        background-color: ${(props) => props.theme.buttonbg};
        outline: none;
        border: 2px solid ${(props) => props.theme.headline};
        color: inherit;
    }

    .options {
        top: 90%;
        right: 0;
        display: none;
        position: absolute;
        background-color: inherit;

        ul {
            padding: 0;
            list-style-type: none;
            text-align: right;
            white-space: nowrap;

            li {
                padding: 1em;
                border-top: 2px solid ${(props) => props.theme.headline};
                border-left: 2px solid ${(props) => props.theme.headline};
                border-right: 2px solid ${(props) => props.theme.headline};
            }
            li:last-child {
                border-bottom: 2px solid ${(props) => props.theme.headline};
            }
        }
    }
    .show {
        display: block;
        animation: slideIn 300ms ease-in-out forwards;
    }
    .leave {
        display: block;
        animation: slideOut 300ms ease-in-out forwards;
    }

    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translateX(100px);
        }

        80% {
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes slideOut {
        0% {
            opacity: 1;
        }

        80% {
            opacity: 0.8;
        }

        100% {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
interface Props {
    username: string;
}

interface RefObject extends HTMLDivElement {}

export const Dropdown: React.FC<Props> = ({ username }) => {
    const options = useRef<HTMLDivElement>(null);

    function toggleDropdown(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        const dd = options.current;
        if (dd) {
            if (dd.classList.contains('show')) {
                dd.classList.remove('show');
                dd.classList.add('leave');
                setTimeout(() => {
                    dd.classList.remove('leave');
                }, 300);
            } else {
                dd.classList.add('show');
            }
        }
    }
    return (
        <StyledDropwdown>
            <button onClick={toggleDropdown}>{username}</button>
            <div className="options" ref={options}>
                <ul>
                    <li id="option-1">Your Blogs</li>
                    <li id="option-2">Log Out</li>
                </ul>
            </div>
        </StyledDropwdown>
    );
};
