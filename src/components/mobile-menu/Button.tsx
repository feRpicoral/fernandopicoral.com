import { MobileMenuProps } from '@components/mobile-menu/Menu';
import MenuIcon from '@icons/menu.svg';
import React from 'react';
import styled from 'styled-components';

const MenuBtnWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 20px;
`;

const StyledIcon = styled(MenuIcon)`
    & g {
        fill: ${props => props.theme.colors.text};
    }
`;

const MobileMenuButton = ({ setOpen }: Pick<MobileMenuProps, 'setOpen'>) => (
    <MenuBtnWrap onClick={() => setOpen(value => !value)}>
        <StyledIcon />
    </MenuBtnWrap>
);

export default MobileMenuButton;
