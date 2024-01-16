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
    background-color: #eaeaea;

    & h1 {
        margin: 80px auto 0;
        text-transform: uppercase;
        font-family: system-ui;
    }

    & p {
        margin: 0 auto 20px;
        max-width: 320px;
        text-align: left;
        font-family: system-ui;
    }

    & a {
        all: unset;
        width: 90%;
        max-width: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`

export const Links = styled.div`
    width: 100%;
    max-width: 320px;
    height: 40px;
    border: 2px solid #3498db;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    &:hover {
        background-color: cornflowerblue;
        border-color: white;
        color: white;
    }
`