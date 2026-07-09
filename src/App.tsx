import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalAnimatedBg from "./components/GlobalAnimatedBg";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import MessagesPage from "./pages/MessagesPage";
import TeamPage from "./pages/TeamPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
