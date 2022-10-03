import { Section, SectionContent, SectionHeader } from '@components/styles';
import React, { useState } from 'react';
import styled from 'styled-components';

const AboutItem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const AboutTitle = styled.span`
    font-size: 30px;
    font-weight: 300;
    margin: 30px 0;

    :first-of-type {
        margin-top: 0;
    }
`;

const AboutDescription = styled.span`
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
`;

const About = () => {
    const [isOpen, setOpen] = useState(true);
    return (
        <Section>
            <SectionHeader onClick={() => setOpen(!isOpen)}>
                about
            </SectionHeader>
            <SectionContent open={isOpen} height={1500}>
                <AboutItem>
                    <AboutTitle>Languages</AboutTitle>
                    <AboutDescription>
                        Typescript, Javascript, Java, C++ & Kotlin
                    </AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Web</AboutTitle>
                    <AboutDescription>
                        Node, Express, Nest, Next, HTML, CSS, SCSS, React,
                        Styled Components, Angular, AngularJS, Redux, Elastic
                        UI, Webpack, and Bootstrap
                    </AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Databases</AboutTitle>
                    <AboutDescription>MongoDB and PostgresSQL</AboutDescription>
                </AboutItem>
                <AboutItem>
                    <AboutTitle>Other</AboutTitle>
                    <AboutDescription>
                        Figma, AdobeXD, Docker, Linux/Unix, Vercel, AWS, Git,
                        GitHub & GitHub Actions
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
