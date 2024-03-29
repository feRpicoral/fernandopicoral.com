import { Section, SectionContent, SectionHeader } from '@components/styles';
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    margin: 0 0 10px 0;
    font-weight: 300;
    font-size: 30px;

    @media only screen and (max-width: 600px) {
        font-size: 25px;
    }
`;

const TitleSubscript = styled.span`
    margin: 10px 0;
    font-size: 25px;
    display: inline-block;

    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const SubTitle = styled.h2`
    margin: 0 0 20px 0;
    font-weight: 100;
    font-size: 25px;

    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const Date = styled(SubTitle)`
    margin: 0 0 50px 0;
    font-size: 20px;

    @media only screen and (max-width: 600px) {
        font-size: 18px;
    }
`;

const Description = styled.div`
    font-weight: 100;
    font-size: 20px;

    @media only screen and (max-width: 600px) {
        font-size: 18px;
    }
`;

const List = styled.ul`
    text-align: left;

    li {
        &:not(:last-of-type) {
            margin-bottom: 20px;
        }
    }
`;

const Experience = () => (
    <Section>
        <SectionHeader>experience</SectionHeader>
        <SectionContent>
            <div>
                <Title>Brain, AI, and Child Laboratory</Title>
                <SubTitle>Research Assistant Intern</SubTitle>
                <Date>
                    {/* Some portions of the dates are wrapped in a span to avoid iPhones interpreting
                    them as phone numbers and underlining them*/}
                    <span>08</span>/2022 - Present
                </Date>
                <Description>
                    During the second week of classes at CU Boulder, my computer
                    science professor, Dr. Tom Yeh, invited me to join his
                    laboratory as a research assistant intern.
                    <br />
                    <br />
                    The BAIC lab has around ten research projects
                    simultaneously. I am involved with multiple projects; I have
                    highlighted the ones I am most involved with in the Projects
                    section.
                </Description>
            </div>

            <div>
                <Title>
                    Poatek IT Consulting
                    <br />
                    <TitleSubscript>A WillowTree Company</TitleSubscript>
                </Title>
                <SubTitle>Software Engineer</SubTitle>
                <Date>
                    <span>06</span>/2021 - 06/2022
                </Date>
                <Description>
                    Poatek, one of the WillowTree branches, is an IT boutique
                    based in Brazil, with high-end clients from around the
                    globe.
                    <br />
                    <br />
                    During the year I worked there, I mainly worked with an
                    asset management firm in Florida as a full-stack software
                    engineer. Among my accomplishments, a few that are worth
                    mentioning are:
                    <br />
                    <br />
                    <List>
                        <li>
                            Implemented a new dashboard used by the whole user
                            base daily;
                        </li>
                        <li>
                            Developed multiple high-performance endpoints in
                            NodeJS to handle both user transactions and internal
                            tools;
                        </li>
                        <li>
                            Created an AWS Lambda with Kotlin to parse and
                            evaluate XLSX files with custom wrote XIRR
                            calculations, using the XLSX itself as the CPU,
                            making complex estimated returns calculations
                            simple;
                        </li>
                        <li>
                            Wrote an utterly new signature flow using DocuSign
                            APIs, facilitating the signing and document fetching
                            process, making a week’s worth of work manual labor
                            automatic;
                        </li>
                        <li>
                            Developed multiple successful POCs using different
                            languages and frameworks, saving the team valuable
                            time when evaluating new ideas;
                        </li>
                    </List>
                </Description>
            </div>

            <div>
                <Title>Stockvio LLC</Title>
                <SubTitle>Founder & CEO</SubTitle>
                <Date>
                    <span>11</span>/2020 - 02/2022
                </Date>
                <Description>
                    Stockvio is a platform where users can automatically
                    calculate their taxes over capital gains in BOVESPA using
                    only their trading receipts.
                    <br />
                    <br />
                    When I started investing in the Brazilian stock market in
                    2020, I realized how complicated, tedious, and error-prone
                    the process of calculating taxes over capital gains was.
                    <br />
                    <br />
                    With this in mind, I designed software to automate the whole
                    process, only using the trading receipts provided by the
                    investor’s brokerage. A few of my responsibilities within
                    the company were:
                    <br />
                    <br />
                    <List>
                        <li>
                            Implemented the first version of the parsing and
                            calculation algorithm;
                        </li>
                        <li>Handled day-to-day operations & business logic;</li>
                        <li>
                            Assisted the coordination of the development team
                            with the CTO;
                        </li>
                        <li>
                            Developed the majority of the frontend with NextJS
                            and multiple endpoints using NestJS & PostgreSQL;
                        </li>
                    </List>
                </Description>
            </div>
        </SectionContent>
    </Section>
);

export default Experience;
