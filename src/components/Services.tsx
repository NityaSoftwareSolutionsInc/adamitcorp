"use client";

import Reveal from "./Reveal";

const SERVICES = [
  {
    index: "01",
    title: "Software Development",
    description:
      "ERP design and development for small, mid-market, and large organizations across IT, non-IT, and manufacturing industries.",
  },
  {
    index: "02",
    title: "Oracle Application Practice",
    description:
      "Functional and technical expertise across full-lifecycle implementations, upgrades, and production support for Oracle Applications.",
  },
  {
    index: "03",
    title: "Software Consulting",
    description:
      "Advisory that helps enterprises modernize processes and become more agile, transparent, and customer-centric.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Services</p>
          <h2>What we deliver</h2>
          <p>
            Focused capabilities for organizations that need dependable systems
            and experienced Oracle practice support.
          </p>
        </Reveal>

        <div className="services-list">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <article className="service-item">
                <div className="service-index">{service.index}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
