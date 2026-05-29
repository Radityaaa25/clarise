"use client";
import { ArrowRight } from "lucide-react";

export function ArrowButton({
  children,
  onClick,
  href,
  className = "",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}) {
  const Tag = (href ? "a" : "button") as React.ElementType;
  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`ab ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {/* Arrow ada PERTAMA dan di-absolute ke tengah button */}
      <span className="ab-arrow" aria-hidden="true">
        <ArrowRight size={14} strokeWidth={2.5} />
      </span>
      {/* Teks di atas arrow, terbelah saat hover */}
      <span className="ab-top" aria-hidden="true">
        {children}
      </span>
      <span className="ab-bot" aria-hidden="true">
        {children}
      </span>
      {/* Hidden text for sizing the button properly */}
      <span className="opacity-0 invisible whitespace-nowrap">{children}</span>
    </Tag>
  );
}
