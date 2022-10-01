import { Section, SectionContent, SectionHeader } from '@components/styles';
import GithubIcon from '@icons/github.svg';
import React, { useState } from 'react';
import styled from 'styled-components';

const ProjectTitle = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 300;
    margin: 50px 0;
    text-decoration: none;

    :first-of-type {
        margin-top: 0;
    }

    :hover {
        ${props =>
            props.href &&
            `
            color: inherit;
            text-decoration: underline;
        `}
    }
`;

const ProjectDescription = styled.p`
    font-size: 20px;
    line-height: 30px;
    font-weight: 100;
    margin: 0;
`;

const StyledGithub = styled(GithubIcon)`
    & {
        margin: 2px 0 0 10px;
        fill: ${props => props.theme.colors.text};
    }
`;

const Projects = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <Section>
            <SectionHeader onClick={() => setOpen(!isOpen)}>
                projects
            </SectionHeader>
            <SectionContent open={isOpen} height={2000}>
                <div>
                    <ProjectTitle>AR & The Future of Work</ProjectTitle>
                    <ProjectDescription>
                        This is one of the projects from the BAIC laboratory
                        that I am involved with. The study consists of providing
                        the participant with blueprints of a simple plumbing and
                        electric diagram and AR glasses, on which the
                        participant can see where each pipe/electrical component
                        should be installed.
                        <br />
                        <br />
                        The study&rsquo;s goal is to compare the performance of
                        construction workers when provided with AR glasses
                        instead of only blueprints. Among the variables are the
                        years of experience in the field of the participant and
                        whether they have previous experience with AR.
                        <br />
                        <br />
                        In this project, I am responsible for developing and
                        maintaining the software that the researchers use to see
                        in real-time what the participant can see through the AR
                        glasses.
                    </ProjectDescription>
                </div>
                <div>
                    <ProjectTitle>AI Stories</ProjectTitle>
                    <ProjectDescription>
                        In partnership with researchers from Brazil and Mexico,
                        this project from Dr. Yeh&rsquo;s laboratory aims to
                        spread AI knowledge through developing communities.
                        <br />
                        <br />
                        We use AI-related stories written by high school &
                        undergraduate students from those communities to study
                        their awareness and understanding of AI and its societal
                        impacts. The goal is to help them develop their
                        knowledge about this technology they interact with
                        daily.
                    </ProjectDescription>
                </div>
                <div>
                    <ProjectTitle
                        href="https://github.com/open-collaboration"
                        target="_blank"
                    >
                        OpenCollab <StyledGithub />
                    </ProjectTitle>
                    <ProjectDescription>
                        Developed with React and NextJS for the frontend and GO
                        for the backend, OpenCollab is a hub where open-source
                        project authors can connect with people willing to
                        contribute. A colleague and I developed it in the span
                        of a few weeks, in which I was mainly responsible for
                        the frontend.
                    </ProjectDescription>
                </div>
            </SectionContent>
        </Section>
    );
};

export default Projects;
