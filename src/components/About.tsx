import { Section, SectionContent, SectionHeader } from '@components/styles';
import React from 'react';
import styled from 'styled-components';

const AboutTitle = styled.span`
    display: block;
    font-size: 30px;
    font-weight: 300;
    margin: 30px 0;

    :first-of-type {
        margin-top: 0;
    }
`;

const AboutDescription = styled.span`
    display: block;
    font-size: 24px;
    line-height: 32px;
    font-weight: 100;
`;

const About = () => (
    <Section>
        <SectionHeader>about</SectionHeader>
        <SectionContent>
            <div>
                <AboutTitle>Languages</AboutTitle>
                <AboutDescription>
                    Typescript, Javascript, Java, C++ & Kotlin
                </AboutDescription>
            </div>
            <div>
                <AboutTitle>Web</AboutTitle>
                <AboutDescription>
                    Node, Express, Nest, Next, HTML, CSS, SCSS, React, Styled
                    Components, Angular, AngularJS, Redux, Elastic UI, Webpack,
                    and Bootstrap
                </AboutDescription>
            </div>
            <div>
                <AboutTitle>Databases</AboutTitle>
                <AboutDescription>MongoDB and PostgresSQL</AboutDescription>
            </div>
            <div>
                <AboutTitle>Other</AboutTitle>
                <AboutDescription>
                    Figma, AdobeXD, Docker, Linux/Unix, Vercel, AWS, Git, GitHub
                    & GitHub Actions
                </AboutDescription>
            </div>
            <div>
                <AboutTitle>Education</AboutTitle>
                <AboutDescription>
                    University of Colorado - Boulder (Class 2026)
                    <br />
                    Computer Science, BS
                </AboutDescription>
            </div>
        </SectionContent>
    </Section>
);

export default About;
