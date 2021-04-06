import styled from 'styled-components';
import React from 'react';

const MenuContainer = styled.div<{ open: boolean }>`
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: ${props => (props.open ? 1 : 0)};
    right: ${props => (props.open ? '0' : '-100vw')};
    transition: all 0.5s;
    z-index: 1000;
    background-color: white;
`;

const MenuBtnWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 10000;
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
    margin-top: 20%;
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
        <img src="icons/menu.svg" alt="Menu" />
        <MenuBtn>menu</MenuBtn>
    </MenuBtnWrap>
);

export interface MenuProps {
    /**
     * Whether or not the menu is currently open
     */
    isOpen: boolean;

    /**
     * Function to change the state of the menu when the user clicks on one of the items
     */
    setOpen: (state: boolean) => void;
}

const Menu = ({ isOpen, setOpen }: MenuProps) => {
    const handleClick = (sectionIndex: number) => {
        setOpen(!isOpen);
        let offset = 0;
        if (sectionIndex > 0) {
            const section = document.getElementsByTagName('section')[
                sectionIndex
            ];
            offset = section?.offsetTop - 98; // Navbar compensation
        }
        window.scrollTo({
            behavior: 'smooth',
            top: offset
        });
    };

    return (
        <MenuContainer open={isOpen}>
            <MenuItemWrap>
                <MenuItem onClick={() => handleClick(0)}>home</MenuItem>
                <MenuItem onClick={() => handleClick(1)}>projects</MenuItem>
                <MenuItem onClick={() => handleClick(2)}>about</MenuItem>
                <MenuItem onClick={() => handleClick(3)}>contact</MenuItem>
            </MenuItemWrap>
        </MenuContainer>
    );
};

export default Menu;
