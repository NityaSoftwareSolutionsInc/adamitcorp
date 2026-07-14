"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);

      const pos = window.scrollY + 140;
      let current = "";
      for (const item of NAV) {
        const el = document.querySelector(item.href);
        if (!(el instanceof HTMLElement)) continue;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          current = item.href;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash: string) => {
    const el = document.querySelector(hash);
    if (!(el instanceof HTMLElement)) return;
    const header = document.querySelector(".site-header");
    const offset = header instanceof HTMLElement ? header.offsetHeight : 72;
    window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`site-header${solid ? " is-solid" : ""}`}>
      <div className="header-inner">
        <a
          href="#hero"
          className="brand-link"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(false);
          }}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={140}
            height={36}
            priority
          />
          {solid ? <span className="brand-name">Adam IT Corp</span> : null}
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
        </button>

        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.href}
              type="button"
              className={`nav-link${active === item.href ? " is-active" : ""}`}
              onClick={() => go(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
