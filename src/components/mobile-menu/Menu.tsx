import useSwipe, { SwipeDirection } from '@hooks/swipe.hook';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div<{ open: boolean }>`
    position: fixed;
    height: 100%;
    width: 100%;
    opacity: ${props => (props.open ? 1 : 0)};
    right: ${props => (props.open ? '0' : '-100vw')};
    transition: all 0.5s;
    z-index: 1000;
    background-color: ${props => props.theme.colors.background};
    margin-top: -35px; /* Fix gap between nav and menu */
`;

const MenuItem = styled.span`
    line-height: 24px;
    margin-left: 5px;
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 50px;
    font-family: ${props => props.theme.fontFamilies.roboto};
    color: ${props => props.theme.colors.text};
    opacity: 0.8;
    cursor: pointer;

    :hover {
        opacity: 1;
    }
`;

const MenuItemWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30%;
`;

export interface MobileMenuProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setOpen }: MobileMenuProps) => {
    const router = useRouter();
    const swipe = useSwipe();

    if (
        isOpen &&
        swipe.direction === SwipeDirection.RIGHT &&
        swipe.end - swipe.start >= 250
    ) {
        setOpen(false);
    }

    const handleClick = (section: string) => {
        setOpen(!isOpen);
        void router.push(`/${section}`, undefined, { shallow: true });
    };

    return (
        <MenuContainer open={isOpen}>
            <MenuItemWrap>
                <MenuItem onClick={() => handleClick('home')}>home</MenuItem>
                <MenuItem onClick={() => handleClick('experience')}>
                    experience
                </MenuItem>
                <MenuItem onClick={() => handleClick('projects')}>
                    projects
                </MenuItem>
                <MenuItem onClick={() => handleClick('about')}>about</MenuItem>
                <MenuItem onClick={() => handleClick('contact')}>
                    contact
                </MenuItem>
            </MenuItemWrap>
        </MenuContainer>
    );
};

export default MobileMenu;
