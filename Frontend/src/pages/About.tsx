import { assetPath } from "@/utils/assetPath";

export default function About() {
    return (
        <div className="pt-32 lg:pt-[300px]">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 lg:items-stretch">
                <div className="w-full lg:w-2/5">
                    <img 
                        src={assetPath("/assets/LexieDownie.webp")}
                        alt="Lexie Downie" 
                        className="w-full aspect-square object-cover rounded-lg h-full"
                    />
                </div>
                <div className="w-full lg:w-3/5 flex flex-col justify-between text-foreground">
                    <h1 className="text-base font-bold tracking-wide mb-6">About Me</h1>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>Hi, I’m Lexie, a multimedia designer based in Sydney, Australia, passionate about creating visuals that move, inspire and connect. I work across graphic, motion and print projects, turning ideas into clean, engaging and memorable designs.</p>

                        <p>I hold a Bachelor of Graphic Design, a Motion Design certification from Shillington Education, and I’m currently studying UX/UI Design at TAFE NSW. This combination has given me a strong balance of creative thinking and technical skills.</p>
                        <p>Over the past few years, I’ve worked on branding, digital content, marketing materials and event collateral across a range of industries. I enjoy being involved in the full design process from early concept development through to final production, and collaborating with others to bring ideas to life.</p>
                        <p>I’m especially drawn to projects that blend storytelling and design, whether that’s building bold visual identities, creating motion graphics, or experimenting with new creative directions.</p>
                        <p>Outside of design, you’ll usually find me behind a camera, planning my next trip or diving into something creative just for fun!</p>
                    </div>
                </div>
            </div>
            {/* <ContactSection/> */}
        </div>
    )
}
