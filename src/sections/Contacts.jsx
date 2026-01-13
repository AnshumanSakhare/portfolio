import { Button } from "../Components/Button";
import { Github, Linkedin, Mail } from "lucide-react";

export const Contact = () => (
    <section id="contact" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold font-serif">
                Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-muted-foreground mt-2">I'd love to hear from you. Let's connect!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 glow-border animate-fade-in animation-delay-200">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-surface border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-surface border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                        <textarea id="message" name="message" rows="5" className="w-full bg-surface border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                        Send Message
                    </Button>
                </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in animation-delay-400">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Mail className="w-6 h-6 text-primary" />
                            <a href="mailto:anshuman@example.com" className="text-lg text-muted-foreground hover:text-primary">anshuman@example.com</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Linkedin className="w-6 h-6 text-primary" />
                            <a href="https://www.linkedin.com/in/anshuman-sakhare-59b695185/" target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground hover:text-primary">linkedin.com/in/anshuman-sakhare</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Github className="w-6 h-6 text-primary" />
                            <a href="https://github.com/AnshumanSakhare" target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground hover:text-primary">github.com/AnshumanSakhare</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
