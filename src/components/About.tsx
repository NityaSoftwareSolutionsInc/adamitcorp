"use client";

import Reveal from "./Reveal";

const PRODUCTS = [
  { label: "vioTalk", href: "https://www.viotalk.com" },
  { label: "Jobs & Profiles", href: "https://www.jobsnprofiles.com" },
  { label: "Online Mirror", href: "https://www.online-mirror.com" },
  { label: "Rewahr HRMS", href: "https://www.rewahr.com" },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-layout">
        <Reveal className="about-meta">
          <p className="eyebrow">About</p>
          <h2>Built for durable enterprise outcomes</h2>
          <div className="about-stats">
            <div className="about-stat">
              <strong>2005</strong>
              <span>Established in Utah</span>
            </div>
            <div className="about-stat">
              <strong>ERP & Oracle</strong>
              <span>Full-lifecycle implementation focus</span>
            </div>
            <div className="about-stat">
              <strong>Multi-channel</strong>
              <span>Web, desktop, and mobile delivery</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={80}>
          <p>
            Adam IT Corp is a Utah corporation engaged in AdamIT-innovated,
            real-time web products—including video email, chat, conference,
            consultation, and broadcasting—alongside software development and
            consulting for manufacturing and service industries.
          </p>
          <p>
            We specialize in Oracle Applications ERP implementations and in
            building reliable web, desktop, and mobile systems that support
            day-to-day operations.
          </p>
          <div className="about-products">
            {PRODUCTS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
