/** 
    Interface for a navigation link in the footer
*/
export interface NavLink {
    id: string;
    label: string;
    href: string;
}

/** 
    Interface for the footer component (if we decide to put some in the small circles)
*/
export interface SocialLink {
    id: string;
    label: string;
    href: string;
    icon?: string; // SVG path or icon name
}

export interface FooterProps {
    navLinks?: NavLink[];
    socialLinks?: SocialLink[];
    copyrightYear?: string;
    showLogo?: boolean;
}