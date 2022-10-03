import { Section, SectionContent, SectionHeader } from '@components/styles';
import EmailIcon from '@icons/email.svg';
import LinkedinIcon from '@icons/linkedin.svg';
import UrlIcon from '@icons/url.svg';
import React from 'react';
import styled, { css } from 'styled-components';

const ContactTitle = styled.span`
    font-size: 30px;
    font-weight: 300;
    margin-bottom: 30px;
    display: inline-block;

    @media only screen and (max-width: 600px) {
        font-size: 25px;
        margin-bottom: 15px;
    }
`;

const ContactLink = styled.a`
    display: flex;
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }

    @media only screen and (max-width: 600px) {
        font-size: 20px;
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

const Contact = () => (
    <Section>
        <SectionHeader>contact</SectionHeader>
        <SectionContent>
            <div>
                <ContactTitle>Email</ContactTitle>
                <ContactLink
                    href="mailto:fernando.picoral@colorado.edu"
                    target="_blank"
                >
                    fernando.picoral@colorado.edu <StyledEmailIcon />
                </ContactLink>
            </div>
            <div>
                <ContactTitle>Linkedin</ContactTitle>
                <ContactLink
                    href="https://www.linkedin.com/in/picoral/"
                    target="_blank"
                >
                    @picoral <StyledLinkedinIcon />
                </ContactLink>
            </div>
            <div>
                <ContactTitle>GitHub</ContactTitle>
                <ContactLink
                    href="https://github.com/feRpicoral/"
                    target="_blank"
                >
                    feRpicoral <StyledURLIcon />{' '}
                </ContactLink>
            </div>
            <div>
                <ContactTitle>Resume</ContactTitle>
                <ContactLink href="/static/files/Resume.pdf" target="_blank">
                    Fernando Picoral&rsquo;s CV
                </ContactLink>
            </div>
        </SectionContent>
    </Section>
);

export default Contact;
