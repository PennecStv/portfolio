"use client";

import { useRef, useState } from "react";

/**
 * Returns the default style for a form input.
 * @param px The horizontal padding.
 * @param py The vertical padding.
 * @param other Any additional classes to include.
 * @returns The default style string.
 */
export const DefaultStyle = ({ px, py, other }: { px?: string; py?: string; other?: string }) => {
    return `min-h-12 border-2 border-foreground bg-transparent px-${px ?? '4'} py-${py ?? '3'} text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary rounded-full ${other ?? ''}`;
};

/**
 * A divider component.
 * @param size The size of the divider.
 * @returns The divider component.
 */
export const Divider = ({ size }: {size: string}) => {
    return (
        <hr
            className={`border-t border-gray-300 my-4 mx-auto ${size}`}
        ></hr>
    );
};

type FieldLabelProps = {
    label: string;
    children: React.ReactNode;
    className?: string;
    required?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;
/**
 * A field label component, using the FieldLabelProps type.
 * @param label The label text.
 * @param required Whether the field is required.
 * @param children The child elements.
 * @param className The class name.
 * @param props The remaining props.
 * @returns The field label component.
 */
export function FieldLabel({ 
  label, 
  required = false,
  children, 
  className, 
  ...props 
}: FieldLabelProps) {
  return (
    <label 
      className={`flex flex-col gap-2 text-lg font-medium ${className ?? ''}`} 
      {...props}
    >
      <span>
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

/**
 * A social rotary button component for selecting a social media link.
 * @returns The social rotary button component.
 */
type ContactSocial = {
  label: string;
  href: string;
};

const CONTACT_SOCIALS: ContactSocial[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type KnobPosition = {
  x: number;
  y: number;
};

const MAX_OFFSET = 33;
const DEAD_ZONE = 8;

function angleForIndex(index: number, maximumIndex: number) {
  return maximumIndex === 0
    ? 0
    : -120 + (index / maximumIndex) * 240;
}

function offsetForAngle(angle: number): KnobPosition {
  const radians = (angle * Math.PI) / 180;

  return {
    x: Math.sin(radians) * MAX_OFFSET,
    y: -Math.cos(radians) * MAX_OFFSET,
  };
}

export function SocialRotaryButton() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState(() => offsetForAngle(-120));
  const isDragging = useRef(false);
  const maximumIndex = CONTACT_SOCIALS.length - 1;
  const selectedSocial = CONTACT_SOCIALS[selectedIndex];

  function selectIndex(index: number) {
    const nextIndex = clamp(index, 0, maximumIndex);

    setSelectedIndex(nextIndex);
    setPosition(offsetForAngle(angleForIndex(nextIndex, maximumIndex)));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    isDragging.current = true;
    updatePointerPosition(event);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) {
      return;
    }

    updatePointerPosition(event);
  }

  function updatePointerPosition(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    // Décalage du pointeur par rapport au centre (les deux cercles ont le même centre)
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);

    const distance = Math.hypot(dx, dy);
    const scale = distance > MAX_OFFSET ? MAX_OFFSET / distance : 1;

    setPosition({ x: dx * scale, y: dy * scale });

    // Zone morte : on garde la sélection précédente tant qu'on est au centre
    if (distance < DEAD_ZONE) {
      return;
    }

    const pointerAngle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const clampedAngle = clamp(pointerAngle, -120, 120);
    const nextIndex = Math.round(((clampedAngle + 120) / 240) * maximumIndex);

    setSelectedIndex(nextIndex);
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      selectIndex(selectedIndex + 1);
    }

    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectIndex(selectedIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectIndex(maximumIndex);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="slider"
        tabIndex={0}
        aria-label="Choisir un réseau social"
        aria-valuemin={0}
        aria-valuemax={maximumIndex}
        aria-valuenow={selectedIndex}
        aria-valuetext={selectedSocial.label}
        className="relative flex h-32 w-32 touch-none select-none items-center justify-center rounded-full border-2 border-foreground/50 bg-background outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-secondary cursor-grab active:cursor-grabbing"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        { /* middle circle */}
        <div className="absolute inset-2 rounded-full border border-foreground/30">
          <span 
            className="absolute flex left-1/2 top-1/2 h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-background text-xl font-semibold text-foreground"
            style={{ 
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)`
            }}
          >
            {selectedSocial.label.charAt(0)}
          </span>
        </div>
        
      </div>

      <p className="text-center text-lg font-medium text-foreground" aria-live="polite">
        {selectedSocial.label}
      </p>

      <a
        href={selectedSocial.href}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-secondary underline-offset-4 transition-opacity hover:opacity-70 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
      >
        Ouvrir le profil
      </a>
    </div>
  );
}