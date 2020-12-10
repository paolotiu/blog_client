import styled from 'styled-components';
import React from 'react';
const StyledContainer = styled.div`
    width: 40px;
    height: 40px;

    position: relative;
    margin: 100px auto;
    p {
        position: absolute;
        width: 250px;
        top: 50px;
        left: -90px;
    }
`;

const DB1 = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${(props) => props.theme.info};
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;

    @-webkit-keyframes sk-bounce {
        0%,
        100% {
            -webkit-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1);
        }
    }

    @keyframes sk-bounce {
        0%,
        100% {
            transform: scale(0);
            -webkit-transform: scale(0);
        }
        50% {
            transform: scale(1);
            -webkit-transform: scale(1);
        }
    }
`;

const DB2 = styled(DB1)`
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
`;

export const Spinner: React.FC = () => {
    return (
        <>
            <StyledContainer>
                <DB1 />
                <DB2 />
                <p>This may take a few seconds</p>
            </StyledContainer>
        </>
    );
};
