import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-brand">Adam IT Corp</h1>
          <p className="hero-title">
            Enterprise software, Oracle applications, and consulting that move
            your business forward.
          </p>
          <p className="hero-lead">
            Practical IT delivery for manufacturing and service organizations
            since 2005.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Talk to us
            </a>
            <a href="#services" className="btn btn-ghost">
              View services
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-plane">
            <Image
              src="/images/hero-img.png"
              alt="Technology and enterprise systems illustration"
              width={560}
              height={420}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
