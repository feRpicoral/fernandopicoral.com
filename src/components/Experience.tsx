import { Section, SectionContent, SectionHeader } from '@components/styles';
import React, { useState } from 'react';
import styled from 'styled-components';

const ExperienceSection = styled(SectionContent)`
    max-height: ${props => (props.open ? '3000px' : 0)};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    :not(:last-of-type) {
        margin-bottom: 60px !important;
    }
`;

const Title = styled.h1`
    margin: 0 0 10px 0;
    font-weight: 300;
    font-size: 30px;
`;

const TitleSubscript = styled.span`
    margin: 10px 0;
    font-size: 25px;
    display: inline-block;
`;

const SubTitle = styled.h2`
    margin: 0 0 20px 0;
    font-weight: 100;
    font-size: 25px;
`;

const Date = styled(SubTitle)`
    margin: 0 0 50px 0;
    font-size: 20px;
`;

const Description = styled.div`
    font-weight: 100;
    font-size: 20px;
`;

const List = styled.ul`
    max-width: 500px;
    margin: 0 auto;
    text-align: left;

    li {
        &:not(:last-of-type) {
            margin-bottom: 20px;
        }
    }
`;

const Experience = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Section>
            <SectionHeader onClick={() => setOpen(!isOpen)}>
                experience
            </SectionHeader>
            <ExperienceSection open={isOpen}>
                <Wrapper>
                    <Title>Brain, AI, and Child Laboratory</Title>
                    <SubTitle>Research Assistant Intern</SubTitle>
                    <Date>08/2022 - Present</Date>
                    <Description>
                        During the second week of classes at CU Boulder I was
                        invited by my computer science professor, Dr. Tom Yeh,
                        to join his laboratory as research assistant intern.
                        <br />
                        <br />
                        The BAIC lab has around ten research projects
                        simultaneously. I am involved with multiple projects; I
                        have highlighted the ones I am most involved with in the
                        Projects section.
                    </Description>
                </Wrapper>

                <Wrapper>
                    <Title>
                        Poatek IT Consulting
                        <br />
                        <TitleSubscript>A WillowTree Company</TitleSubscript>
                    </Title>
                    <SubTitle>Software Engineer</SubTitle>
                    <Date>06/2021 - 06/2022</Date>
                    <Description>
                        Poatek, one of the WillowTree branches, is an IT
                        boutique based in Brazil, with high-end clients from all
                        around the globe.
                        <br />
                        <br />
                        During the year I worked there, I mostly worked with an
                        asset management firm from Florida as a full stack
                        software engineer. Among my accomplishments, a few that
                        are worth mentioning are:
                        <br />
                        <br />
                        <List>
                            <li>
                                Implemented a new dashboard used by the whole
                                user-base in a daily basis;
                            </li>
                            <li>
                                Developed multiple high-performance endpoints in
                                NodeJS to handle both user transactions and
                                internal tools;
                            </li>
                            <li>
                                Created an AWS Lambda with Kotlin to parse and
                                evaluate XLSX files with custom wrote XIRR
                                calculations, using the XLSX itself as the CPU,
                                making complex estimated returns calculations
                                simple;
                            </li>
                            <li>
                                Wrote an utterly new signature flow using
                                DocuSign APIs, facilitating the signing and
                                document fetching process, making a week’s worth
                                of work manual labor automatic;
                            </li>
                            <li>
                                Developed multiple successful POCs using
                                different languages and frameworks, saving the
                                team valuable time when evaluating new ideas;
                            </li>
                        </List>
                    </Description>
                </Wrapper>

                <Wrapper>
                    <Title>Stockvio LLC</Title>
                    <SubTitle>Founder & CEO</SubTitle>
                    <Date>11/2020 - 02/2022</Date>
                    <Description>
                        Stockvio is a platform where users can automatically
                        calculate their taxes over capital gains in BOVESPA
                        using only their trading receipts.
                        <br />
                        <br />
                        When I started investing in the Brazilian stock market
                        back in 2020, I realized how complicated, tedious, and
                        error-prone the process to calculate taxes over capital
                        gains was.
                        <br />
                        <br />
                        With this in mind, I designed a software to automate the
                        whole process, only using the trading receipts provided
                        by the investor&rsquo;s brokerage. A few of my
                        responsibilities within the company were:
                        <br />
                        <br />
                        <List>
                            <li>
                                Implemented the first version of the parsing and
                                calculation algorithm;
                            </li>
                            <li>
                                Handled day-to-day operations & business logic;
                            </li>
                            <li>
                                Assisted the coordination of the development
                                team with the CTO;
                            </li>
                            <li>
                                Developed the majority of the frontend with
                                NextJS and multiple endpoints using NestJS &
                                PostgreSQL;
                            </li>
                        </List>
                    </Description>
                </Wrapper>
            </ExperienceSection>
        </Section>
    );
};

export default Experience;
