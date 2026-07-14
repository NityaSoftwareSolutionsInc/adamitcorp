export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          &copy; {year} Adam IT Corp. All rights reserved.
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
