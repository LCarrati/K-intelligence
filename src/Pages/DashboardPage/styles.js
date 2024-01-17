import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Avatar = styled.img`
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 5px solid white;
    height: 120px;
    width: 120px;
    margin-top: -20px;
    margin-left: -65px;
`

export const Top = styled.div`
    background-color: #3498db;
    position: relative;
    height: 95px;
    width: 100%;
`

export const Middle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    margin-bottom: 40px;

    & h1{
        margin: 80px auto 0;
        text-transform: uppercase;
        font-family: system-ui;
        font-size: x-large;
    }

    & p {
        margin: 0 auto 10px;
        max-width: 320px;
        text-align: left;
        font-family: system-ui;
    }

    & a {
        all: unset;
        max-width: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-decoration: underline;
        color: #0664a2;
        font-weight: bold;
        text-wrap: nowrap;
        font-size: 14px;
        &:hover {
            color: #3498db;
        }
    }

    & textarea {
        margin-bottom: 20px;
    }

    & input {
        color: black;
        font-family: monospace;
        opacity: 1;

        &:disabled{
            background-color: #fafafa;
            color: #545454;
        }
    }
`