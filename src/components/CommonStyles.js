import styled from "styled-components";

export const DialogWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const Card = styled.div`
    width: 100%;
    max-width: 440px;
    background: linear-gradient(180deg, var(--black-80), var(--black-60));
    border: 1px solid var(--accent);
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
    border-bottom: 1px solid var(--accent);
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
    border: 2px solid var(--accent);
`;
export const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
export const Title = styled.h1`
    margin: 0;
    font-size: 24px;
    letter-spacing: 0.5px;
    color: var(--accent-2);
`;
export const Subtitle = styled.div`
    margin: 0;
    color: var(--sand);
    opacity: 0.85;
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
    color: var(--accent);
`;
export const InputWrap = styled.div`
    position: relative;
`;
export const Input = styled.input`
    width: 86%;
    padding: 12px 12px 12px 42px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--accent);
    color: var(--accent-2);
    outline: none;
    transition: 140ms ease;
    font-size: 14px;

    &:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent);
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
    appearance: none;
    border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--army-green-dark)')};
    background: ${({ $active }) => ($active ? 'var(--army-green-dark)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'var(--accent-2)' : 'var(--sand)')};
    padding: 10px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 0.2px;
    transition: all 0.15s ease;
    outline: none;

    &:hover {
        background: var(--army-green-dark);
        border-color: var(--olive);
        color: var(--accent-2);
    }

    &:focus-visible {
        box-shadow: 0 0 0 3px rgba(199, 211, 111, 0.35);
    }
`;


export const Link = styled.a`
    color: var(--accent);
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
    border-top: 1px solid var(--accent);
`;

export const BeforeLinkText = styled.span`
    color: var(--accent-2);
    font-size: 14px;
`;