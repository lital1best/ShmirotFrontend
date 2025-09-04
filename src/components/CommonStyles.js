import styled from "styled-components";

export const Screen = styled.div`
    min-height: 100%;
    display: grid;
    place-items: center;
    padding: 32px 16px;
`;
export const Card = styled.div`
    width: 100%;
    max-width: 440px;
    background: linear-gradient(180deg, rgba(17, 24, 17, 0.9), rgba(17, 24, 17, 0.85));
    border: 1px solid rgba(199, 211, 111, 0.25);
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    overflow: hidden;
    backdrop-filter: blur(6px);
`;
export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid rgba(199, 211, 111, 0.18);
    background: linear-gradient(180deg, rgba(199, 211, 111, 0.08), rgba(199, 211, 111, 0.02));
`;
export const Emblem = styled.img.attrs({
    src: '/army_logo.jpg',
    alt: 'Army Logo'
})`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
    border: 2px solid rgba(199, 211, 111, 0.25);
`;
export const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
export const Title = styled.h1`
    margin: 0;
    font-size: 20px;
    letter-spacing: 0.5px;
    color: #e9f0d8;
`;
export const Subtitle = styled.div`
    font-size: 12px;
    color: #b7c28c;
    opacity: 0.9;
`;
export const Form = styled.form`
    padding: 18px 20px 22px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
export const Label = styled.label`
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #c9d59b;
`;
export const InputWrap = styled.div`
    position: relative;
`;
export const Input = styled.input`
    width: 86%;
    padding: 12px 12px 12px 42px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(199, 211, 111, 0.25);
    color: #f2f4ef;
    outline: none;
    transition: 140ms ease;
    font-size: 14px;

    &:focus {
        border-color: rgba(199, 211, 111, 0.8);
        box-shadow: 0 0 0 3px rgba(199, 211, 111, 0.14);
        background: rgba(255, 255, 255, 0.06);
    }

    &::placeholder {
        color: rgba(240, 246, 220, 0.5);
    }
`;
export const Icon = styled.span`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #b7c28c;
    opacity: 0.9;
    font-size: 16px;
`;
export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    margin-top: 6px;
`;
export const Button = styled.button`
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid rgba(199, 211, 111, 0.35);
    background: linear-gradient(180deg, #3b5d3a, #2f4a2e);
    color: #f2f4ef;
    font-weight: 700;
    letter-spacing: 0.4px;
    min-width: 120px;
    transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const Link = styled.a`
    color: #c7d36f;
    text-decoration: none;
    margin-left: 8px;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;

export const LinkWrap = styled.div`
    text-align: center;
    padding: 16px;
    border-top: 1px solid rgba(199, 211, 111, 0.18);
`;

export const BeforeLinkText = styled.span`
    color: #dfe8c4;
    font-size: 14px;
`;