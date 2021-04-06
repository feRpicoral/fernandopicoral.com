import React from 'react';
import styled from 'styled-components';
import { Header, Section } from '@components/styles';

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
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const Contact = () => (
    <ContactSection>
        <Header>contact</Header>
        <ContactItem>
            <ContactTitle>Email</ContactTitle>
            <ContactLink
                href="mailto:fernando.picoral@colorado.edu"
                target="_blank"
            >
                fernando.picoral@colorado.edu
            </ContactLink>
        </ContactItem>
        <ContactItem>
            <ContactTitle>Linkedin</ContactTitle>
            <ContactLink
                href="https://www.linkedin.com/in/picoral/"
                target="_blank"
            >
                @picoral
            </ContactLink>
        </ContactItem>
        <ContactItem>
            <ContactTitle>GitHub</ContactTitle>
            <ContactLink href="https://github.com/feRpicoral/" target="_blank">
                feRpicoral
            </ContactLink>
        </ContactItem>
    </ContactSection>
);

export default Contact;
