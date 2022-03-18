import { Section, SectionContent, SectionHeader } from '@components/styles';
import React, { useState } from 'react';
import styled from 'styled-components';

const AboutItem = styled.div`
    margin-top: 30px;
    font-family: ${props => props.theme.fontFamilies.roboto};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 650px;
`;

const AboutTitle = styled.span`
    font-size: 30px;
    font-weight: 300;
    margin: 30px 0;
`;

const AboutDescription = styled.span`
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
`;

const About = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <Section>
            <SectionHeader onClick={() => setOpen(!isOpen)}>
                about
            </SectionHeader>
            <SectionContent open={isOpen}>
                <AboutItem>
                    <AboutTitle>Languages</AboutTitle>
                    <AboutDescription>
                        Javascript, Typescript and Java
                    </AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Web</AboutTitle>
                    <AboutDescription>
                        Node, Express, Nest, HTML, CSS, React, Styled
                        Components, Angular, AngularJS, Next, Redux, and
                        Bootstrap
                    </AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Databases</AboutTitle>
                    <AboutDescription>MongoDB and PostgresSQL</AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Other</AboutTitle>
                    <AboutDescription>
                        Figma, AdobeXD, Linux, Vercel, AWS, Git, GitHub & GitHub
                        Actions
                    </AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Education</AboutTitle>
                    <AboutDescription>
                        University of Colorado - Boulder (Class 2026)
                        <br />
                        Computer Science, BS
                    </AboutDescription>
                </AboutItem>
            </SectionContent>
        </Section>
    );
};

export default About;
