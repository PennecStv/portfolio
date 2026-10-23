"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ContactSocial, FieldLabelProps, KnobPosition } from "@/app/types/contact";
import { useI18n } from "@/app/i18n";

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

/**
 * A field label component, using the FieldLabelProps interface.
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

const CONTACT_SOCIALS: ContactSocial[] = [
  { label: "GitHub", href: "https://github.com", openInNewTab: true },
  { label: "LinkedIn", href: "https://linkedin.com", openInNewTab: true },
  { label: "Mail", href: "myMail@domain.com", openInNewTab: false },
];

const MAX_OFFSET = 33;
const DEAD_ZONE = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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

interface SocialWaveformProps {
  position: KnobPosition;
  selectedIndex: number;
}

function SocialWaveform({ position, selectedIndex }: SocialWaveformProps) {
  const selectedSocial = CONTACT_SOCIALS[selectedIndex];
  const [animationTime, setAnimationTime] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState<"copied" | "failed" | null>(null);
  const copyFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let animationFrame = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      setAnimationTime((time - startTime) / 1000);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

   function showCopyFeedback(feedback: "copied" | "failed") {
    if (copyFeedbackTimerRef.current) {
      clearTimeout(copyFeedbackTimerRef.current);
    }

    setCopyFeedback(feedback);
    copyFeedbackTimerRef.current = setTimeout(() => {
      setCopyFeedback(null);
      copyFeedbackTimerRef.current = null;
    }, 2500);
  }

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!selectedSocial.openInNewTab) {
      event.preventDefault();

      if (!navigator.clipboard) {
        showCopyFeedback("failed");
        return;
      }

      navigator.clipboard.writeText(selectedSocial.href)
        .then(() => showCopyFeedback("copied"))
        .catch(() => showCopyFeedback("failed"));
    }
  };

  const path = useMemo(() => {
    const width = 800;
    const centerY = 60;
    const pointCount = 80;
    const distance = Math.hypot(position.x, position.y);
    const angle = distance === 0
      ? 0
      : clamp(Math.atan2(position.x, -position.y), -((2 * Math.PI) / 3), (2 * Math.PI) / 3);
    const dragAmount = clamp(Math.hypot(position.x, position.y) / MAX_OFFSET, 0, 1);
    const amplitude = 8 + dragAmount * (10 + Math.abs(Math.sin(angle)) * 12);
    const cycles = 1.5 + ((angle + (2 * Math.PI) / 3) / (4 * Math.PI / 3)) * 2;
    const animatedPhase = angle + animationTime * 1.5;

    return Array.from({ length: pointCount }, (_, index) => {
      const x = (index / (pointCount - 1)) * width;
      const y = centerY + Math.sin((index / (pointCount - 1)) * cycles * 2 * Math.PI + animatedPhase) * amplitude;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(" ");
  }, [animationTime, position]);

  return (
    <div
      className="flex-col min-h-40 min-w-0 flex-1 items-center rounded-xl border-2 border-foreground/50 px-4 py-3"
      aria-label="Social selection waveform"
    >
      <span className="flex items-center justify-center text-sm font-medium text-foreground" aria-live="polite">
        &gt;

          <a
            href={selectedSocial.href}
            target={selectedSocial.openInNewTab ? "_blank" : undefined}
            rel={selectedSocial.openInNewTab ? "noreferrer" : undefined}
            onClick={handleLinkClick}
            className="px-2 text-2xl text-center items-center text-secondary font-semibold italic"
          >
            { selectedSocial.label }
          </a> 
        &lt;
      </span>

      <svg
        className="h-full min-h-20 w-full overflow-visible text-secondary"
        viewBox="0 0 800 80"
        role="img"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

export function SocialRotaryButton() {
  const { t } = useI18n();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState(() => offsetForAngle(-120));
  const [copyFeedback, setCopyFeedback] = useState<"copied" | "failed" | null>(null);
  const draggingRef = useRef(false);
  const copyFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maximumIndex = CONTACT_SOCIALS.length - 1;
  const selectedSocial = CONTACT_SOCIALS[selectedIndex];

  useEffect(() => {
    return () => {
      if (copyFeedbackTimerRef.current) {
        clearTimeout(copyFeedbackTimerRef.current);
      }
    };
  }, []);

  function selectIndex(index: number) {
    const nextIndex = clamp(index, 0, maximumIndex);

    setSelectedIndex(nextIndex);
    setPosition(offsetForAngle(angleForIndex(nextIndex, maximumIndex)));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    updatePointerPosition(event);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) {
      return;
    }

    updatePointerPosition(event);
  }

  function updatePointerPosition(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    // Cursor offset from the center (both circles have the same center)
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);

    const distance = Math.hypot(dx, dy);
    const scale = distance > MAX_OFFSET ? MAX_OFFSET / distance : 1;

    setPosition({ x: dx * scale, y: dy * scale });

    // Dead zone: keep previous selection while in the center
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
    draggingRef.current = false;
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
  /* I define here the actionto do if openInNewTab is true or false; 
   * if true it opens the link in a new tab, 
   * if false it copies the link to clipboard
   */
  function showCopyFeedback(feedback: "copied" | "failed") {
    if (copyFeedbackTimerRef.current) {
      clearTimeout(copyFeedbackTimerRef.current);
    }

    setCopyFeedback(feedback);
    copyFeedbackTimerRef.current = setTimeout(() => {
      setCopyFeedback(null);
      copyFeedbackTimerRef.current = null;
    }, 2500);
  }

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!selectedSocial.openInNewTab) {
      event.preventDefault();

      if (!navigator.clipboard) {
        showCopyFeedback("failed");
        return;
      }

      navigator.clipboard.writeText(selectedSocial.href)
        .then(() => showCopyFeedback("copied"))
        .catch(() => showCopyFeedback("failed"));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div>
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

        {/* If link openInNewTab is true, opens the link when clicked.
        If false, copies the link to clipboard */}
        
        <div className="flex items-center justify-center gap-2 py-2">
          <a
            href={selectedSocial.href}
            target={selectedSocial.openInNewTab ? "_blank" : undefined}
            rel={selectedSocial.openInNewTab ? "noreferrer" : undefined}
            onClick={handleLinkClick}
            className="text-sm text-secondary underline-offset-4 transition-opacity hover:opacity-70 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            { selectedSocial.openInNewTab ? t.contact.openProfileLink : t.contact.copyProfileLink }
          </a>
          {copyFeedback && (
            <span
              className="text-sm text-foreground"
              role="status"
              aria-live="polite"
            >
              {copyFeedback === "copied" ? t.contact.copiedProfileLink : t.contact.copyProfileLinkFailed}
            </span>
          )}
        </div>
        
      </div>

      <SocialWaveform
        position={position}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}