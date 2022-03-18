import About from '@components/About';
import Contact from '@components/Contact';
import Home from '@components/Home';
import Menu from '@components/Menu';
import Navbar from '@components/Navbar';
import Projects from '@components/Projects';
import { PageProps } from '@pages/_app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0 auto;
    min-width: 100%;
    min-height: 100%;
    text-align: center;
    color: ${props => props.theme.colors.text};
    padding: 0 15px;
`;

/**
 * Scroll to the nth section on the DOM where `sectionIndex` is n
 * @param sectionIndex Index of the section to be scrolled to
 */
const scrollToSection = (sectionIndex: number) => {
    let offset = 0;
    if (sectionIndex > 0) {
        const section = document.getElementsByTagName('section')[sectionIndex];
        offset =
            section?.offsetTop -
            (document.querySelector('nav')?.offsetHeight || 0); // Navbar compensation
    }
    window.scrollTo({
        behavior: 'smooth',
        top: offset
    });
};

const Index = ({ setTheme }: PageProps) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [isMenuOpen]);

    // Scroll based on the query
    useEffect(() => {
        if (slug.length === 1) {
            switch (slug[0]) {
                case 'home':
                    scrollToSection(0);
                    break;
                case 'projects':
                    scrollToSection(1);
                    break;
                case 'about':
                    scrollToSection(2);
                    break;
                case 'contact':
                    scrollToSection(3);
                    break;
                default:
                    void router.push('/', undefined, { shallow: true });
            }
        } else if (slug.length > 1) {
            // When the path matches /x/y/z and so on, redirect to /
            void router.push('/', undefined, { shallow: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <>
            <Head>
                <title>Fernando Picoral</title>
            </Head>
            <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} />
            <Navbar
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
                setTheme={setTheme}
            />
            <Container>
                <Home />
                <Projects />
                <About />
                <Contact />
            </Container>
        </>
    );
};

export default Index;
