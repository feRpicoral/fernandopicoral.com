import { Header, Section } from '@components/styles';
import React from 'react';
import styled from 'styled-components';

const Project = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 650px;
    font-family: ${props => props.theme.fontFamilies.roboto};
`;

const ProjectTitle = styled.a`
    font-size: 30px;
    font-weight: 300;
    margin: 30px 0;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    :hover {
        color: inherit;
        text-decoration: underline;
    }
`;

const ProjectDescription = styled.p`
    font-size: 20px;
    line-height: 30px;
    font-weight: 100;
    margin: 0;
`;

const Projects = () => (
    <Section>
        <Header>projects</Header>
        <Project>
            <ProjectTitle
                href="https://github.com/feRpicoral/stockvio"
                target="_blank"
            >
                Stockvio
            </ProjectTitle>
            <ProjectDescription>
                A platform designed to keep track of investments in the
                brazilian stock market. Built with React + Redux and Typescript,
                allows the investor to have the info related to all his equities
                in on place
            </ProjectDescription>
        </Project>
        <Project>
            <ProjectTitle
                href="https://github.com/open-collaboration"
                target="_blank"
            >
                OpenCollab
            </ProjectTitle>
            <ProjectDescription>
                A hub to connect people willing to contribute to open source
                projects with authors looking for help. Designed with NextJS
                with Typescript for the frontend and GO for the backend
            </ProjectDescription>
        </Project>
        <Project>
            <ProjectTitle
                href="https://github.com/feRpicoral/fernandopicoral.com"
                target="_blank"
            >
                fernandopicoral.com
            </ProjectTitle>
            <ProjectDescription>
                This website. Previously built with vanilla JS & CSS with a
                litte help from Bootsrap, was recently refactored to NextJS with
                React and deployed with Vercel
            </ProjectDescription>
        </Project>
    </Section>
);

export default Projects;
