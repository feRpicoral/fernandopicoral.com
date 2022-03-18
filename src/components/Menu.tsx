import MenuIcon from '@icons/menu.svg';
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
    margin-top: -5px; /* Fix gap between nav and menu */
`;

const MenuBtnWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const MenuBtn = styled.span`
    font-family: ${props => props.theme.fontFamilies.roboto};
    font-weight: 300;
    font-size: 25px;
    line-height: 24px;
    margin-left: 5px;
    margin-bottom: 2px;
`;

const MenuItem = styled(MenuBtn)`
    font-size: 35px;
    margin-bottom: 50px;
    color: ${props => props.theme.colors.text};
    opacity: 0.5;
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
    margin-top: 200px;
`;

const StyledIcon = styled(MenuIcon)`
    & g {
        fill: ${props => props.theme.colors.text};
    }
`;

interface MenuButtonProps {
    /**
     * Click handler for the button
     * @param e Click event
     */
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const MenuButton = (props: MenuButtonProps) => (
    <MenuBtnWrap onClick={props.onClick}>
        {/* <img src="icons/menu.svg" alt="Menu" />*/}
        <StyledIcon />
        <MenuBtn>menu</MenuBtn>
    </MenuBtnWrap>
);

export interface MenuProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ isOpen, setOpen }: MenuProps) => {
    const router = useRouter();

    const handleClick = (url: string) => {
        setOpen(!isOpen);
        // Change the URL without reloading/re-rendering the page
        void router.push(url, undefined, { shallow: true });
    };

    return (
        <MenuContainer open={isOpen}>
            <MenuItemWrap>
                <MenuItem onClick={() => handleClick('/home')}>home</MenuItem>
                <MenuItem onClick={() => handleClick('/projects')}>
                    projects
                </MenuItem>
                <MenuItem onClick={() => handleClick('/about')}>about</MenuItem>
                <MenuItem onClick={() => handleClick('/contact')}>
                    contact
                </MenuItem>
            </MenuItemWrap>
        </MenuContainer>
    );
};

export default Menu;
