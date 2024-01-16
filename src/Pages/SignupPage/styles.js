import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;

    & span {
        color: #3951b2;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
            color: #3951b2c9;
        }
    }

    & h1 {
        max-width: 320px;
        margin: 10px 0 0;
    }

    & p {
        margin-top: 0
    }
`