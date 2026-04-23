'use client';

import React from "react";
import { NavLink, SocialLink, FooterProps } from "../app/types/footer";

// Default navigation links for the footer
const DEFAULT_NAV_LINKS: NavLink[] = [
    { id: '1', label: 'Home',       href: '#' },
    { id: '2', label: 'About',      href: '#' },
    { id: '3', label: 'Projects',   href: '#' },
    { id: '4', label: 'Contact',    href: '#' },
];

// Default social links
const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { id: '1', label: 'GitHub',     href: 'https://github.com' },
    { id: '2', label: 'LinkedIn',   href: 'https://linkedin.com' },
];

export default function Footer({
    navLinks =      DEFAULT_NAV_LINKS,
    socialLinks =   DEFAULT_SOCIAL_LINKS,
    copyrightYear = '2021 - 2026',
    showLogo =      true,
}: FooterProps) {
    return (
        <footer className="w-full bg-black text-foreground py-12 px-4">
            { /* Container for max-width and centered content */ }
            <div className="max-w-4xl mx-auto flex flex-col gap-8">

                { /* Section #1: Top decoration (line + diamond) */ }
                <TopDecoration />

                { /* Section #2: Navigation links */ }
                <NavSection navLinks={navLinks} showLogo={showLogo} />

                { /* Section #3: Divider line */ }
                <div className="w-full h-px border-1 border-foreground opacity-50"></div>

                { /* Section #4: Social links and icons */ }
                <SocialSection socialLinks={socialLinks} />

                { /* Section #5: Copyright notice */ }
                <CopyrightSection copyrightYear={copyrightYear} />
            </div>
        </footer>
    )
}

/**
 * Section #1: Top decoration (line + diamond)
 */
function TopDecoration() {
    return (
        <div className="flex items-center justify-center gap-1">
            { /* Line on left side of diamond */ }
            <div className="flex-1 h-px border-2 border-foreground opacity-40"></div>

            { /* Diamond shape */ }
            <div className="w-8 h-8 border-2 border-foreground transform rotate-45 opacity-60"></div>

            { /* Line on right side of diamond */ }
            <div className="flex-1 h-px border-2 border-foreground opacity-40"></div>
        </div>
    );
}

/**
 * Section #2: Navigation links and logo
 */
interface NavSectionProps {
    navLinks: NavLink[];
    showLogo: boolean;
}

function NavSection({ navLinks, showLogo }: NavSectionProps) {
    return (
        <nav className="flex items-center justify-center gap-8 flex-wrap">
            { navLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                    { /* Logo conditionally rendered, after 2nd link */ }
                    {showLogo && index === 2 && (
                        <span className="font-bold text-xl text-foreground">LOGO?</span>
                    )}

                    <a
                        href={link.href}
                        className="text-foreground hover:opacity-70 transition-opacity text-sm font-medium"
                    >{link.label}
                    </a>
                </React.Fragment>
            ))}
        </nav>
    );
}

/**
 * Section #4: Social section, with social media circular icons
 */
interface SocialSectionProps {
    socialLinks: SocialLink[];
}

function SocialSection({ socialLinks }: SocialSectionProps) {
    return (
        <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
                <a
                    key={social.id}
                    href={social.href}
                    title={social.label}
                    className="inline-flex items-center justify-center w-10 h-10 border-2 border-foreground rounded-full 
                               hover:bg-foreground hover:text-black transition-colors"
                >
                    { /* Icon would go here, placeholder for now :D */ }
                    <span className="text-xs font-semibold">{social.label.charAt(0)}</span>
                </a>
            ))}
        </div>
    );
}

/**
 * Section #5: Copyright section, text and legal links
 */
interface CopyrightSectionProps {
    copyrightYear: string;
}

function CopyrightSection({ copyrightYear }: CopyrightSectionProps) {
    return (
        <p className="text-center text-xs text-foreground opacity-70">
            © {copyrightYear}
            {' '}
            <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy
            </a>
            {' '}-{' '}
            <a href="#" className="hover:opacity-100 transition-opacity">
                Terms
            </a>
        </p>
    );
}

