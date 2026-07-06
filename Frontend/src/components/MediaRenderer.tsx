import { useState } from "react";
import { assetPath } from '@/utils/assetPath';
import { X } from "lucide-react";

export type ImageSize =
    "large" |
    "normal" |
    "tall" |
    "extra_tall" |
    "thin" |
    "wide" |
    "half_wide" |
    "extra_wide" |
    "full_wide";

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

export function getFullQualitySrc(src: string): string {
    if (src.endsWith(".mp4")) return assetPath(src);
    const base = src.substring(0, src.lastIndexOf("."));
    return assetPath(`${base}-2400.webp`);
}

export default function MediaRenderer({
    src,
    className,
    alt,
    size,
}: {
    src: string;
    className?: string;
    alt: string;
    size?: ImageSize;
}) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [fullscreenFallback, setFullscreenFallback] = useState(false);
    const effectiveSize: ImageSize = size ?? "normal";

    const overlay = (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => {
                setFullscreen(false);
                setFullscreenFallback(false);
            }}
        >
            <button
                onClick={() => {
                    setFullscreen(false);
                    setFullscreenFallback(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 text-white cursor-pointer bg-black/40 flex items-center justify-center rounded-lg"
            >
                <X className="w-7 h-7"/>
            </button>
            {src.endsWith(".mp4") ? (
                <video
                    src={assetPath(src)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-w-full max-h-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                <img
                    src={fullscreenFallback ? assetPath(src) : getFullQualitySrc(src)}
                    alt={alt}
                    className="max-w-full max-h-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                    onError={() => setFullscreenFallback(true)}
                />
            )}
        </div>
    );

    if (src.endsWith(".mp4")) {
        return (
            <>
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
                        onClick={() => setFullscreen(true)}
                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 cursor-pointer ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
                {fullscreen && overlay}
            </>
        );
    }

    const image = getImageSources(src);
    const fallbackSrc = errored ? assetPath(src) : image.src;

    return (
        <>
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
                    onClick={() => setFullscreen(true)}
                    onError={() => {
                        if (!errored) {
                            setErrored(true);
                        } else {
                            setLoaded(true);
                        }
                    }}
                    className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 cursor-pointer ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
            {fullscreen && overlay}
        </>
    );
}
