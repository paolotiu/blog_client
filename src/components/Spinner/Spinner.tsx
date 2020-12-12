import styled from 'styled-components';
import React from 'react';
const StyledContainer = styled.div<{ marginTop?: string }>`
    width: 40px;
    height: 40px;

    position: relative;
    margin: ${(props) => (props.marginTop ? props.marginTop : '100px')} auto;
    p {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0.8em);
        white-space: nowrap;
    }
`;

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vw;
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
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
interface Props {
    message?: string;
    isModal?: boolean;
    isOpen?: boolean;
    marginTop?: string;
}

export const Spinner: React.FC<Props> = ({
    message = 'This may take a few seonds',
    isModal = false,
    isOpen = true,
    marginTop = '100px',
}) => {
    return (
        <>
            {isOpen ? (
                <>
                    {isModal ? (
                        <StyledModal>
                            <StyledContainer marginTop={marginTop}>
                                <DB1 />
                                <DB2 />
                                <p>{message}</p>
                            </StyledContainer>
                        </StyledModal>
                    ) : (
                        <StyledContainer>
                            <DB1 />
                            <DB2 />
                            <p>{message}</p>
                        </StyledContainer>
                    )}
                </>
            ) : (
                ''
            )}
        </>
    );
};
