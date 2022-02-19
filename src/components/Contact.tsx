import { Section, SectionContent, SectionHeader } from '@components/styles';
import EmailIcon from '@icons/email.svg';
import LinkedinIcon from '@icons/linkedin.svg';
import UrlIcon from '@icons/url.svg';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const ContactSection = styled(Section)`
    padding-bottom: 10vh;
`;

const ContactItem = styled.div`
    margin-top: 30px;
    font-family: ${props => props.theme.fontFamilies.roboto};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 650px;
`;

const ContactTitle = styled.span`
    font-size: 30px;
    font-weight: 300;
    margin: 30px 0;
`;

const ContactLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const svgCss = css`
    /* stylelint-disable-next-line */
    & {
        margin: 2px 0 0 8px;
        fill: ${props => props.theme.colors.text};
        width: 20px;
    }
`;

const StyledURLIcon = styled(UrlIcon)`
    ${svgCss};
    /* stylelint-disable-next-line */
    & {
        opacity: ${props => (props.theme.isDarkMode ? 1 : 0.65)};
    }
`;

const StyledEmailIcon = styled(EmailIcon)`
    ${svgCss};
`;

const StyledLinkedinIcon = styled(LinkedinIcon)`
    ${svgCss};
`;

const Contact = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <ContactSection>
            <SectionHeader onClick={() => setOpen(!isOpen)}>
                contact
            </SectionHeader>
            <SectionContent open={isOpen}>
                <ContactItem>
                    <ContactTitle>Email</ContactTitle>
                    <ContactLink
                        href="mailto:fernando.picoral@colorado.edu"
                        target="_blank"
                    >
                        fernando.picoral@colorado.edu <StyledEmailIcon />
                    </ContactLink>
                </ContactItem>
                <ContactItem>
                    <ContactTitle>Linkedin</ContactTitle>
                    <ContactLink
                        href="https://www.linkedin.com/in/picoral/"
                        target="_blank"
                    >
                        @picoral <StyledLinkedinIcon />
                    </ContactLink>
                </ContactItem>
                <ContactItem>
                    <ContactTitle>GitHub</ContactTitle>
                    <ContactLink
                        href="https://github.com/feRpicoral/"
                        target="_blank"
                    >
                        feRpicoral <StyledURLIcon />{' '}
                    </ContactLink>
                </ContactItem>
            </SectionContent>
        </ContactSection>
    );
};

export default Contact;
