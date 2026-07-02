import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { load as parseYaml } from "js-yaml";
import { useState } from "react";
import projectsYaml from "../projects.yaml?raw";
import { assetPath } from '@/utils/assetPath';
import ScrollToTopButton from '../components/ScrollToTopButton'

type ImageSize = "large" | "normal" | "tall" | "extra_tall" | "thin" | "wide" | "half_wide" | "extra_wide" | "full_wide";

interface ProjectImage {
    src: string;
    size: ImageSize;
}

const MediaRenderer = ({ src, className, alt }: { src: string; className?: string; alt: string }) => {
    const [loaded, setLoaded] = useState(false);

    if (src.endsWith(".mp4")) {
        return (
            <video
                src={assetPath(src)}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setLoaded(true)}
                className={`${className} ${loaded ? '' : 'hidden'}`}
            />
        );
    }
    return (
        <>
            {!loaded && <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`} />}
            <img
                src={assetPath(src)}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`${className} ${loaded ? '' : 'hidden'}`}
            />
        </>
    );
};

interface Project {
    slug: string;
    title: string;
    description: string;
    type: string;
    listingimage: string;
    images: ProjectImage[];
}

const projectsData = parseYaml(projectsYaml) as Project[];

const sizeClasses10: Record<ImageSize | "default", string> = {
    default: "col-span-4 row-span-2",
    large: "col-span-8 row-span-4 aspect-square",
    normal: "col-span-4 row-span-2",
    tall: "col-span-4 row-span-4",
    extra_tall: "col-span-4 row-span-6",
    thin: "col-span-3 row-span-2",
    wide: "col-span-6 row-span-2",
    half_wide: "col-span-5 row-span-2",
    extra_wide: "col-span-7 row-span-2",
    full_wide: "col-span-10 row-span-2",
};

export default function ProjectPage() {
    const { slug } = useParams();
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="pt-[300px]">
                <Link to="/" className="inline-flex items-center gap-2 text-foreground mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                </Link>
                <h1 className="text-2xl font-bold">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="pt-32 lg:pt-[300px]">
            <ScrollToTopButton />
                <Link to="/" className="inline-flex items-center gap-2 text-foreground mb-8">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </Link>
            <div className="mb-12">
                <h1 className="text-base font-bold mb-2">{project.title}</h1>
                <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="hidden lg:block">
                <div className="grid grid-cols-10 gap-8 auto-rows-[250px]">
                    {project.images.map((image, index) => (
                        <MediaRenderer
                            key={index}
                            src={image.src}
                            alt={`${project.title} - Image ${index + 1}`}
                            className={`w-full h-full object-cover rounded-lg ${sizeClasses10[image.size] || sizeClasses10.default}`}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-8 lg:hidden">
                {project.images.map((image, index) => (
                    <MediaRenderer
                        key={index}
                        src={image.src}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full rounded-lg"
                    />
                ))}
            </div>
            {/* <ContactSection/> */}
        </div>
    );
}