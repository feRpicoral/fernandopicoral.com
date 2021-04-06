import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Menu, { MenuButton } from '@components/menu';

const Container = styled.div`
    margin: 0 auto;
    padding: 80px 125px;
    min-width: 100%;
    min-height: 100%;
    text-align: center;
    color: ${props => props.theme.colors.text};
`;

const Section = styled.section`
    min-height: 80vh;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20vh;
`;

const MoveUpDown = keyframes`
  0%, 100% { 
    bottom: 0;
  }
  50% {
    bottom: 15px;
  }
`;

const ScrollDownWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    animation: ${MoveUpDown} 1.8s linear infinite;
`;

const ScrollDown = styled.span`
    font-family: ${props => props.theme.fontFamilies.roboto};
    font-weight: 100;
    font-size: 25px;
    line-height: 24px;
    margin: 0 0 10px 0;
`;

const TitleWrap = styled.div`
    margin-top: 125px;
`;

const Title = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 120px;
    line-height: 125px;
    margin: 0;
`;

const Header = styled(Title)`
    font-size: 80px;
    margin-bottom: 55px;
`;

const Subtitle = styled.h2`
    font-family: ${props => props.theme.fontFamilies.roboto};
    font-weight: 100;
    font-size: 30px;
    line-height: 35px;
    margin: 15px 0 0 0;
`;

const OverflowClasses = createGlobalStyle`
    .overflow-h {
      overflow: hidden !important;
    }
`;

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

const ContactSection = styled(Section)`
    margin-bottom: 0;
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

const Home = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-h');
        } else {
            document.body.classList.remove('overflow-h');
        }
    }, [isMenuOpen]);

    return (
        <>
            <OverflowClasses />
            <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} />
            <Container>
                <MenuButton onClick={() => setMenuOpen(!isMenuOpen)} />
                <Section>
                    <TitleWrap>
                        <Title>picoral</Title>
                        <Subtitle>i enjoy building things</Subtitle>
                    </TitleWrap>
                    <ScrollDownWrap>
                        <ScrollDown>scroll down</ScrollDown>
                        <img src="icons/arrow.svg" alt="Scroll Down" />
                    </ScrollDownWrap>
                </Section>
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
                            A platform designed to keep track of investments in
                            the brazilian stock market. Built with React + Redux
                            and Typescript, allows the investor to have the info
                            related to all his equities in on place
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
                            A hub to connect people willing to contribute to
                            open source projects with authors looking for help.
                            Designed with NextJS with Typescript for the
                            frontend and GO for the backend
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
                            This website. Previously built with vanilla JS & CSS
                            with a litte help from Bootsrap, was recently
                            refactored to NextJS with React and deployed with
                            Vercel
                        </ProjectDescription>
                    </Project>
                </Section>
                <Section>
                    <Header>about</Header>
                    <AboutItem>
                        <AboutTitle>Languages</AboutTitle>
                        <AboutDescription>
                            Javascript, Typescript and Java
                        </AboutDescription>
                    </AboutItem>
                    <AboutItem>
                        <AboutTitle>Web</AboutTitle>
                        <AboutDescription>
                            HTML, CSS, React, Redux, Next, Node, Bootstrap,
                            jQuery and Styled Components
                        </AboutDescription>
                    </AboutItem>
                    <AboutItem>
                        <AboutTitle>Databases</AboutTitle>
                        <AboutDescription>
                            MongoDB and PostgresSQL
                        </AboutDescription>
                    </AboutItem>
                    <AboutItem>
                        <AboutTitle>Other</AboutTitle>
                        <AboutDescription>
                            Figma, AdobeXD, Git, GitHub & GitHub Actions
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
                </Section>
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
                        <ContactLink
                            href="https://github.com/feRpicoral/"
                            target="_blank"
                        >
                            feRpicoral
                        </ContactLink>
                    </ContactItem>
                </ContactSection>
            </Container>
        </>
    );
};

export default Home;
