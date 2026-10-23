import React from "react";

/**
 * Interface for form labels
 */
export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    children: React.ReactNode;
    className?: string;
    required?: boolean;
};

/** 
 * Interface for contact social links, used in the rotary button component
 */
export interface ContactSocial {
    label: string;
    href: string;
    openInNewTab: boolean;
};

/**
 * Interface for the knob position
 */
export interface KnobPosition {
    x: number;
    y: number;
};
