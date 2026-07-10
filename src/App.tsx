import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalAnimatedBg from "./components/GlobalAnimatedBg";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import MessagesPage from "./pages/MessagesPage";
import TeamPage from "./pages/TeamPage";

const SECTION_IDS = ["features", "modules", "sectors", "how", "pricing", "testimonials", "cta"];

// Google search results sometimes link to a text passage found anywhere on
// the page (e.g. the footer's boilerplate paragraph, repeated on every
// route) via a #:~:text=... fragment, and the browser auto-scrolls there on
// load. We only want that auto-scroll for our own known section anchors, so
// force the page back to the top for anything else.
function ScrollGuard() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (SECTION_IDS.includes(id)) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    } else if (window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
}

// The static index.html always ships a canonical tag pointing at the home
// page (there's no per-route HTML to hardcode a different one into). Point
// it at whatever route actually loaded, so /contact and /equipe don't read
// to Google as duplicates of the home page.
function CanonicalTag() {
  const location = useLocation();
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = `https://www.finavators.com${location.pathname}`;
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollGuard />
      <CanonicalTag />
      <GlobalAnimatedBg />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/equipe" element={<TeamPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
