import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import MerciPage from "./pages/MerciPage";
import NotFoundPage from "./pages/NotFoundPage";
import { MentionsLegalesPage, ConfidentialitePage, ConditionsPage } from "./pages/LegalPages";
import Seo from "./components/Seo";
import CookieBanner from "./components/CookieBanner";
import StickyCta from "./components/StickyCta";

const SECTION_IDS = ["features", "assistant", "sectors", "how", "pricing", "cta"];

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

// Une navigation interne doit repartir du haut de la nouvelle page.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollGuard />
      <Seo />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/equipe" element={<TeamPage />} />
          <Route path="/merci" element={<MerciPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/confidentialite" element={<ConfidentialitePage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </BrowserRouter>
  );
}
