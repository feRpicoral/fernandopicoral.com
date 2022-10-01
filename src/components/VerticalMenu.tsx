import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    text-align: left;
    margin-left: 30px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    top: 30%;
    z-index: 1;

    &:before {
        content: '';
        height: 90%;
        width: 1px;
        position: absolute;
        left: 0;
        top: 5%;
        background-color: ${props => props.theme.colors.text};
    }
`;

const MenuButton = styled.a<{ selected?: boolean }>`
    font-family: ${props => props.theme.fontFamilies.roboto};
    font-weight: 100;
    text-decoration: ${props => (props.selected ? 'underline' : 'none')};
    font-size: 25px;
    line-height: 24px;
    margin-left: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform-origin: left;

    &:hover {
        transform: scale(1.05);
        text-decoration: underline;
    }
`;

export enum Sections {
    HOME = 'home',
    EXPERIENCE = 'experience',
    PROJECTS = 'projects',
    ABOUT = 'about',
    CONTACT = 'contact'
}

const VerticalMenu = () => {
    const router = useRouter();

    const sectionNames = Object.keys(Sections).map(name => name.toLowerCase());

    return (
        <Wrapper>
            {sectionNames.map(name => (
                <MenuButton
                    key={name}
                    onClick={() =>
                        router.push(name, undefined, { shallow: true })
                    }
                >
                    {name}
                </MenuButton>
            ))}
        </Wrapper>
    );
};

export default VerticalMenu;
