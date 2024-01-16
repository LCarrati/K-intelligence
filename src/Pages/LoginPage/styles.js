import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & span {
        color: #3951b2;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
            color: #3951b2c9;
        }
    }

`

export const Title = styled.h1`
    font-size: 32px;
    font-family: cursive;
`