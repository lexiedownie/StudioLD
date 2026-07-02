import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { load as parseYaml } from "js-yaml";
import projectsYaml from "../projects.yaml?raw";
import { assetPath } from '@/utils/assetPath';

const projects = parseYaml(projectsYaml) as { slug: string; title: string; type: string; listingcardasset?: string }[];

export default function Home() {
    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="pt-32 lg:pt-0 flex flex-col items-center">
            <div className="relative w-full flex flex-col items-center min-h-[300px] lg:min-h-[500px]">
                <video autoPlay loop muted playsInline className="w-full rounded-lg">
                    <source src={assetPath('/assets/Home/HeroVideoMobile.mp4')} media="(max-width: 1023px)" />
                    <source src={assetPath('/assets/Home/STUDIOLD.mp4')} />
                </video>
                <button onClick={scrollToProjects} className="cursor-pointer hidden lg:block bg-transparent absolute bottom-16 left-1/2 -translate-x-1/2">
                    <ChevronDown className="w-12 h-12 bg-transparent" style={{ animation: 'bounce-once 1.5s ease-in-out 1' }} />
                </button>
            </div>
            <div id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-16 lg:mt-48 scroll-mt-[160px]">
                {projects.map((project) => (
                    <Link
                        to={`/project/${project.slug}`}
                        key={project.slug}
                        className="relative aspect-[16/9] rounded-lg overflow-hidden group"
                    >
                        <video
                            src={assetPath(project.listingcardasset ?? '/assets/placeholder.webp')}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-white text-xl font-bold">{project.title}</h2>
                                <p className="text-white/70 text-sm mt-1">{project.type}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {/* <ContactSection/> */}
        </section>
    );
}
