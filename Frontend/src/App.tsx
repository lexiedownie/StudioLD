import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
// import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import About from './pages/About'
import ProjectPage from './pages/ProjectPage'

export default function App()
{
    return (
        <>
            <ScrollToTop />
            <Navbar />
            {/* <ThemeToggle /> */}
            <main className="min-h-screen pb-32 px-6 xl:max-w-[1700px] xl:mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/project/:slug" element={<ProjectPage />} />
                </Routes>
            </main>
        </>
    )
}