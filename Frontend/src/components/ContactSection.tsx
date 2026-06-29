import ContactForm from "./ContactForm";

export default function ContactSection() {
    return (
       <div className="w-full mt-16 lg:mt-48 flex flex-col lg:flex-row gap-12 lg:gap-24">
                <div className="w-full lg:w-2/5">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-wide mb-4">Create With Me!</h2>
                    <p className="text-base font-medium mb-4">Looking for eye-catching designs?</p>
                    <p className="text-base text-gray-600">I'm always excited to collaborate on creative projects, whether it's marketing materials, digital assets, print designs, or something unique to your brand. Let's bring your ideas to life!</p>
                </div>
                <div className="w-full lg:w-3/5">
                    <ContactForm />
                </div>
            </div>
    );
}
