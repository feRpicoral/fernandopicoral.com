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
    &:not(:first-of-type) {
        margin-top: 30px;
    }
`;

const ContactTitle = styled.span`
    font-size: 30px;
    font-weight: 300;
    margin-bottom: 30px;
    display: inline-block;
`;

const ContactLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
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
                <ContactItem>
                    <ContactTitle>Resume</ContactTitle>
                    <ContactLink href="/Resume.pdf" target="_blank">
                        Fernando Picoral&rsquo;s CV
                    </ContactLink>
                </ContactItem>
            </SectionContent>
        </ContactSection>
    );
};

export default Contact;
