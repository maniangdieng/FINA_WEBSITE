import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { asset } from "../lib/asset";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location                = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") { window.location.href = `/#${id}`; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Backdrop — tap outside to close the mobile menu. Rendered outside
          <nav> so it isn't caught in the navbar's own backdrop-filter
          containing block (which would otherwise confine this fixed
          overlay to the navbar's own box instead of the full viewport). */}
      <div className={`mobile-menu-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-inner">

          {/* Logo — icône réelle + wordmark HTML, sur fond sombre */}
          <Link to="/" className="navbar-brand" aria-label="Finavators">
            <img src={asset("/logo-mark.png")} alt="" className="navbar-logo-mark" />
            <span className="navbar-logo-word">
              <span className="navbar-logo-word-fina">FINA</span>
              <span className="navbar-logo-word-vators">VATORS</span>
            </span>
          </Link>

          <div className="navbar-links">
            <button className="nav-link nav-btn" onClick={() => scrollTo("features")}>Fonctionnalités</button>
            <button className="nav-link nav-btn" onClick={() => scrollTo("sectors")}>Secteurs</button>
            <button className="nav-link nav-btn" onClick={() => scrollTo("pricing")}>Tarifs</button>
            <button className="nav-link nav-btn" onClick={() => scrollTo("testimonials")}>Avis</button>
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Contact</NavLink>
          </div>

          <div className="navbar-cta">
            <Link to="/contact" className="btn btn-primary" style={{ padding: "8px 20px", fontSize: ".85rem" }}>
              Demander une démo
            </Link>
          </div>

          <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span style={open ? { transform: "rotate(45deg) translateY(7px)" } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: "rotate(-45deg) translateY(-7px)" } : {}} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu${open ? " open" : ""}`}>
          <button className="mobile-nav-link nav-btn" onClick={() => scrollTo("features")}>Fonctionnalités</button>
          <button className="mobile-nav-link nav-btn" onClick={() => scrollTo("sectors")}>Secteurs</button>
          <button className="mobile-nav-link nav-btn" onClick={() => scrollTo("pricing")}>Tarifs</button>
          <button className="mobile-nav-link nav-btn" onClick={() => scrollTo("testimonials")}>Avis</button>
          <NavLink to="/contact" className="mobile-nav-link">Contact</NavLink>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: "8px", justifyContent: "center" }}>
            Demander une démo
          </Link>
        </div>
      </div>
      </nav>
    </>
  );
}
