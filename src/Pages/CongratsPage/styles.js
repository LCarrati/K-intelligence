import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    max-width: 320px;
    margin: auto;
    text-align: justify;
    font-family: system-ui;

    & p {
        margin: 5px 0;    
    }
`