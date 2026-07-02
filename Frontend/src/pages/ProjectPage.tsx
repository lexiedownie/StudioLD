import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { load as parseYaml } from "js-yaml";
import { useState } from "react";
import projectsYaml from "../projects.yaml?raw";
import { assetPath } from '@/utils/assetPath';
import ScrollToTopButton from '../components/ScrollToTopButton'

/* -----------------------------
   Types
------------------------------ */
type ImageSize =
    "large" |
    "normal" |
    "tall" |
    "extra_tall" |
    "thin" |
    "wide" |
    "half_wide" |
    "extra_wide" |
    "full_wide";

interface ProjectImage {
    src: string;
    size: ImageSize;
}

interface Project {
    slug: string;
    title: string;
    description: string;
    type: string;
    listingimage: string;
    images: ProjectImage[];
}

/* -----------------------------
   Responsive image helper
------------------------------ */
function getImageSources(src: string) {
    const base = src.substring(0, src.lastIndexOf("."));

    const build = (size: number) =>
        assetPath(`${base}-${size}.webp`);

    return {
        src: build(800),
        srcSet: [
            `${build(400)} 400w`,
            `${build(800)} 800w`,
            `${build(1600)} 1600w`,
            `${build(2400)} 2400w`,
        ].join(", "),
    };
}

/* -----------------------------
   Layout-aware sizes
------------------------------ */
const sizeToViewport: Record<ImageSize, string> = {
    large: "80vw",
    normal: "45vw",
    tall: "45vw",
    extra_tall: "45vw",
    thin: "30vw",
    wide: "60vw",
    half_wide: "50vw",
    extra_wide: "70vw",
    full_wide: "100vw",
};

/* -----------------------------
   Grid layout classes
------------------------------ */
const sizeClasses10: Record<ImageSize, string> = {
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

/* -----------------------------
   Media Renderer
------------------------------ */
const MediaRenderer = ({
    src,
    className,
    alt,
    size
}: {
    src: string;
    className?: string;
    alt: string;
    size?: ImageSize;
}) => {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);
    const effectiveSize: ImageSize = size ?? "normal";

    if (src.endsWith(".mp4")) {
        return (
            <div className={`relative ${className}`}>
                {!loaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                )}
                <video
                    src={assetPath(src)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setLoaded(true)}
                    className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        );
    }

    const image = getImageSources(src);
    // fallback chain: try the resized 800, then the smallest guaranteed size, then the original file
    const fallbackSrc = errored ? assetPath(src) : image.src;

    return (
        <div className={`relative ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            <img
                src={fallbackSrc}
                srcSet={errored ? undefined : image.srcSet}
                sizes={errored ? undefined : sizeToViewport[effectiveSize]}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => {
                    if (!errored) {
                        setErrored(true); // fall back to the original, full-res image
                    } else {
                        setLoaded(true); // stop showing skeleton even if that also fails
                    }
                }}
                className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

/* -----------------------------
   Data
------------------------------ */
const projectsData = parseYaml(projectsYaml) as Project[];

/* -----------------------------
   Page
------------------------------ */
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

            {/* DESKTOP GRID */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-10 gap-8 auto-rows-[250px]">
                    {project.images.map((image, index) => (
                        <MediaRenderer
                            key={index}
                            src={image.src}
                            alt={`${project.title} - Image ${index + 1}`}
                            size={image.size}
                            className={sizeClasses10[image.size]}   // just grid placement now
                        />
                    ))}
                </div>
            </div>

            {/* MOBILE STACK */}
            <div className="flex flex-col gap-8 lg:hidden">
                {project.images.map((image, index) => (
                    <MediaRenderer
                        key={index}
                        src={image.src}
                        alt={`${project.title} - Image ${index + 1}`}
                        size={image.size}
                        className="w-full rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
}