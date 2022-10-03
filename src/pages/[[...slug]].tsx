import About from '@components/About';
import Contact from '@components/Contact';
import Experience from '@components/Experience';
import Home from '@components/Home';
import MobileMenu from '@components/mobile-menu/Menu';
import Navbar from '@components/Navbar';
import Projects from '@components/Projects';
import VerticalMenu, { Sections } from '@components/VerticalMenu';
import useWidth from '@hooks/width.hook';
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
    const router = useRouter();
    const width = useWidth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                case Sections.HOME:
                    scrollToSection(0);
                    void router.push('/', undefined, { shallow: true });
                    break;
                case Sections.EXPERIENCE:
                    scrollToSection(1);
                    break;
                case Sections.PROJECTS:
                    scrollToSection(2);
                    break;
                case Sections.ABOUT:
                    scrollToSection(3);
                    break;
                case Sections.CONTACT:
                    scrollToSection(4);
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
            <Navbar setTheme={setTheme} setMenuOpen={setIsMenuOpen} />
            <MobileMenu isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
            {width >= 1020 && <VerticalMenu />}
            <Container>
                <Home />
                <Experience />
                <Projects />
                <About />
                <Contact />
            </Container>
        </>
    );
};

export default Index;
