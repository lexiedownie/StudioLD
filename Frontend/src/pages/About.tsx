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
                        <p>Hi, I'm Lexie, a multimedia designer based in Sydney, Australia passionate about creating visuals that move, inspire and connect. I work across graphic, motion and print projects turning ideas into clean, engaging and memorable designs.</p>
                        <p>I studied Graphic Design at university and also completed a course in motion design which has given me a mix of creative and technical skills. Over the past few years I've worked on branding, digital content, marketing materials and event collateral. I really enjoy being part of the whole design process from brainstorming ideas to seeing the finished work out in the world.</p>
                        <p>I love exploring new creative challenges whether it's crafting bold brands, designing motion graphics or experimenting with different creative projects.</p>
                        <p>Outside of design you'll usually find me with a camera in hand, planning my next trip or diving into something creative just for fun. I'm always excited for new collaborations and bringing fresh perspectives into my work, so get in touch and let's create something together!</p>
                    </div>
                </div>
            </div>
            {/* <ContactSection/> */}
        </div>
    )
}
