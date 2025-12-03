import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainHeader } from "./components/header.jsx";

import { HomePage } from './pages/home.jsx';
import { ProjectsPage } from './pages/projects.jsx';
import { ContactPage } from './pages/contact.jsx';
import { AboutPage } from './pages/about.jsx';
import { ComingSoon } from "./pages/coming-soon.jsx";
import './App.css';

function App() {

  return (
    <>
      <Router>
        <MainHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/portfolio' element={<ProjectsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/coming-soon' element={<ComingSoon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
