import { Link } from 'react-router-dom'
import { assetPath } from '@/utils/assetPath';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-16 py-10 bg-background">
            <div className="relative flex items-center justify-between py-4">
                <Link to="/about" className="text-sm tracking-wider hover:opacity-70 transition-opacity">
                    About
                </Link>
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-70 transition-opacity shrink-0">
                    <img
                        src={assetPath("/assets/StudioLD.webp")}
                        alt="Lexie Downie" 
                        className="h-18 object-contain dark:invert"
                    />
                </Link>
                <a 
                    href="https://www.linkedin.com/in/lexie-downie-61468a257/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm tracking-wider hover:opacity-70 transition-opacity font-bold"
                >
                    in
                </a>
            </div>
        </nav>
    )
}
