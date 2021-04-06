import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menu from '@components/Menu';
import Navbar from '@components/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Contact from '@components/Contact';
import About from '@components/About';
import Projects from '@components/Projects';
import Home from '@components/Home';

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

const Index = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];

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
                    router.push('/', undefined, { shallow: true });
            }
        } else if (slug.length > 1) {
            // When the path matches /x/y/z and so on, redirect to /
            router.push('/', undefined, { shallow: true });
        }
    }, [slug]);

    return (
        <>
            <Head>
                <title>Picoral</title>
            </Head>
            <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} />
            <Navbar isOpen={isMenuOpen} setOpen={setMenuOpen} />
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
